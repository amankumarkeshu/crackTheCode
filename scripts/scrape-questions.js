#!/usr/bin/env node

/**
 * CLI Script for scraping interview questions
 * 
 * Usage:
 *   node scripts/scrape-questions.js
 *   node scripts/scrape-questions.js --company=Google --days=14
 *   node scripts/scrape-questions.js --company=Amazon --type=system-design --difficulty=hard
 *   node scripts/scrape-questions.js --sources=leetcode,geeksforgeeks --max=20
 */

const { InterviewQuestionScraper } = require('../lib/scraper/interview-question-scraper');
const readline = require('readline');

// Parse command line arguments
function parseArgs() {
  const args = {};
  
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      args[key] = value;
    }
  });
  
  return args;
}

// Interactive CLI interface
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

// Ask user for input
function askQuestion(rl, question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Main CLI function
async function runCLI() {
  console.log('🤖 Interview Questions Scraper CLI');
  console.log('===================================\n');
  
  const args = parseArgs();
  const rl = createInterface();
  
  try {
    let config = {
      days: 7,
      company: '',
      type: '',
      difficulty: '',
      sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
      maxQuestions: 50
    };
    
    // Use command line args or interactive prompts
    if (Object.keys(args).length === 0) {
      console.log('🔧 Interactive Configuration Mode');
      console.log('(Press Enter to use default values)\n');
      
      // Days
      const daysInput = await askQuestion(rl, `📅 Number of days to scrape (default: ${config.days}): `);
      if (daysInput.trim()) {
        config.days = parseInt(daysInput) || config.days;
      }
      
      // Company
      const companyInput = await askQuestion(rl, '🏢 Company name (optional, e.g., Google, Amazon): ');
      if (companyInput.trim()) {
        config.company = companyInput.trim();
      }
      
      // Type
      const typeInput = await askQuestion(rl, '📝 Question type (optional: dsa, system-design, lld): ');
      if (typeInput.trim()) {
        config.type = typeInput.trim();
      }
      
      // Difficulty
      const difficultyInput = await askQuestion(rl, '⚡ Difficulty (optional: easy, medium, hard): ');
      if (difficultyInput.trim()) {
        config.difficulty = difficultyInput.trim();
      }
      
      // Sources
      const sourcesInput = await askQuestion(rl, `🌐 Sources (default: ${config.sources.join(', ')}): `);
      if (sourcesInput.trim()) {
        config.sources = sourcesInput.split(',').map(s => s.trim());
      }
      
      // Max questions
      const maxInput = await askQuestion(rl, `🔢 Max questions (default: ${config.maxQuestions}): `);
      if (maxInput.trim()) {
        config.maxQuestions = parseInt(maxInput) || config.maxQuestions;
      }
      
    } else {
      console.log('⚙️  Command Line Arguments Mode\n');
      
      // Parse command line arguments
      config.days = parseInt(args.days) || config.days;
      config.company = args.company || config.company;
      config.type = args.type || config.type;
      config.difficulty = args.difficulty || config.difficulty;
      config.maxQuestions = parseInt(args.max) || config.maxQuestions;
      
      if (args.sources) {
        config.sources = args.sources.split(',').map(s => s.trim());
      }
    }
    
    rl.close();
    
    // Display configuration
    console.log('\n📋 Scraping Configuration:');
    console.log(`   Days: ${config.days}`);
    console.log(`   Company: ${config.company || 'All companies'}`);
    console.log(`   Type: ${config.type || 'All types'}`);
    console.log(`   Difficulty: ${config.difficulty || 'All difficulties'}`);
    console.log(`   Sources: ${config.sources.join(', ')}`);
    console.log(`   Max Questions: ${config.maxQuestions}\n`);
    
    // Initialize scraper
    console.log('🚀 Starting scraping process...\n');
    const scraper = new InterviewQuestionScraper();
    
    // Check cache status
    const shouldScrape = scraper.shouldScrapeAgain(config.days);
    
    if (!shouldScrape) {
      console.log('💾 Cache is fresh!');
      console.log(`   Last updated: ${scraper.getLastUpdateTime()}`);
      console.log(`   Next update: ${scraper.getNextUpdateTime()}`);
      
      const rl2 = createInterface();
      const forceInput = await askQuestion(rl2, '\n❓ Force scraping anyway? (y/N): ');
      rl2.close();
      
      if (forceInput.toLowerCase() !== 'y' && forceInput.toLowerCase() !== 'yes') {
        console.log('✅ Scraping skipped. Use --force to override cache.');
        return;
      }
      
      console.log('🔄 Force scraping enabled...\n');
    }
    
    // Start scraping with progress updates
    const scrapedQuestions = [];
    
    for (const source of config.sources) {
      try {
        console.log(`🔍 Scraping from ${source}...`);
        
        const scraper_module = await import(`../lib/scraper/sources/${source}-scraper.js`);
        const SourceScraper = scraper_module[`${source.charAt(0).toUpperCase() + source.slice(1)}Scraper`];
        const sourceScraper = new SourceScraper();
        
        const questions = await sourceScraper.scrapeQuestions({
          days: config.days,
          company: config.company,
          type: config.type,
          difficulty: config.difficulty,
          maxQuestions: Math.ceil(config.maxQuestions / config.sources.length)
        });
        
        console.log(`   ✅ Found ${questions.length} questions from ${source}`);
        scrapedQuestions.push(...questions);
        
      } catch (error) {
        console.log(`   ❌ Error scraping from ${source}: ${error.message}`);
      }
    }
    
    if (scrapedQuestions.length === 0) {
      console.log('\n⚠️  No questions scraped. Check your configuration and try again.');
      return;
    }
    
    // Remove duplicates
    const uniqueQuestions = scraper.removeDuplicates ? scraper.removeDuplicates(scrapedQuestions) : scrapedQuestions;
    console.log(`\n📊 Processing Results:`);
    console.log(`   Total scraped: ${scrapedQuestions.length}`);
    console.log(`   Unique questions: ${uniqueQuestions.length}`);
    
    // Update questions file
    console.log(`\n📝 Updating questions file...`);
    await scraper.updateQuestionsFile(uniqueQuestions);
    
    console.log(`\n🎉 Success! Added ${uniqueQuestions.length} new questions to the database.`);
    console.log(`   Updated: data/interview-questions.ts`);
    
    // Display summary by company
    const companyCounts = {};
    uniqueQuestions.forEach(q => {
      companyCounts[q.company] = (companyCounts[q.company] || 0) + 1;
    });
    
    console.log(`\n📈 Questions by Company:`);
    Object.entries(companyCounts).forEach(([company, count]) => {
      console.log(`   ${company}: ${count} questions`);
    });
    
  } catch (error) {
    console.error('\n💥 Scraping failed:', error.message);
    process.exit(1);
  }
}

// Help function
function showHelp() {
  console.log(`
🤖 Interview Questions Scraper CLI

Usage:
  node scripts/scrape-questions.js [options]

Options:
  --days=NUMBER         Number of days to scrape (default: 7)
  --company=NAME        Specific company (e.g., Google, Amazon)
  --type=TYPE           Question type: dsa, system-design, lld
  --difficulty=LEVEL    Difficulty: easy, medium, hard
  --sources=LIST        Comma-separated sources: leetcode,geeksforgeeks,glassdoor,interviewbit
  --max=NUMBER          Maximum questions to scrape (default: 50)
  --force               Force scraping even if cache is fresh
  --help                Show this help message

Examples:
  node scripts/scrape-questions.js
  node scripts/scrape-questions.js --company=Google --days=14
  node scripts/scrape-questions.js --type=system-design --difficulty=hard
  node scripts/scrape-questions.js --sources=leetcode,geeksforgeeks --max=20

Sources:
  leetcode             LeetCode problems and company questions
  geeksforgeeks        GeeksforGeeks interview experiences
  glassdoor            Glassdoor interview questions and reviews
  interviewbit         InterviewBit problems and experiences
`);
}

// Run CLI or show help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp();
} else {
  runCLI().catch(error => {
    console.error('💥 CLI Error:', error);
    process.exit(1);
  });
}