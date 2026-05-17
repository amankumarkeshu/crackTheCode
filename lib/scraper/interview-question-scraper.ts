import { InterviewQuestion, QuestionType, QuestionDifficulty, QuestionFrequency } from '@/data/interview-questions';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { LeetCodeScraper } from './sources/leetcode-scraper';
import { GeeksforGeeksScraper } from './sources/geeksforgeeks-scraper';
import { GlassdoorScraper } from './sources/glassdoor-scraper';
import { InterviewBitScraper } from './sources/interviewbit-scraper';

export interface ScrapingOptions {
  days: number;
  company?: string;
  type?: QuestionType;
  difficulty?: QuestionDifficulty;
  sources: string[];
  maxQuestions?: number;
}

export interface ScrapingStatus {
  lastUpdated: string | null;
  totalQuestions: number;
  recentQuestions: number;
  nextScheduledUpdate: string | null;
  cacheStatus: 'fresh' | 'stale' | 'expired';
  sources: {
    name: string;
    lastScrape: string | null;
    questionsCount: number;
    status: 'active' | 'error' | 'rate_limited';
  }[];
}

export class InterviewQuestionScraper {
  private scrapers: Map<string, any>;
  private cacheFile: string;
  private metadataFile: string;
  private dataFile: string;
  private readonly CACHE_DURATION_HOURS = 6; // Cache for 6 hours
  
  constructor() {
    this.scrapers = new Map();
    this.scrapers.set('leetcode', new LeetCodeScraper());
    this.scrapers.set('geeksforgeeks', new GeeksforGeeksScraper());
    this.scrapers.set('glassdoor', new GlassdoorScraper());
    this.scrapers.set('interviewbit', new InterviewBitScraper());
    
    // File paths - handle serverless environment
    const projectRoot = process.cwd();
    
    // In serverless environments, use /tmp for cache
    const cacheDir = process.env.NETLIFY || process.env.VERCEL 
      ? '/tmp' 
      : join(projectRoot, '.cache');
    
    this.cacheFile = join(cacheDir, 'scraper-cache.json');
    this.metadataFile = join(cacheDir, 'scraper-metadata.json');
    this.dataFile = join(projectRoot, 'data', 'interview-questions.ts');
    
    // Ensure cache directory exists
    this.ensureCacheDirectory();
  }
  
  private ensureCacheDirectory(): void {
    try {
      const cacheDir = process.env.NETLIFY || process.env.VERCEL 
        ? '/tmp' 
        : join(process.cwd(), '.cache');
      
      if (!existsSync(cacheDir)) {
        require('fs').mkdirSync(cacheDir, { recursive: true });
      }
    } catch (error) {
      console.warn('Could not create cache directory:', error);
      // Don't fail the entire operation if cache creation fails
    }
  }
  
  public shouldScrapeAgain(requestedDays: number): boolean {
    try {
      if (!existsSync(this.metadataFile)) {
        return true;
      }
      
      const metadata = JSON.parse(readFileSync(this.metadataFile, 'utf-8'));
      const lastUpdate = new Date(metadata.lastUpdated);
      const now = new Date();
      
      // Check if cache has expired
      const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
      
      return hoursSinceUpdate >= this.CACHE_DURATION_HOURS;
    } catch (error) {
      console.error('Error checking cache status:', error);
      return true;
    }
  }
  
  public getLastUpdateTime(): string | null {
    try {
      if (!existsSync(this.metadataFile)) {
        return null;
      }
      
      const metadata = JSON.parse(readFileSync(this.metadataFile, 'utf-8'));
      return metadata.lastUpdated;
    } catch (error) {
      return null;
    }
  }
  
  public getNextUpdateTime(hours: number = this.CACHE_DURATION_HOURS): string | null {
    const lastUpdate = this.getLastUpdateTime();
    if (!lastUpdate) {
      return null;
    }
    
    const next = new Date(lastUpdate);
    next.setHours(next.getHours() + hours);
    return next.toISOString();
  }
  
