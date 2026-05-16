import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestionScraper } from '@/lib/scraper/interview-question-scraper';

export async function GET(request: NextRequest) {
  try {
    const scraper = new InterviewQuestionScraper();
    const status = await scraper.getScrapingStatus();
    
    return NextResponse.json({
      success: true,
      data: status
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get scraping status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const scraper = new InterviewQuestionScraper();
    await scraper.clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Scraping cache cleared successfully'
    });
    
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear cache',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}