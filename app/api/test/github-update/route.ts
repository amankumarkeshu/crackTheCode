import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestion } from '@/data/interview-questions';

export async function POST(request: NextRequest) {
  try {
    const { GitHubQuestionsUpdater } = await import('@/lib/scraper/github-updater');
    const updater = new GitHubQuestionsUpdater();
    
    // Test with a single mock question
    const testQuestion: InterviewQuestion = {
      id: `test-${Date.now()}`,
      question: 'Test question: Design a simple cache system',
      company: 'TestCorp',
      type: 'system-design',
      difficulty: 'medium',
      tags: ['caching', 'test'],
      askedFor: 'Test Engineer',
      frequency: 'low',
      note: `Test question added via GitHub API on ${new Date().toISOString()}`
    };
    
    const result = await updater.addQuestionsToFile([testQuestion]);
    
    return NextResponse.json({
      success: true,
      message: 'GitHub update test completed',
      data: result
    });
    
  } catch (error) {
    console.error('GitHub update test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'GitHub update test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}