  public async scrapeInterviewQuestions(options: ScrapingOptions): Promise<InterviewQuestion[]> {
    const { days, company, type, difficulty, sources, maxQuestions = 100 } = options;
    
    console.log(`Starting scraping with options:`, options);
    
    const allQuestions: InterviewQuestion[] = [];
    const scrapingResults: any = {};
    
    // Scrape from each source
    for (const sourceName of sources) {
      try {
        console.log(`Scraping from ${sourceName}...`);
        
        const scraper = this.scrapers.get(sourceName);
        if (!scraper) {
          console.warn(`Scraper not found for source: ${sourceName}`);
          continue;
        }
        
        const questions = await scraper.scrapeQuestions({
          days,
          company,
          type,
          difficulty,
          maxQuestions: Math.ceil(maxQuestions / sources.length)
        });
        
        console.log(`Found ${questions.length} questions from ${sourceName}`);
        
        // Add source metadata to questions
        const questionsWithSource = questions.map((q: any) => ({
          ...q,
          id: q.id || this.generateQuestionId(q, sourceName),
          source: sourceName,
          scrapedAt: new Date().toISOString()
        }));
        
        allQuestions.push(...questionsWithSource);
        scrapingResults[sourceName] = {
          count: questions.length,
          status: 'success',
          timestamp: new Date().toISOString()
        };
        
        // Respect rate limits
        await this.sleep(2000); // 2 second delay between sources
        
      } catch (error) {
        console.error(`Error scraping from ${sourceName}:`, error);
        scrapingResults[sourceName] = {
          count: 0,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        };
      }
    }
    
    // Remove duplicates based on question content
    const uniqueQuestions = this.removeDuplicates(allQuestions);
    
    // Update cache
    await this.updateCache(uniqueQuestions, scrapingResults);
    
    console.log(`Scraping completed. Found ${uniqueQuestions.length} unique questions.`);
    
    return uniqueQuestions;
  }
  
  private removeDuplicates(questions: InterviewQuestion[]): InterviewQuestion[] {
    const seen = new Set<string>();
    const unique: InterviewQuestion[] = [];
    
    for (const question of questions) {
      // Create a hash based on question content and company
      const hash = this.hashQuestion(question);
      
      if (!seen.has(hash)) {
        seen.add(hash);
        unique.push(question);
      }
    }
    
    return unique;
  }
  
  private hashQuestion(question: InterviewQuestion): string {
    const content = `${question.company.toLowerCase()}_${question.question.toLowerCase().slice(0, 50)}`;
    return content.replace(/[^a-z0-9]/g, '_');
  }
  
  private generateQuestionId(question: any, source: string): string {
    const timestamp = Date.now();
    const company = question.company.toLowerCase().replace(/[^a-z]/g, '');
    const type = question.type || 'unknown';
    return `${company}-${type}-${source}-${timestamp}`;
  }
  
  public async updateQuestionsFile(newQuestions: InterviewQuestion[]): Promise<void> {
    try {
      // Read current file content
      const currentContent = readFileSync(this.dataFile, 'utf-8');
      
      // Extract existing questions array
      const exportMatch = currentContent.match(/export const interviewQuestions: InterviewQuestion\[\] = \[([\s\S]*)\];/);
      
      if (!exportMatch) {
        throw new Error('Could not parse existing questions file');
      }
      
      // Parse existing questions (simplified parsing)
      const existingQuestions = this.parseExistingQuestions(currentContent);
      
      // Filter out questions that might already exist
      const questionsToAdd = newQuestions.filter(newQ => 
        !existingQuestions.some(existingQ => 
          existingQ.company === newQ.company && 
          this.areSimilarQuestions(existingQ.question, newQ.question)
        )
      );
      
      if (questionsToAdd.length === 0) {
        console.log('No new questions to add after duplicate filtering');
        return;
      }
      
      // Generate new question entries
      const newQuestionsString = questionsToAdd.map(q => this.formatQuestionForFile(q)).join(',\n  ');
      
      // Insert new questions at the end of the array
      const insertPosition = currentContent.lastIndexOf('];');
      const beforeInsert = currentContent.substring(0, insertPosition);
      const afterInsert = currentContent.substring(insertPosition);
      
      const separator = existingQuestions.length > 0 ? ',\n  ' : '';
      const updatedContent = beforeInsert + separator + newQuestionsString + '\n' + afterInsert;
      
      // Write updated content
      writeFileSync(this.dataFile, updatedContent, 'utf-8');
      
      console.log(`Added ${questionsToAdd.length} new questions to ${this.dataFile}`);
      
    } catch (error) {
      console.error('Error updating questions file:', error);
      throw error;
    }
  }
  
  private parseExistingQuestions(content: string): InterviewQuestion[] {
    // Simple extraction of existing questions for duplicate checking
    // This is a simplified approach - in production, you might want more robust parsing
    const questions: InterviewQuestion[] = [];
    
    const questionMatches = content.matchAll(/\{\s*id:\s*"([^"]+)",\s*company:\s*"([^"]+)",.*?question:\s*"([^"]+)"/g);
    
    for (const match of questionMatches) {
      questions.push({
        id: match[1],
        company: match[2],
        question: match[3],
        type: 'dsa' as QuestionType, // Default type
        difficulty: 'medium' as QuestionDifficulty,
        tags: []
      });
    }
    
    return questions;
  }
  
