import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestionScraper } from '@/lib/scraper/interview-question-scraper';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const company = searchParams.get('company') || '';
    const force = searchParams.get('force') === 'true';
    
    const scraper = new InterviewQuestionScraper();
    
    // Check if we need to scrape (force or cache expired)
    const shouldScrape = force || scraper.shouldScrapeAgain(days);
    
    if (shouldScrape) {
      console.log(`Starting scraping process for last ${days} days...`);
      
      const scrapedQuestions = await scraper.scrapeInterviewQuestions({
        days,
        company,
        sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit']
      });
      
      // Update the data file
      await scraper.updateQuestionsFile(scrapedQuestions);
      
      return NextResponse.json({
        success: true,
        message: `Scraped ${scrapedQuestions.length} new questions`,
        data: {
          questionsAdded: scrapedQuestions.length,
          lastUpdated: new Date().toISOString(),
          filters: { days, company }
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Cache is still fresh, no scraping needed',
        data: {
          lastUpdated: scraper.getLastUpdateTime(),
          nextUpdate: scraper.getNextUpdateTime(days)
        }
      });
    }
    
  } catch (error) {
    console.error('Scraping error:', error);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sources, days = 7, company, type, difficulty } = body;
    
    const scraper = new InterviewQuestionScraper();
    
    const scrapedQuestions = await scraper.scrapeInterviewQuestions({
      days,
      company,
      type,
      difficulty,
      sources: sources || ['leetcode', 'geeksforgeeks', 'glassdoor']
    });
    
    // Update the data file
    await scraper.updateQuestionsFile(scrapedQuestions);
    
    return NextResponse.json({
      success: true,
      message: `Successfully scraped and added ${scrapedQuestions.length} questions`,
      data: {
        questionsAdded: scrapedQuestions.length,
        lastUpdated: new Date().toISOString(),
        filters: { days, company, type, difficulty }
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