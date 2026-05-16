import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestionScraper } from '@/lib/scraper/interview-question-scraper';

// Top 15 most important companies for interview preparation
const IMPORTANT_COMPANIES = [
  // Big Tech (FAANG+)
  'Google',
  'Amazon', 
  'Microsoft',
  'Meta',
  'Apple',
  'Netflix',
  
  // Major Tech Companies
  'Uber',
  'Airbnb',
  'Tesla',
  'Salesforce',
  'Oracle',
  
  // Indian Tech Giants
  'Flipkart',
  'Swiggy',
  'Zomato',
  'PayTM'
];

// Configuration for each company type
const COMPANY_CONFIGS = {
  // High-priority companies (more questions)
  'high_priority': {
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'],
    maxQuestions: 15,
    sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit']
  },
  
  // Medium-priority companies
  'medium_priority': {
    companies: ['Netflix', 'Uber', 'Airbnb', 'Tesla', 'Salesforce'],
    maxQuestions: 10, 
    sources: ['leetcode', 'geeksforgeeks', 'glassdoor']
  },
  
  // Indian companies (specialized sources)
  'indian_companies': {
    companies: ['Flipkart', 'Swiggy', 'Zomato', 'PayTM'],
    maxQuestions: 12,
    sources: ['geeksforgeeks', 'glassdoor', 'interviewbit']
  },
  
  // Other important companies
  'other_important': {
    companies: ['Oracle'],
    maxQuestions: 8,
    sources: ['leetcode', 'glassdoor']
  }
};

