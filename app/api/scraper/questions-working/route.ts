import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { ServerlessScraper } = await import('@/lib/scraper/serverless-scraper');
    const scraper = new ServerlessScraper();
    
    // Auto-scrape with default parameters
    const questions = await scraper.scrapeQuestions({
      days: 7,
      sources: ['leetcode', 'geeksforgeeks', 'glassdoor'],
      maxQuestions: 15
    });
    
    return NextResponse.json({
      success: true,
      message: `Auto-scraping completed. Found ${questions.length} new questions.`,
      data: {
        questionsAdded: questions.length,
        lastUpdated: new Date().toISOString(),
        questions: questions.slice(0, 5) // Show first 5 as preview
      }
    });
    
  } catch (error) {
    console.error('Auto-scraping error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Auto-scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sources = ['leetcode', 'geeksforgeeks', 'glassdoor'], days = 7, company, type, difficulty, maxQuestions = 20 } = body;
    
    const { ServerlessScraper } = await import('@/lib/scraper/serverless-scraper');
    const scraper = new ServerlessScraper();
    
    const scrapedQuestions = await scraper.scrapeQuestions({
      days,
      company,
      type,
      difficulty,
      sources,
      maxQuestions
    });
    
    return NextResponse.json({
      success: true,
      message: `Successfully scraped ${scrapedQuestions.length} questions`,
      data: {
        questionsAdded: scrapedQuestions.length,
        lastUpdated: new Date().toISOString(),
        filters: { days, company, type, difficulty, sources },
        questions: scrapedQuestions.slice(0, 10) // Show first 10 as preview
      }
    });
    
  } catch (error) {
    console.error('Manual scraping error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to scrape questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}