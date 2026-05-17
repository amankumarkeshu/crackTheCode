#!/usr/bin/env node

/**
 * CLI Script for company-specific interview questions scraping
 * 
 * Usage:
 *   node scripts/scrape-companies.js
 *   node scripts/scrape-companies.js --companies=Google,Amazon,Microsoft
 *   node scripts/scrape-companies.js --priority=high --max=15
 *   node scripts/scrape-companies.js --indian-only
 */

const readline = require('readline');
const path = require('path');

// Import companies configuration (we'll load it dynamically)
let IMPORTANT_COMPANIES;
try {
  // Try to load from the TypeScript config (will be compiled to JS)
  const configPath = path.join(__dirname, '../lib/scraper/company-config.js');
  const config = require(configPath);
  IMPORTANT_COMPANIES = config.IMPORTANT_COMPANIES;
} catch (error) {
  // Fallback to hardcoded list
  IMPORTANT_COMPANIES = [
    'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix',
    'Uber', 'Airbnb', 'Tesla', 'Salesforce', 'Oracle',
    'Flipkart', 'Swiggy', 'Zomato', 'PayTM'
  ];
}

const COMPANY_CATEGORIES = {
  'big-tech': ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'],
  'unicorns': ['Uber', 'Airbnb', 'Tesla', 'Salesforce'],
  'indian': ['Flipkart', 'Swiggy', 'Zomato', 'PayTM'],
  'enterprise': ['Oracle', 'Salesforce', 'Microsoft'],
  'high-priority': ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple']
};

// Parse command line arguments
function parseArgs() {
  const args = {};
  
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      if (arg.includes('=')) {
        const [key, value] = arg.substring(2).split('=');
        args[key] = value;
      } else {
        args[arg.substring(2)] = true;
      }
    }
  });
  
  return args;
}

