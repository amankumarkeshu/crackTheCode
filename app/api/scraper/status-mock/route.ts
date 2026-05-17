import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Return mock status data for testing the frontend
  const mockStatus = {
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    totalQuestions: 1247,
    recentQuestions: 23,
    nextScheduledUpdate: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    cacheStatus: 'stale' as const,
    sources: [
      {
        name: 'leetcode',
        lastScrape: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        questionsCount: 432,
        status: 'active' as const
      },
      {
        name: 'geeksforgeeks',
        lastScrape: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        questionsCount: 356,
        status: 'active' as const
      },
      {
        name: 'glassdoor',
        lastScrape: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        questionsCount: 289,
        status: 'active' as const
      },
      {
        name: 'interviewbit',
        lastScrape: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        questionsCount: 170,
        status: 'rate_limited' as const
      }
    ]
  };

  return NextResponse.json({
    success: true,
    data: mockStatus
  });
}