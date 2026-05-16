# Interview Questions Scraper 🤖

An automated system to scrape and collect interview questions from multiple sources, keeping your question database fresh with the latest industry trends.

## Features ✨

- **Multiple Sources**: LeetCode, GeeksforGeeks, Glassdoor, InterviewBit
- **Smart Filtering**: Filter by company, question type, difficulty, and date range
- **Automated Scheduling**: Daily scraping via GitHub Actions or cron jobs
- **Duplicate Detection**: Intelligent deduplication based on content similarity
- **Cache Management**: Respects rate limits with smart caching (6-hour default)
- **CLI Interface**: Interactive and command-line modes
- **API Endpoints**: RESTful API for programmatic access
- **Real-time Updates**: Direct updates to your `interview-questions.ts` file

## Quick Start 🚀

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Set your cron secret token
CRON_SECRET_TOKEN=your-secure-random-token-here
```

### 2. Run via CLI (Interactive Mode)

```bash
npm run scrape
```

### 3. Run via CLI (Command Line)

```bash
# Basic scraping
npm run scrape -- --days=7

# Company-specific scraping
npm run scrape -- --company=Google --days=14

# Advanced filtering
npm run scrape -- --company=Amazon --type=system-design --difficulty=hard --max=20

# Custom sources
npm run scrape -- --sources=leetcode,geeksforgeeks --days=30
```

### 4. API Usage

```bash
# Manual trigger via API
curl -X POST http://localhost:3000/api/scraper/questions \
  -H "Content-Type: application/json" \
  -d '{
    "days": 7,
    "company": "Google",
    "sources": ["leetcode", "geeksforgeeks"]
  }'

# Check scraping status
curl http://localhost:3000/api/scraper/status
```

## API Endpoints 🛠️

### Scraper Management

- `GET /api/scraper/questions` - Auto-scrape with cache check
- `POST /api/scraper/questions` - Manual scrape with custom parameters
- `GET /api/scraper/status` - Get scraping status and cache info
- `DELETE /api/scraper/status` - Clear scraping cache

### Scheduled Jobs

- `GET /api/cron/scrape-questions` - Automated daily scraping
- `POST /api/cron/scrape-questions` - Manual scheduled scraping

## Configuration Options ⚙️

### CLI Parameters

| Parameter | Description | Default | Examples |
|-----------|-------------|---------|----------|
| `--days` | Number of days to scrape | 7 | `--days=14` |
| `--company` | Specific company | All companies | `--company=Google` |
| `--type` | Question type | All types | `--type=system-design` |
| `--difficulty` | Question difficulty | All difficulties | `--difficulty=hard` |
| `--sources` | Comma-separated sources | All sources | `--sources=leetcode,glassdoor` |
| `--max` | Maximum questions | 50 | `--max=100` |
| `--force` | Ignore cache | false | `--force` |

### API Parameters

```json
{
  "days": 7,
  "company": "Google",
  "type": "system-design",
  "difficulty": "hard",
  "sources": ["leetcode", "geeksforgeeks"],
  "maxQuestions": 50
}
```

### Environment Variables

```bash
# Required
CRON_SECRET_TOKEN=your-secure-token

# Optional Configuration
SCRAPER_ENABLE_LEETCODE=true
SCRAPER_ENABLE_GEEKSFORGEEKS=true
SCRAPER_ENABLE_GLASSDOOR=true
SCRAPER_ENABLE_INTERVIEWBIT=true

SCRAPER_MAX_QUESTIONS_PER_SOURCE=25
SCRAPER_RATE_LIMIT_MS=2000
SCRAPER_CACHE_DURATION_HOURS=6

# Notifications
SCRAPER_WEBHOOK_URL=https://hooks.slack.com/...
SCRAPER_NOTIFY_ON_SUCCESS=false
SCRAPER_NOTIFY_ON_ERROR=true
```

## Automated Scheduling 📅

### GitHub Actions (Recommended)

The scraper runs automatically every day at 2:30 AM UTC via GitHub Actions:

1. **Automatic**: Runs daily with default parameters
2. **Manual**: Use "Run workflow" button in GitHub Actions tab
3. **Customizable**: Set parameters via workflow inputs

```yaml
# .github/workflows/scrape-questions.yml
on:
  schedule:
    - cron: '30 2 * * *'  # Daily at 2:30 AM UTC
  workflow_dispatch:     # Manual trigger
```

### Vercel Cron (Alternative)

Add to your `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/scrape-questions",
      "schedule": "30 2 * * *"
    }
  ]
}
```

### External Cron Services

Use any cron service to call:
```bash
curl -X GET https://yoursite.com/api/cron/scrape-questions \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
```

## Sources & Data Quality 🎯

### LeetCode
- **Content**: Company-tagged problems, trending questions
- **Quality**: High (official platform)
- **Rate Limit**: 1 request/second
- **Data**: Problem titles, difficulty, topics, company tags

### GeeksforGeeks
- **Content**: Interview experiences, company questions
- **Quality**: Medium (community-driven)
- **Rate Limit**: 1 request/2 seconds
- **Data**: Extracted from interview experience articles

### Glassdoor
- **Content**: Interview questions from reviews
- **Quality**: Medium (user-reported)
- **Rate Limit**: 1 request/3 seconds
- **Data**: Questions from interview reviews

### InterviewBit
- **Content**: Practice problems, interview experiences
- **Quality**: High (curated platform)
- **Rate Limit**: 1 request/1.5 seconds
- **Data**: Problems and experience-based questions

## Data Processing Pipeline 🔄

```mermaid
graph LR
    A[Sources] --> B[Raw Data]
    B --> C[Content Extraction]
    C --> D[Question Parsing]
    D --> E[Type Inference]
    E --> F[Tag Generation]
    F --> G[Duplicate Detection]
    G --> H[Quality Filtering]
    H --> I[Database Update]
