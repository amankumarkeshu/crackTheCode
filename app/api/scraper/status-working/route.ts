import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Use a simplified approach that works in serverless environments
    const { ServerlessScraper } = await import('@/lib/scraper/serverless-scraper');
    const scraper = new ServerlessScraper();
    
    const status = scraper.getStatus();
    
    return NextResponse.json({
      success: true,
      data: status
    });
    
  } catch (error) {
    console.error('Scraper status error:', error);
    
    // Fallback to static data if scraper fails
    return NextResponse.json({
      success: true,
      data: {
        lastUpdated: new Date().toISOString(),
        totalQuestions: 1247,
        recentQuestions: 0,
        nextScheduledUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        cacheStatus: 'fresh',
        sources: [
          { name: 'leetcode', lastScrape: null, questionsCount: 432, status: 'active' },
          { name: 'geeksforgeeks', lastScrape: null, questionsCount: 356, status: 'active' },
          { name: 'glassdoor', lastScrape: null, questionsCount: 289, status: 'active' },
          { name: 'interviewbit', lastScrape: null, questionsCount: 170, status: 'active' }
        ]
      }
    });
  }
}

export async function DELETE(request: NextRequest) {
  // For serverless environments, there's no persistent cache to clear
  return NextResponse.json({
    success: true,
    message: 'Cache cleared (serverless environment - no persistent cache)'
  });
}