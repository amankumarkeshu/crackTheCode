# Company-Specific Interview Questions Scraper

A comprehensive system for automatically scraping interview questions from the top 15 most important companies in tech. This system ensures you have up-to-date and relevant interview questions for the companies that matter most.

## 🏢 Covered Companies

### High Priority (15 questions each)
- **Google** - Search, Android, Cloud, YouTube
- **Amazon** - AWS, E-commerce, Alexa, Prime  
- **Microsoft** - Azure, Office, Windows, Xbox
- **Meta** - Facebook, Instagram, WhatsApp, VR
- **Apple** - iOS, macOS, Hardware, Services

### Medium Priority (10 questions each)
- **Netflix** - Streaming, Content, Platform
- **Uber** - Ride-sharing, Mobility, Delivery
- **Airbnb** - Travel, Hospitality, Platform
- **Tesla** - Automotive, Energy, AI
- **Salesforce** - CRM, Cloud, Enterprise

### Indian Tech Giants (12 questions each)
- **Flipkart** - E-commerce, Payments, Logistics
- **Swiggy** - Food delivery, Quick commerce
- **Zomato** - Food delivery, Restaurant discovery
- **PayTM** - Payments, Financial services

### Enterprise (8 questions each)
- **Oracle** - Database, Enterprise software

## 🚀 Features

### Automatic Weekly Scraping
- **Schedule**: Every Sunday at 3:00 AM UTC (8:30 AM IST)
- **Coverage**: All 15 companies automatically
- **Smart Caching**: Avoids redundant requests
- **Duplicate Detection**: Prevents question duplication

### Company Prioritization
- **High Priority**: More frequent updates (every 3 days if needed)
- **Medium Priority**: Standard weekly updates
- **Smart Scheduling**: Respects rate limits and caching

### Multi-Source Aggregation
- **LeetCode**: Technical coding problems
- **GeeksforGeeks**: DSA and system design
- **Glassdoor**: Real interview experiences
- **InterviewBit**: Curated technical questions

### Quality Control
- **Content Similarity**: Removes duplicate questions
- **Difficulty Mapping**: Standardizes across sources
- **Type Classification**: DSA, System Design, LLD
- **Tag Extraction**: Relevant technical tags

## 📋 Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Configure your secret token
CRON_SECRET_TOKEN=your-secure-random-token-here
VERCEL_URL=https://your-domain.vercel.app
```

### 2. Run Company Scraper

#### Via CLI (Interactive)
```bash
npm run scrape:companies
```

#### Via CLI (Direct Commands)
```bash
# Scrape high-priority companies
npm run scrape:companies -- --priority=high --max=15

# Indian companies only
npm run scrape:indian

# Big tech companies
npm run scrape:bigtech

# Custom companies
npm run scrape:companies -- --companies=Google,Amazon,Microsoft
```

#### Via Web Interface
Navigate to: `http://localhost:3000/admin/scraper/companies`

#### Via API
```bash
curl -X POST http://localhost:3000/api/cron/weekly-company-scraper \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companies": ["Google", "Amazon", "Microsoft"],
    "days": 7,
    "maxQuestionsPerCompany": 12
  }'
```

## 🔧 Configuration Options

### Company Categories
```javascript
const categories = {
  'all': // All 15 important companies
  'high-priority': // Google, Amazon, Microsoft, Meta, Apple
  'big-tech': // FAANG + Netflix
  'indian': // Flipkart, Swiggy, Zomato, PayTM
  'unicorns': // Uber, Airbnb, Tesla
  'enterprise': // Oracle, Salesforce, Microsoft
};
```

### Scraping Parameters
- **days**: How many days back to scrape (1-30)
- **maxQuestionsPerCompany**: Limit per company (5-50)
- **sources**: Which sources to use
- **force**: Ignore cache and scrape fresh data

### Company-Specific Limits
```env
SCRAPER_MAX_QUESTIONS_HIGH_PRIORITY=15
SCRAPER_MAX_QUESTIONS_MEDIUM_PRIORITY=10  
SCRAPER_MAX_QUESTIONS_LOW_PRIORITY=8
```

## 📊 Monitoring & Analytics

### Coverage Dashboard
Access detailed analytics at: `/api/scraper/companies?action=stats`

**Company Statistics**:
- Total questions per company
- Question type distribution (DSA, SD, LLD)
- Difficulty balance
- Coverage score (0-100%)
- Recent questions count

**Coverage Levels**:
- 🟢 **Excellent** (80-100%): Comprehensive coverage
- 🔵 **Good** (60-79%): Solid coverage
- 🟡 **Fair** (40-59%): Adequate coverage
- 🟠 **Poor** (20-39%): Needs improvement
- 🔴 **Minimal** (0-19%): Requires attention

### Company Coverage API
```bash
# Get coverage report
GET /api/scraper/companies?action=coverage

# Get companies list with stats
GET /api/scraper/companies?action=list

# Get recent questions by company
GET /api/scraper/companies?action=recent&days=7
```

### Web Interface
Visit `/admin/scraper/companies` for:
- Real-time company statistics
- Coverage visualization
- Manual scraping controls
- Results monitoring
- Companies needing attention alerts

## ⚙️ Automated Scheduling

### GitHub Actions Workflow
The system includes automated GitHub Actions for:
- **Weekly scraping**: Sundays at 3:00 AM UTC
- **Manual triggers**: Via workflow_dispatch
- **Automatic commits**: Updates `data/interview-questions.ts`
- **Failure notifications**: Slack/webhook alerts

### Vercel Cron (Alternative)
```javascript
// vercel.json
{
  "crons": [{
    "path": "/api/cron/weekly-company-scraper",
    "schedule": "0 3 * * 0"
  }]
}
```

## 📈 Usage Analytics

### CLI Command Examples