  private areSimilarQuestions(q1: string, q2: string): boolean {
    // Simple similarity check - normalize and compare
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const n1 = normalize(q1);
    const n2 = normalize(q2);
    
    // Check if questions are very similar (more than 80% common words)
    const words1 = new Set(n1.split(/\s+/));
    const words2 = new Set(n2.split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    
    const similarity = intersection.size / Math.max(words1.size, words2.size);
    return similarity > 0.8;
  }
  
  private formatQuestionForFile(question: InterviewQuestion): string {
    const tags = question.tags.map(tag => `"${tag}"`).join(', ');
    const askedFor = question.askedFor ? `askedFor: "${question.askedFor}", ` : '';
    const frequency = question.frequency ? `frequency: "${question.frequency}", ` : '';
    const note = question.note ? `note: "${question.note.replace(/"/g, '\\"')}"` : '';
    
    return `{ id: "${question.id}", company: "${question.company}", type: "${question.type}", difficulty: "${question.difficulty}", question: "${question.question.replace(/"/g, '\\"')}", tags: [${tags}], ${askedFor}${frequency}${note ? note + ' ' : ''}}`.replace(/,\s*}/, ' }');
  }
  
  private async updateCache(questions: InterviewQuestion[], scrapingResults: any): Promise<void> {
    try {
      // Update cache file
      const cacheData = {
        questions,
        scrapingResults,
        timestamp: new Date().toISOString()
      };
      
      writeFileSync(this.cacheFile, JSON.stringify(cacheData, null, 2), 'utf-8');
      
      // Update metadata file
      const metadata = {
        lastUpdated: new Date().toISOString(),
        totalQuestions: questions.length,
        sources: Object.keys(scrapingResults)
      };
      
      writeFileSync(this.metadataFile, JSON.stringify(metadata, null, 2), 'utf-8');
      
    } catch (error) {
      console.warn('Warning: Could not update cache in serverless environment:', error.message);
      // Don't throw error in serverless environments where cache might not be writable
      if (!process.env.NETLIFY && !process.env.VERCEL) {
        throw error;
      }
    }
  }
  
  public async getScrapingStatus(): Promise<ScrapingStatus> {
    try {
      let metadata: any = { lastUpdated: null, totalQuestions: 0, sources: [] };
      let cache: any = { questions: [], scrapingResults: {} };
      
      if (existsSync(this.metadataFile)) {
        metadata = JSON.parse(readFileSync(this.metadataFile, 'utf-8'));
      }
      
      if (existsSync(this.cacheFile)) {
        cache = JSON.parse(readFileSync(this.cacheFile, 'utf-8'));
      }
      
      // Determine cache status
      let cacheStatus: 'fresh' | 'stale' | 'expired' = 'expired';
      
      if (metadata.lastUpdated) {
        const lastUpdate = new Date(metadata.lastUpdated);
        const now = new Date();
        const hoursSince = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        
        if (hoursSince < this.CACHE_DURATION_HOURS / 2) {
          cacheStatus = 'fresh';
        } else if (hoursSince < this.CACHE_DURATION_HOURS) {
          cacheStatus = 'stale';
        }
      }
      
      // Build source status
      const sources = ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'].map(sourceName => ({
        name: sourceName,
        lastScrape: cache.scrapingResults[sourceName]?.timestamp || null,
        questionsCount: cache.scrapingResults[sourceName]?.count || 0,
        status: cache.scrapingResults[sourceName]?.status || 'error' as 'active' | 'error' | 'rate_limited'
      }));
      
      return {
        lastUpdated: metadata.lastUpdated,
        totalQuestions: metadata.totalQuestions || 0,
        recentQuestions: cache.questions?.length || 0,
        nextScheduledUpdate: this.getNextUpdateTime(),
        cacheStatus,
        sources
      };
      
    } catch (error) {
      console.error('Error getting scraping status:', error);
      throw error;
    }
  }
  
  public async clearCache(): Promise<void> {
    try {
      if (existsSync(this.cacheFile)) {
        require('fs').unlinkSync(this.cacheFile);
      }
      
      if (existsSync(this.metadataFile)) {
        require('fs').unlinkSync(this.metadataFile);
      }
      
      console.log('Scraping cache cleared successfully');
      
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}