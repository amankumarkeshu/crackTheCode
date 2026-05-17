import { NextRequest, NextResponse } from 'next/server';
import { interviewQuestions } from '@/data/interview-questions';
import { IMPORTANT_COMPANIES, COMPANY_CONFIGS, getCompanyPriority, getCompanyConfig } from '@/lib/scraper/company-config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stats';
    
    switch (action) {
      case 'stats':
        return getCompanyStats();
      
      case 'list':
        return getImportantCompaniesList();
      
      case 'coverage':
        return getCompanyCoverage();
      
      case 'recent':
        const days = parseInt(searchParams.get('days') || '7');
        return getRecentQuestionsByCompany(days);
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Company API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process company request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getCompanyStats() {
  // Analyze current question distribution by company
  const companyStats: Record<string, any> = {};
  
  // Initialize stats for all important companies
  IMPORTANT_COMPANIES.forEach(company => {
    companyStats[company] = {
      totalQuestions: 0,
      byType: {
        'dsa': 0,
        'system-design': 0,
        'lld': 0
      },
      byDifficulty: {
        'easy': 0,
        'medium': 0,
        'hard': 0
      },
      recentQuestions: 0, // Questions from 2026
      priority: getCompanyPriority(company),
      coverage: 'poor' // Will be calculated
    };
  });
  
  // Analyze existing questions
  interviewQuestions.forEach(question => {
    const company = question.company;
    
    if (companyStats[company]) {
      companyStats[company].totalQuestions++;
      companyStats[company].byType[question.type]++;
      companyStats[company].byDifficulty[question.difficulty]++;
      
      // Check if it's a recent question (rough heuristic)
      if (question.note?.includes('2026') || question.id.includes('2026')) {
        companyStats[company].recentQuestions++;
      }
    }
  });
  
  // Calculate coverage scores
  Object.keys(companyStats).forEach(company => {
    const stats = companyStats[company];
    const total = stats.totalQuestions;
    
    // Coverage based on total questions and balance across types/difficulties
    let coverageScore = 0;
    
    // Base score from total questions
    coverageScore += Math.min(total / 20, 1) * 40; // Max 40 points for 20+ questions
    
    // Balance across question types
    const typeBalance = Math.min(
      stats.byType.dsa,
      stats.byType['system-design'],
      stats.byType.lld
    );
    coverageScore += (typeBalance / Math.max(total / 3, 1)) * 30; // Max 30 points for balance
    
    // Difficulty distribution
    const difficultyBalance = Math.min(
      stats.byDifficulty.easy,
      stats.byDifficulty.medium,
      stats.byDifficulty.hard
    );
    coverageScore += (difficultyBalance / Math.max(total / 3, 1)) * 20; // Max 20 points
    
    // Recent questions bonus
    coverageScore += Math.min(stats.recentQuestions / 5, 1) * 10; // Max 10 points
    
    // Assign coverage label
    if (coverageScore >= 80) stats.coverage = 'excellent';
    else if (coverageScore >= 60) stats.coverage = 'good';
    else if (coverageScore >= 40) stats.coverage = 'fair';
    else if (coverageScore >= 20) stats.coverage = 'poor';
    else stats.coverage = 'minimal';
    
    stats.coverageScore = Math.round(coverageScore);
  });
  
  // Calculate summary statistics
  const summary = {
    totalImportantCompanies: IMPORTANT_COMPANIES.length,
    companiesWithQuestions: Object.values(companyStats).filter(s => s.totalQuestions > 0).length,
    averageQuestionsPerCompany: Math.round(
      Object.values(companyStats).reduce((sum: number, s: any) => sum + s.totalQuestions, 0) / IMPORTANT_COMPANIES.length
    ),
    coverageDistribution: {
      excellent: Object.values(companyStats).filter(s => s.coverage === 'excellent').length,
      good: Object.values(companyStats).filter(s => s.coverage === 'good').length,
      fair: Object.values(companyStats).filter(s => s.coverage === 'fair').length,
      poor: Object.values(companyStats).filter(s => s.coverage === 'poor').length,
      minimal: Object.values(companyStats).filter(s => s.coverage === 'minimal').length
    }
  };
  
  return NextResponse.json({
    success: true,
    data: {
      summary,
      companyStats
    }
  });
}

function getImportantCompaniesList() {
  const companiesList = IMPORTANT_COMPANIES.map(company => ({
    name: company,
    priority: getCompanyPriority(company),
    config: getCompanyConfig(company),
    currentQuestions: interviewQuestions.filter(q => q.company === company).length
  }));
  
  return NextResponse.json({
    success: true,
    data: {
      companies: companiesList,
      totalCompanies: IMPORTANT_COMPANIES.length,
      configs: COMPANY_CONFIGS
    }
  });
}

function getCompanyCoverage() {
  const coverage: Record<string, any> = {};
  
  // Check which companies need more questions
  IMPORTANT_COMPANIES.forEach(company => {
    const questions = interviewQuestions.filter(q => q.company === company);
    const priority = getCompanyPriority(company);
    
    // Target question counts based on priority
    const targets = {
      high: 25,
      medium: 15,
      low: 10
    };
    
    const target = targets[priority];
    const current = questions.length;
    const needed = Math.max(0, target - current);
    
    coverage[company] = {
      priority,
      target,
      current,
      needed,
      percentage: Math.round((current / target) * 100),
      status: current >= target ? 'complete' : current >= target * 0.7 ? 'good' : 'needs_attention'
    };
  });
  
  // Find companies that need immediate attention
  const needsAttention = Object.entries(coverage)
    .filter(([_, data]: [string, any]) => data.status === 'needs_attention')
    .sort(([_, a]: [string, any], [__, b]: [string, any]) => b.needed - a.needed)
    .slice(0, 5);
  
  return NextResponse.json({
    success: true,
    data: {
      coverage,
      needsAttention: needsAttention.map(([company, data]) => ({
        company,
        ...data
      })),
      summary: {
        complete: Object.values(coverage).filter((c: any) => c.status === 'complete').length,
        good: Object.values(coverage).filter((c: any) => c.status === 'good').length,
        needsAttention: Object.values(coverage).filter((c: any) => c.status === 'needs_attention').length
      }
    }
  });
}

function getRecentQuestionsByCompany(days: number) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentQuestions: Record<string, any[]> = {};
  
  // This is a simplified approach - in a real implementation,
  // you'd want to track actual scraping timestamps
  interviewQuestions.forEach(question => {
    if (IMPORTANT_COMPANIES.includes(question.company)) {
      // Heuristic: consider questions with 2026 in note/id as recent
      const isRecent = question.note?.includes('2026') || 
                      question.id.includes('2026') ||
                      (question.note && question.note.includes('recent'));
      
      if (isRecent) {
        if (!recentQuestions[question.company]) {
          recentQuestions[question.company] = [];
        }
        
        recentQuestions[question.company].push({
          id: question.id,
          question: question.question,
          type: question.type,
          difficulty: question.difficulty,
          tags: question.tags,
          note: question.note
        });
      }
    }
  });
  
  // Sort companies by number of recent questions
  const sortedCompanies = Object.entries(recentQuestions)
    .sort(([_, a], [__, b]) => b.length - a.length)
    .map(([company, questions]) => ({
      company,
      recentQuestions: questions.length,
      questions: questions.slice(0, 5) // Show top 5 recent questions
    }));
  
  return NextResponse.json({
    success: true,
    data: {
      period: `Last ${days} days`,
      companiesWithRecentQuestions: sortedCompanies.length,
      totalRecentQuestions: Object.values(recentQuestions).flat().length,
      companyBreakdown: sortedCompanies
    }
  });
}
