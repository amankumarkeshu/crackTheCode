import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestionScraper } from '@/lib/scraper/interview-question-scraper';

// This endpoint can be called by cron services like Vercel Cron, GitHub Actions, or external services
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from an authorized source
    const authToken = request.headers.get('Authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (!expectedToken || authToken !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const scraper = new InterviewQuestionScraper();
    
    // Configuration for scheduled scraping
    const scrapingConfig = {
      days: 7, // Last 7 days
      sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
      maxQuestions: 50 // Total across all sources
    };
    
    console.log('Starting scheduled scraping job...');
    
    // Check if scraping is needed (respects cache)
    const shouldScrape = scraper.shouldScrapeAgain(scrapingConfig.days);
    
    if (!shouldScrape) {
      console.log('Cache is fresh, skipping scraping');
      return NextResponse.json({
        success: true,
        message: 'Cache is fresh, no scraping needed',
        lastUpdated: scraper.getLastUpdateTime(),
        nextUpdate: scraper.getNextUpdateTime()
      });
    }
    
    // Scrape questions from all sources
    const scrapedQuestions = await scraper.scrapeInterviewQuestions(scrapingConfig);
    
    // Update the questions file
    await scraper.updateQuestionsFile(scrapedQuestions);
    
    console.log(`Scheduled scraping completed. Added ${scrapedQuestions.length} questions.`);
    
    return NextResponse.json({
      success: true,
      message: `Scheduled scraping completed successfully`,
      data: {
        questionsAdded: scrapedQuestions.length,
        lastUpdated: new Date().toISOString(),
        configuration: scrapingConfig
      }
    });
    
  } catch (error) {
    console.error('Scheduled scraping error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Scheduled scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST endpoint for manual trigger with custom parameters
export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (!expectedToken || authToken !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { 
      days = 7, 
      sources = ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
      company,
      type,
      difficulty,
      maxQuestions = 50,
      force = false 
    } = body;
    
    const scraper = new InterviewQuestionScraper();
    
    // Check cache unless forced
    if (!force && !scraper.shouldScrapeAgain(days)) {
      return NextResponse.json({
        success: true,
        message: 'Cache is fresh, use force=true to override',
        lastUpdated: scraper.getLastUpdateTime()
      });
    }
    
    console.log('Starting manual scheduled scraping with custom parameters...');
    
    const scrapedQuestions = await scraper.scrapeInterviewQuestions({
      days,
      company,
      type,
      difficulty,
      sources,
      maxQuestions
    });
    
    await scraper.updateQuestionsFile(scrapedQuestions);
    
    return NextResponse.json({
      success: true,
      message: `Manual scheduled scraping completed`,
      data: {
        questionsAdded: scrapedQuestions.length,
        lastUpdated: new Date().toISOString(),
        parameters: { days, company, type, difficulty, sources, maxQuestions }
      }
    });
    
  } catch (error) {
    console.error('Manual scheduled scraping error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Manual scheduled scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}