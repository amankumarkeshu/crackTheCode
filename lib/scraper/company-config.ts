// Top 15 most important companies for interview preparation
export const IMPORTANT_COMPANIES = [
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
export const COMPANY_CONFIGS = {
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

// Function to get company priority
export function getCompanyPriority(company: string): 'high' | 'medium' | 'low' {
  const highPriority = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];
  const mediumPriority = ['Netflix', 'Uber', 'Airbnb', 'Tesla', 'Salesforce', 'Flipkart', 'Swiggy'];
  
  if (highPriority.includes(company)) return 'high';
  if (mediumPriority.includes(company)) return 'medium';
  return 'low';
}

// Function to get company configuration
export function getCompanyConfig(company: string) {
  for (const [category, config] of Object.entries(COMPANY_CONFIGS)) {
    if (config.companies.includes(company)) {
      return {
        category,
        maxQuestions: config.maxQuestions,
        sources: config.sources
      };
    }
  }
  return null;
}