export async function GET(request: NextRequest) {
  try {
    // Verify authorization
    const authToken = request.headers.get('Authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (!expectedToken || authToken !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🏢 Starting weekly company-specific scraping...');
    
    const scraper = new InterviewQuestionScraper();
    const scrapingResults = {
      totalCompanies: IMPORTANT_COMPANIES.length,
      successfulScrapes: 0,
      failedScrapes: 0,
      totalQuestionsAdded: 0,
      companyResults: {} as Record<string, any>,
      startTime: new Date().toISOString(),
      endTime: '',
      duration: 0
    };

    const startTime = Date.now();

    // Process each company category
    for (const [category, config] of Object.entries(COMPANY_CONFIGS)) {
      console.log(`\n📊 Processing ${category} companies...`);
      
      for (const company of config.companies) {
        try {
          console.log(`🔍 Scraping ${company}...`);
          
          // Check if we should scrape this company (respect individual cache)
          const shouldScrape = await shouldScrapeCompany(company, scraper);
          
          if (!shouldScrape.should) {
            console.log(`⏭️  Skipping ${company}: ${shouldScrape.reason}`);
            scrapingResults.companyResults[company] = {
              status: 'skipped',
              reason: shouldScrape.reason,
              questionsAdded: 0,
              lastUpdated: shouldScrape.lastUpdated
            };
            continue;
          }
          
          // Scrape questions for this company
          const scrapedQuestions = await scraper.scrapeInterviewQuestions({
            days: 7, // Last week
            company: company,
            sources: config.sources,
            maxQuestions: config.maxQuestions
          });
          
          // Update questions file
          if (scrapedQuestions.length > 0) {
            await scraper.updateQuestionsFile(scrapedQuestions);
          }
          
          scrapingResults.successfulScrapes++;
          scrapingResults.totalQuestionsAdded += scrapedQuestions.length;
          scrapingResults.companyResults[company] = {
            status: 'success',
            questionsAdded: scrapedQuestions.length,
            sources: config.sources,
            maxRequested: config.maxQuestions,
            timestamp: new Date().toISOString()
          };
          
          console.log(`✅ ${company}: ${scrapedQuestions.length} questions added`);
          
          // Add delay between companies to be respectful
          await sleep(3000);
          
        } catch (error) {
          console.error(`❌ Error scraping ${company}:`, error);
          
          scrapingResults.failedScrapes++;
          scrapingResults.companyResults[company] = {
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
            questionsAdded: 0,
            timestamp: new Date().toISOString()
          };
        }
      }
      
      // Add delay between categories
      await sleep(5000);
    }

    const endTime = Date.now();
    scrapingResults.endTime = new Date().toISOString();
    scrapingResults.duration = Math.round((endTime - startTime) / 1000); // seconds

    console.log(`\n🎉 Weekly company scraping completed!`);
    console.log(`📊 Results: ${scrapingResults.successfulScrapes}/${scrapingResults.totalCompanies} companies successful`);
    console.log(`📈 Total questions added: ${scrapingResults.totalQuestionsAdded}`);
    console.log(`⏱️  Duration: ${scrapingResults.duration} seconds`);

    // Send notification if configured
    await sendCompletionNotification(scrapingResults);

    return NextResponse.json({
      success: true,
      message: 'Weekly company scraping completed successfully',
      data: scrapingResults
    });

  } catch (error) {
    console.error('💥 Weekly company scraping failed:', error);
    
    // Send error notification
    await sendErrorNotification(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Weekly company scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST endpoint for manual triggering with custom company list
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
      companies = IMPORTANT_COMPANIES,
      days = 7,
      maxQuestionsPerCompany = 12,
      sources = ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
      force = false
    } = body;

    console.log('🔧 Starting manual company-specific scraping...');
    console.log(`📋 Companies: ${companies.join(', ')}`);

    const scraper = new InterviewQuestionScraper();
    const results = {
      companies: companies.length,
      successful: 0,
      failed: 0,
      totalQuestions: 0,
      results: {} as Record<string, any>
    };

    for (const company of companies) {
      try {
        console.log(`🔍 Scraping ${company}...`);

        if (!force) {
          const shouldScrape = await shouldScrapeCompany(company, scraper);
          if (!shouldScrape.should) {
            console.log(`⏭️  Skipping ${company}: ${shouldScrape.reason}`);
            results.results[company] = {
              status: 'skipped',
              reason: shouldScrape.reason
            };
            continue;
          }
        }

        const questions = await scraper.scrapeInterviewQuestions({
          days,
          company,
          sources,
          maxQuestions: maxQuestionsPerCompany
        });

        if (questions.length > 0) {
          await scraper.updateQuestionsFile(questions);
        }

        results.successful++;
        results.totalQuestions += questions.length;
        results.results[company] = {
          status: 'success',
          questionsAdded: questions.length,
          sources
        };

        console.log(`✅ ${company}: ${questions.length} questions`);
        await sleep(2000);

      } catch (error) {
        console.error(`❌ ${company} failed:`, error);
        results.failed++;
        results.results[company] = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Manual company scraping completed',
      data: results
    });

  } catch (error) {
    console.error('Manual company scraping error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Manual company scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to determine if we should scrape a specific company
async function shouldScrapeCompany(company: string, scraper: InterviewQuestionScraper): Promise<{
  should: boolean;
  reason: string;
  lastUpdated?: string;
}> {
  try {
    // Get overall scraping status
    const status = await scraper.getScrapingStatus();
    
    // Check if we have recent data for this company
    const lastUpdated = status.lastUpdated;
    
    if (!lastUpdated) {
      return { should: true, reason: 'No previous data' };
    }
    
    const lastUpdateTime = new Date(lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60 * 60);
    
    // For weekly scraping, update if more than 5 days old
    if (hoursSinceUpdate > 120) { // 5 days = 120 hours
      return { 
        should: true, 
        reason: `Last updated ${Math.round(hoursSinceUpdate)} hours ago`,
        lastUpdated 
      };
    }
    
    // Check if it's a high-priority company (more frequent updates)
    const highPriorityCompanies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];
    if (highPriorityCompanies.includes(company) && hoursSinceUpdate > 72) { // 3 days for high priority
      return { 
        should: true, 
        reason: `High priority company, last updated ${Math.round(hoursSinceUpdate)} hours ago`,
        lastUpdated 
      };
    }
    
    return { 
      should: false, 
      reason: `Recently updated (${Math.round(hoursSinceUpdate)} hours ago)`,
      lastUpdated 
    };
    
  } catch (error) {
    // If we can't determine status, err on the side of scraping
    return { should: true, reason: 'Could not determine last update status' };
  }
}

// Send completion notification
async function sendCompletionNotification(results: any): Promise<void> {
  const webhookUrl = process.env.SCRAPER_WEBHOOK_URL;
  const shouldNotifySuccess = process.env.SCRAPER_NOTIFY_ON_SUCCESS === 'true';
  
  if (!webhookUrl || !shouldNotifySuccess) {
    return;
  }

  try {
    const message = `🏢 **Weekly Company Scraping Completed**
    
📊 **Results Summary:**
• Companies processed: ${results.totalCompanies}
• Successful: ${results.successfulScrapes}
• Failed: ${results.failedScrapes}
• Total questions added: ${results.totalQuestionsAdded}
• Duration: ${results.duration} seconds

🏆 **Top Performers:**
${Object.entries(results.companyResults)
  .filter(([_, result]: [string, any]) => result.status === 'success' && result.questionsAdded > 0)
  .sort(([_, a]: [string, any], [__, b]: [string, any]) => b.questionsAdded - a.questionsAdded)
  .slice(0, 5)
  .map(([company, result]: [string, any]) => `• ${company}: ${result.questionsAdded} questions`)
  .join('\n')}`;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
  } catch (error) {
    console.error('Failed to send completion notification:', error);
  }
}

// Send error notification
async function sendErrorNotification(error: any): Promise<void> {
  const webhookUrl = process.env.SCRAPER_WEBHOOK_URL;
  const shouldNotifyError = process.env.SCRAPER_NOTIFY_ON_ERROR !== 'false'; // Default to true
  
  if (!webhookUrl || !shouldNotifyError) {
    return;
  }

  try {
    const message = `🚨 **Weekly Company Scraping Failed**
    
❌ **Error Details:**
${error instanceof Error ? error.message : 'Unknown error'}

🕒 **Time:** ${new Date().toISOString()}

Please check the logs for more details.`;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
  } catch (notificationError) {
    console.error('Failed to send error notification:', notificationError);
  }
}

// Utility function for delays
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to get company priority
function getCompanyPriority(company: string): 'high' | 'medium' | 'low' {
  const highPriority = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];
  const mediumPriority = ['Netflix', 'Uber', 'Airbnb', 'Tesla', 'Salesforce', 'Flipkart', 'Swiggy'];
  
  if (highPriority.includes(company)) return 'high';
  if (mediumPriority.includes(company)) return 'medium';
  return 'low';
}

// Export the companies list for external use
export { IMPORTANT_COMPANIES, COMPANY_CONFIGS };