```

### Question Processing Steps

1. **Content Extraction**: Parse HTML/JSON from source APIs
2. **Question Identification**: Extract questions using regex patterns
3. **Type Classification**: Infer DSA/System Design/LLD based on content
4. **Difficulty Mapping**: Normalize difficulty levels across sources
5. **Tag Generation**: Auto-generate relevant tags
6. **Duplicate Detection**: Content similarity matching
7. **Quality Assurance**: Filter out low-quality or incomplete questions

## Advanced Usage 🔧

### Custom Source Development

Create new scrapers by extending the base interface:

```typescript
// lib/scraper/sources/custom-scraper.ts
export class CustomScraper {
  async scrapeQuestions(options: ScrapingOptions): Promise<InterviewQuestion[]> {
    // Your scraping logic
  }
}
```

### Webhook Notifications

Set up Slack/Discord notifications:

```bash
# Environment variable
SCRAPER_WEBHOOK_URL=https://hooks.slack.com/services/...

# Notifications sent on:
# - Scraping completion
# - Errors or failures
# - New questions added
```

### Database Queries

Query the generated questions:

```typescript
import { interviewQuestions } from '@/data/interview-questions';

// Filter by company
const googleQuestions = interviewQuestions.filter(q => q.company === 'Google');

// Filter by type and difficulty
const hardSystemDesign = interviewQuestions.filter(
  q => q.type === 'system-design' && q.difficulty === 'hard'
);

// Recent questions (if you track scrape dates)
const recentQuestions = interviewQuestions.filter(
  q => q.note?.includes('2026')
);
```

## Monitoring & Debugging 🔍

### Status Endpoint

```bash
curl http://localhost:3000/api/scraper/status
```

Response:
```json
{
  "success": true,
  "data": {
    "lastUpdated": "2026-05-16T00:30:00.000Z",
    "totalQuestions": 1247,
    "recentQuestions": 23,
    "nextScheduledUpdate": "2026-05-16T06:30:00.000Z",
    "cacheStatus": "fresh",
    "sources": [
      {
        "name": "leetcode",
        "lastScrape": "2026-05-16T00:30:00.000Z",
        "questionsCount": 8,
        "status": "active"
      }
    ]
  }
}
```

### Logs & Debugging

- **API Logs**: Check Vercel/server logs for scraping activity
- **GitHub Actions**: View workflow runs for automated scraping
- **Console Output**: CLI provides detailed progress information
- **Error Handling**: Graceful fallbacks and error reporting

### Cache Management

```bash
# Clear cache via API
curl -X DELETE http://localhost:3000/api/scraper/status

# Force scraping (ignore cache)
npm run scrape -- --force
```

## Rate Limiting & Ethics 🤝

### Respectful Scraping

- **Rate Limits**: Built-in delays between requests (1-3 seconds)
- **Cache System**: Prevents unnecessary repeated requests
- **User Agents**: Identifies requests as automated scraping
- **Robots.txt**: Respects robots.txt when possible
- **Error Handling**: Graceful failure without overwhelming servers

### Rate Limit Configuration

```typescript
// lib/scraper/sources/
const RATE_LIMITS = {
  leetcode: 1000,     // 1 second
  geeksforgeeks: 2000, // 2 seconds
  glassdoor: 3000,     // 3 seconds
  interviewbit: 1500   // 1.5 seconds
};
```

## Troubleshooting 🐛

### Common Issues

**1. "Scraper not found" Error**
```bash
# Ensure all scraper files exist
ls lib/scraper/sources/
# Should show: leetcode-scraper.ts, geeksforgeeks-scraper.ts, etc.
```

**2. "Authentication Required" Error**
```bash
# Check environment variables
echo $CRON_SECRET_TOKEN
# Set in .env.local for development
```

**3. "No Questions Scraped" Warning**
```bash
# Check cache status
curl http://localhost:3000/api/scraper/status

# Force refresh if needed
npm run scrape -- --force
```

**4. GitHub Actions Failing**
- Check repository secrets (`CRON_SECRET_TOKEN`)
- Verify workflow permissions (contents: write)
- Check API endpoint accessibility

### Debug Mode

```bash
# Enable debug logging
DEBUG=scraper* npm run scrape

# Verbose CLI output
npm run scrape -- --verbose
```

## Contributing 🤝

### Adding New Sources

1. Create scraper in `lib/scraper/sources/new-source-scraper.ts`
2. Implement the `ScrapingOptions` interface
3. Add to main scraper's source map
4. Update documentation and tests

### Improving Question Quality

1. Enhance content extraction patterns
2. Improve type inference algorithms
3. Add better duplicate detection
4. Extend tag generation logic

## License & Legal 📝

This scraper:
- Respects robots.txt and rate limits
- Only scrapes publicly available content
- Attributes sources in generated questions
- Follows fair use guidelines
- Does not store or redistribute copyrighted content

**Note**: Always review the terms of service of scraped sites and ensure compliance with applicable laws and regulations.

## Support 💬

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoints and responses
- Test with CLI before automation

---

**Happy Scraping! 🎉**

Keep your interview question database fresh and comprehensive with automated, respectful data collection.