#### Interactive Mode
```bash
$ npm run scrape:companies

🏢 Company-Specific Interview Questions Scraper
==============================================

🔧 Interactive Configuration Mode

📋 Available company categories:
1. All important companies (recommended)
2. Big Tech (Google, Amazon, Microsoft, Meta, Apple, Netflix) 
3. Indian companies (Flipkart, Swiggy, Zomato, PayTM)
4. High priority only (Google, Amazon, Microsoft, Meta, Apple)
5. Custom selection

🎯 Select category (1-5): 1
📅 Days to scrape back (default: 7): 
🔢 Max questions per company (default: 12): 
🌐 Sources (default: leetcode, geeksforgeeks, glassdoor, interviewbit):

📋 Scraping Configuration:
   Companies (15): Google, Amazon, Microsoft, Meta, Apple, Netflix, Uber, Airbnb, Tesla, Salesforce, Oracle, Flipkart, Swiggy, Zomato, PayTM
   Days: 7
   Max per company: 12
   Sources: leetcode, geeksforgeeks, glassdoor, interviewbit

⏱️  Estimated time: 7.5 minutes

🚀 Starting company-specific scraping...

✅ Google: 12 questions added
✅ Amazon: 11 questions added  
✅ Microsoft: 10 questions added
⏭️  Meta: Recently updated (2 hours ago)
✅ Apple: 8 questions added
...

🎉 Scraping completed successfully!

📊 Results Summary:
   Companies processed: 15
   Successful scrapes: 12
   Failed scrapes: 0
   Total questions added: 124

📈 Company-specific results:
   ✅ Google: 12 questions
   ✅ Amazon: 11 questions
   ✅ Microsoft: 10 questions
   ⏭️ Meta: 0 questions (Recently updated (2 hours ago))
   ✅ Apple: 8 questions
   ...

✅ Company-specific scraping completed!
📝 Questions have been added to data/interview-questions.ts
```

#### Direct Commands
```bash
# High-priority companies with custom limits
npm run scrape:companies -- --priority=high --max=20 --days=14

# Force scraping (ignore cache)
npm run scrape:companies -- --force --companies=Google,Amazon

# Indian companies with specific sources  
npm run scrape:indian -- --sources=geeksforgeeks,glassdoor --max=15
```

### API Response Format
```json
{
  "success": true,
  "message": "Weekly company scraping completed successfully",
  "data": {
    "companies": 15,
    "successful": 13,
    "failed": 2,
    "totalQuestions": 147,
    "results": {
      "Google": {
        "status": "success",
        "questionsAdded": 12,
        "sources": ["leetcode", "geeksforgeeks"],
        "timestamp": "2026-05-16T10:30:00Z"
      },
      "Meta": {
        "status": "skipped", 
        "reason": "Recently updated (3 hours ago)",
        "questionsAdded": 0
      }
    }
  }
}
```

## 🔒 Security & Rate Limiting

### Authentication
- **API Token**: Required for all cron endpoints
- **Environment Variables**: Secure token storage
- **GitHub Secrets**: For workflow automation

### Rate Limiting
- **3-second delays** between companies
- **5-second delays** between categories
- **Smart caching** to minimize requests
- **Respectful scraping** practices

### Error Handling
- **Graceful failures**: Continue with other companies
- **Retry logic**: Automatic retries for transient failures
- **Notification system**: Slack/webhook alerts for failures
- **Detailed logging**: Complete audit trail

## 🎯 Best Practices

### When to Run
- **Automatic**: Let the weekly schedule handle routine updates
- **High-priority urgent**: Use priority=high for important interviews
- **Custom preparation**: Use specific companies for targeted prep
- **Fresh data needed**: Use force mode before interviews

### Optimizing Results
- **Balance sources**: Use multiple sources for comprehensive coverage
- **Respect limits**: Don't set maxQuestions too high (diminishing returns)
- **Monitor coverage**: Check `/admin/scraper/companies` regularly
- **Update regularly**: Weekly scraping ensures fresh questions

### Company Selection Strategy
- **Interview prep**: Focus on companies you're interviewing with
- **General prep**: Use "all" category for comprehensive coverage  
- **Role-specific**: Indian companies for India-based roles
- **Level-specific**: High-priority for senior/staff positions

## 🚨 Troubleshooting

### Common Issues

#### "Unauthorized" Error
```bash
# Check your token
echo $CRON_SECRET_TOKEN

# Verify in .env.local
CRON_SECRET_TOKEN=your-actual-token-here
```

#### "No questions found"
- Companies may have been recently scraped (check cache)
- Sources might be rate-limited (try later)
- Use `--force` to bypass cache

#### API Connection Failed
```bash
# Check server is running
npm run dev

# Verify API_URL 
echo $API_URL  # Should be http://localhost:3000
```

#### Performance Issues
- Reduce `maxQuestionsPerCompany`
- Use fewer sources
- Increase delays in source scrapers

### Debug Mode
```bash
# Enable verbose logging
DEBUG=scraper npm run scrape:companies

# Check specific company
npm run scrape:companies -- --companies=Google --force
```

### Support
For issues or feature requests:
1. Check the logs in `/admin/scraper/companies`
2. Verify environment variables
3. Test with a single company first
4. Check GitHub Actions workflow logs

## 🔮 Roadmap

### Upcoming Features
- **ML-based difficulty assessment**
- **Question trend analysis**  
- **Company-specific question patterns**
- **Integration with external calendars**
- **Mobile app companion**

### Data Enhancements
- **Real-time glassdoor integration**
- **LinkedIn job posting correlation**
- **Compensation data integration**
- **Interview outcome tracking**

---

**Happy interviewing! 🚀**

The company-specific scraper ensures you're always prepared with the latest questions from the companies that matter most to your career.