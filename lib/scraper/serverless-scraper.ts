import { InterviewQuestion, QuestionType, QuestionDifficulty } from '@/data/interview-questions';

// Simplified scraper for serverless environments
export class ServerlessScraper {
  private sources: string[] = ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'];

  // Mock scraping for demonstration (replace with actual scraping logic)
  public async scrapeQuestions(options: {
    days?: number;
    company?: string;
    type?: QuestionType;
    difficulty?: QuestionDifficulty;
    sources?: string[];
    maxQuestions?: number;
  }): Promise<InterviewQuestion[]> {
    
    const mockQuestions: InterviewQuestion[] = [];
    const companies = options.company ? [options.company] : [
      'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'
    ];
    
    const types: QuestionType[] = options.type ? [options.type] : ['dsa', 'system-design', 'lld'];
    const difficulties: QuestionDifficulty[] = options.difficulty ? [options.difficulty] : ['easy', 'medium', 'hard'];
    
    // Generate some mock questions
    const questionTemplates = [
      'Design a distributed cache system',
      'Implement LRU cache with O(1) operations',
      'Design a chat application like WhatsApp',
      'Find the longest palindromic substring',
      'Design a URL shortener like bit.ly',
      'Implement a rate limiter',
      'Design notification system for 100M users',
      'Find all anagrams in a string array',
      'Design a parking lot system',
      'Implement binary tree traversal methods'
    ];
    
    let questionCount = 0;
    const maxQuestions = options.maxQuestions || 10;
    
    for (const company of companies) {
      if (questionCount >= maxQuestions) break;
      
      for (const type of types) {
        if (questionCount >= maxQuestions) break;
        
        for (const difficulty of difficulties) {
          if (questionCount >= maxQuestions) break;
          
          const template = questionTemplates[questionCount % questionTemplates.length];
          const question: InterviewQuestion = {
            id: `mock-${Date.now()}-${questionCount}`,
            question: `${template} (${company} ${difficulty} ${type})`,
            company,
            type,
            difficulty,
            tags: this.getTagsForType(type),
            askedFor: `${difficulty} ${type}`,
            frequency: 'medium',
            note: `Mock question for ${company} - ${new Date().toLocaleDateString()}`
          };
          
          mockQuestions.push(question);
          questionCount++;
        }
      }
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockQuestions.slice(0, maxQuestions);
  }
  
  private getTagsForType(type: QuestionType): string[] {
    switch (type) {
      case 'dsa':
        return ['arrays', 'dynamic-programming', 'trees', 'graphs'];
      case 'system-design':
        return ['scalability', 'databases', 'caching', 'microservices'];
      case 'lld':
        return ['object-oriented', 'design-patterns', 'uml', 'solid-principles'];
      default:
        return ['general'];
    }
  }
  
  public getStatus() {
    return {
      lastUpdated: new Date().toISOString(),
      totalQuestions: 1247,
      recentQuestions: 23,
      nextScheduledUpdate: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
      cacheStatus: 'fresh' as const,
      sources: this.sources.map(name => ({
        name,
        lastScrape: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000).toISOString(),
        questionsCount: Math.floor(Math.random() * 500) + 100,
        status: 'active' as const
      }))
    };
  }
}