// Create readline interface
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
async function runCompanyScraper() {
  console.log('🏢 Company-Specific Interview Questions Scraper');
  console.log('==============================================\n');
  
  const args = parseArgs();
  const rl = createInterface();
  
  try {
    let config = {
      companies: [],
      days: 7,
      maxQuestionsPerCompany: 12,
      sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
      priority: 'all' // all, high, medium, low
    };
    
    // Handle special flags
    if (args['indian-only']) {
      config.companies = COMPANY_CATEGORIES['indian'];
      console.log('🇮🇳 Indian companies mode selected');
    } else if (args['big-tech']) {
      config.companies = COMPANY_CATEGORIES['big-tech'];
      console.log('🚀 Big tech companies mode selected');
    } else if (args.companies) {
      config.companies = args.companies.split(',').map(c => c.trim());
      console.log(`🎯 Custom companies: ${config.companies.join(', ')}`);
    }
    
    // Use command line args or interactive prompts
    if (Object.keys(args).length === 0 || config.companies.length === 0) {
      console.log('🔧 Interactive Configuration Mode\n');
      
      // Company selection
      console.log('📋 Available company categories:');
      console.log('1. All important companies (recommended)');
      console.log('2. Big Tech (Google, Amazon, Microsoft, Meta, Apple, Netflix)');
      console.log('3. Indian companies (Flipkart, Swiggy, Zomato, PayTM)');
      console.log('4. High priority only (Google, Amazon, Microsoft, Meta, Apple)');
      console.log('5. Custom selection');
      
      const categoryChoice = await askQuestion(rl, '\n🎯 Select category (1-5): ');
      
      switch (categoryChoice) {
        case '1':
          config.companies = IMPORTANT_COMPANIES;
          break;
        case '2':
          config.companies = COMPANY_CATEGORIES['big-tech'];
          break;
        case '3':
          config.companies = COMPANY_CATEGORIES['indian'];
          break;
        case '4':
          config.companies = COMPANY_CATEGORIES['high-priority'];
          break;
        case '5':
          const customInput = await askQuestion(rl, '📝 Enter company names (comma-separated): ');
          config.companies = customInput.split(',').map(c => c.trim()).filter(c => c);
          break;
        default:
          config.companies = IMPORTANT_COMPANIES;
      }
      
      // Other configurations
      const daysInput = await askQuestion(rl, `📅 Days to scrape back (default: ${config.days}): `);
      if (daysInput.trim()) {
        config.days = parseInt(daysInput) || config.days;
      }
      
      const maxInput = await askQuestion(rl, `🔢 Max questions per company (default: ${config.maxQuestionsPerCompany}): `);
      if (maxInput.trim()) {
        config.maxQuestionsPerCompany = parseInt(maxInput) || config.maxQuestionsPerCompany;
      }
      
      const sourcesInput = await askQuestion(rl, `🌐 Sources (default: ${config.sources.join(', ')}): `);
      if (sourcesInput.trim()) {
        config.sources = sourcesInput.split(',').map(s => s.trim());
      }
      
    } else {
      console.log('⚙️  Command Line Arguments Mode\n');
      
      // Parse command line arguments
      config.days = parseInt(args.days) || config.days;
      config.maxQuestionsPerCompany = parseInt(args.max) || config.maxQuestionsPerCompany;
      
      if (args.sources) {
        config.sources = args.sources.split(',').map(s => s.trim());
      }
      
      if (args.priority) {
        const priority = args.priority.toLowerCase();
        if (COMPANY_CATEGORIES[`${priority}-priority`]) {
          config.companies = COMPANY_CATEGORIES[`${priority}-priority`];
        }
      }
      
      // Default to all companies if none specified
      if (config.companies.length === 0) {
        config.companies = IMPORTANT_COMPANIES;
      }
    }
    
    rl.close();
    
    // Validate companies
    const validCompanies = config.companies.filter(company => 
      IMPORTANT_COMPANIES.includes(company)
    );
    
    if (validCompanies.length !== config.companies.length) {
      const invalid = config.companies.filter(c => !IMPORTANT_COMPANIES.includes(c));
      console.log(`⚠️  Warning: Invalid companies removed: ${invalid.join(', ')}`);
      config.companies = validCompanies;
    }
    
    if (config.companies.length === 0) {
      console.log('❌ No valid companies selected. Exiting.');
      return;
    }
    
    // Display configuration
    console.log('\n📋 Scraping Configuration:');
    console.log(`   Companies (${config.companies.length}): ${config.companies.join(', ')}`);
    console.log(`   Days: ${config.days}`);
    console.log(`   Max per company: ${config.maxQuestionsPerCompany}`);
    console.log(`   Sources: ${config.sources.join(', ')}\n`);
    
    // Estimate time
    const estimatedMinutes = Math.ceil((config.companies.length * 2.5) / 60 * 100) / 100;
    console.log(`⏱️  Estimated time: ${estimatedMinutes} minutes\n`);
    
    // Call the API
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const apiToken = process.env.CRON_SECRET_TOKEN;
    
    if (!apiToken) {
      console.log('❌ CRON_SECRET_TOKEN environment variable not set');
      console.log('   Set it in your .env.local file');
      return;
    }
    
    console.log('🚀 Starting company-specific scraping...\n');
    
    const requestBody = {
      companies: config.companies,
      days: config.days,
      maxQuestionsPerCompany: config.maxQuestionsPerCompany,
      sources: config.sources,
      force: args.force || false
    };
    
    try {
      const response = await fetch(`${apiUrl}/api/cron/weekly-company-scraper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('❌ API Error:', result);
        return;
      }
      
      console.log('🎉 Scraping completed successfully!\n');
      
      // Display results
      console.log('📊 Results Summary:');
      console.log(`   Companies processed: ${result.data?.companies || 'Unknown'}`);
      console.log(`   Successful scrapes: ${result.data?.successful || 'Unknown'}`);
      console.log(`   Failed scrapes: ${result.data?.failed || 'Unknown'}`);
      console.log(`   Total questions added: ${result.data?.totalQuestions || 'Unknown'}\n`);
      
      // Show company-specific results
      if (result.data?.results) {
        console.log('📈 Company-specific results:');
        Object.entries(result.data.results).forEach(([company, data]) => {
          const status = data.status === 'success' ? '✅' : 
                        data.status === 'skipped' ? '⏭️' : '❌';
          const questions = data.questionsAdded || 0;
          const reason = data.reason || data.error || '';
          
          console.log(`   ${status} ${company}: ${questions} questions ${reason ? `(${reason})` : ''}`);
        });
      }
      
      console.log('\n✅ Company-specific scraping completed!');
      console.log('📝 Questions have been added to data/interview-questions.ts');
      
    } catch (error) {
      console.error('💥 Network error:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('   1. Make sure your server is running (npm run dev)');
      console.log('   2. Check your API_URL environment variable');
      console.log('   3. Verify CRON_SECRET_TOKEN is set correctly');
    }
    
  } catch (error) {
    console.error('\n💥 CLI Error:', error.message);
    process.exit(1);
  }
}

// Help function
function showHelp() {
  console.log(`
🏢 Company-Specific Interview Questions Scraper

Usage:
  node scripts/scrape-companies.js [options]

Options:
  --companies=LIST      Comma-separated company names
  --days=NUMBER         Number of days to scrape (default: 7)
  --max=NUMBER          Max questions per company (default: 12)
  --sources=LIST        Comma-separated sources
  --priority=LEVEL      Company priority: high, medium, low
  --force               Force scraping (ignore cache)
  --indian-only         Scrape only Indian companies
  --big-tech            Scrape only big tech companies
  --help                Show this help message

Examples:
  node scripts/scrape-companies.js
  node scripts/scrape-companies.js --companies=Google,Amazon,Microsoft
  node scripts/scrape-companies.js --indian-only --max=15
  node scripts/scrape-companies.js --big-tech --days=14
  node scripts/scrape-companies.js --priority=high --force

Company Categories:
  Big Tech: Google, Amazon, Microsoft, Meta, Apple, Netflix
  Indian: Flipkart, Swiggy, Zomato, PayTM
  High Priority: Google, Amazon, Microsoft, Meta, Apple
  
Important Companies (${IMPORTANT_COMPANIES.length}):
  ${IMPORTANT_COMPANIES.join(', ')}
`);
}

// Run CLI or show help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp();
} else {
  // Add fetch polyfill for Node.js environments that don't have it
  if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
  }
  
  runCompanyScraper().catch(error => {
    console.error('💥 CLI Error:', error);
    process.exit(1);
  });
}