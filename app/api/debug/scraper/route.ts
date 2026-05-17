import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const debug = {
      environment: {
        netlify: !!process.env.NETLIFY,
        vercel: !!process.env.VERCEL,
        nodeVersion: process.version,
        platform: process.platform
      },
      paths: {
        cwd: process.cwd(),
        tmpExists: existsSync('/tmp'),
        cacheDir: process.env.NETLIFY || process.env.VERCEL ? '/tmp' : join(process.cwd(), '.cache'),
        dataFileExists: existsSync(join(process.cwd(), 'data', 'interview-questions.ts'))
      },
      permissions: {} as any,
      scraper: {} as any
    };

    // Test cache directory creation
    const cacheDir = process.env.NETLIFY || process.env.VERCEL 
      ? '/tmp' 
      : join(process.cwd(), '.cache');
    
    try {
      if (!existsSync(cacheDir)) {
        require('fs').mkdirSync(cacheDir, { recursive: true });
        debug.permissions.canCreateCache = true;
      } else {
        debug.permissions.canCreateCache = true;
        debug.permissions.cacheDirExists = true;
      }
    } catch (error) {
      debug.permissions.canCreateCache = false;
      debug.permissions.cacheError = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test file writing
    try {
      const testFile = join(cacheDir, 'test.json');
      require('fs').writeFileSync(testFile, '{"test": true}', 'utf-8');
      debug.permissions.canWriteFiles = true;
      
      // Clean up test file
      try {
        require('fs').unlinkSync(testFile);
      } catch (e) {
        // Ignore cleanup errors
      }
    } catch (error) {
      debug.permissions.canWriteFiles = false;
      debug.permissions.writeError = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test scraper initialization
    try {
      const { InterviewQuestionScraper } = await import('@/lib/scraper/interview-question-scraper');
      const scraper = new InterviewQuestionScraper();
      debug.scraper.canInitialize = true;
      
      try {
        const status = await scraper.getScrapingStatus();
        debug.scraper.canGetStatus = true;
        debug.scraper.status = {
          lastUpdated: status.lastUpdated,
          totalQuestions: status.totalQuestions,
          cacheStatus: status.cacheStatus
        };
      } catch (error) {
        debug.scraper.canGetStatus = false;
        debug.scraper.statusError = error instanceof Error ? error.message : 'Unknown error';
      }
    } catch (error) {
      debug.scraper.canInitialize = false;
      debug.scraper.initError = error instanceof Error ? error.message : 'Unknown error';
    }

    return NextResponse.json({
      success: true,
      debug
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}