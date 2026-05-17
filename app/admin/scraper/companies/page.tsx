'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { IMPORTANT_COMPANIES, getCompanyPriority } from '@/lib/scraper/company-config';

// Company categories for the UI
const COMPANY_CATEGORIES = {
  'all': IMPORTANT_COMPANIES,
  'big-tech': ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'],
  'high-priority': ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'],
  'indian': ['Flipkart', 'Swiggy', 'Zomato', 'PayTM'],
  'unicorns': ['Uber', 'Airbnb', 'Tesla'],
  'enterprise': ['Oracle', 'Salesforce', 'Microsoft']
};

interface CompanyStats {
  totalQuestions: number;
  coverage: string;
  coverageScore: number;
  priority: string;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
  recentQuestions: number;
}

interface ScrapingResult {
  success: boolean;
  message: string;
  data?: {
    companies: number;
    successful: number;
    failed: number;
    totalQuestions: number;
    results: Record<string, any>;
  };
}

export default function CompaniesScraper() {
  const [companyStats, setCompanyStats] = useState<Record<string, CompanyStats>>({});
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customCompanies, setCustomCompanies] = useState<string[]>([]);
  const [days, setDays] = useState(7);
  const [maxQuestions, setMaxQuestions] = useState(12);
  const [sources, setSources] = useState(['leetcode', 'geeksforgeeks', 'glassdoor']);
  const [forceMode, setForceMode] = useState(false);
  const [result, setResult] = useState<ScrapingResult | null>(null);
  const [coverage, setCoverage] = useState<any>(null);

  useEffect(() => {
    loadCompanyStats();
    loadCoverage();
  }, []);

  const loadCompanyStats = async () => {
    try {
      const response = await fetch('/api/scraper/companies?action=stats');
      const data = await response.json();
      
      if (data.success) {
        setCompanyStats(data.data.companyStats);
      }
    } catch (error) {
      console.error('Failed to load company stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCoverage = async () => {
    try {
      const response = await fetch('/api/scraper/companies?action=coverage');
      const data = await response.json();
      
      if (data.success) {
        setCoverage(data.data);
      }
    } catch (error) {
      console.error('Failed to load coverage:', error);
    }
  };

  const runCompanyScraper = async () => {
    setScraping(true);
    setResult(null);

    try {
      const companies = selectedCategory === 'custom' 
        ? customCompanies 
        : COMPANY_CATEGORIES[selectedCategory as keyof typeof COMPANY_CATEGORIES];

      const requestBody = {
        companies,
        days,
        maxQuestionsPerCompany: maxQuestions,
        sources,
        force: forceMode
      };

      const response = await fetch('/api/cron/weekly-company-scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET_TOKEN || 'demo-token'}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        // Reload stats after successful scraping
        setTimeout(() => {
          loadCompanyStats();
          loadCoverage();
        }, 2000);
      }

    } catch (error) {
      console.error('Scraping failed:', error);
      setResult({
        success: false,
        message: `Failed to run company scraper: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setScraping(false);
    }
  };

  const getSelectedCompanies = () => {
    if (selectedCategory === 'custom') {
      return customCompanies;
    }
    return COMPANY_CATEGORIES[selectedCategory as keyof typeof COMPANY_CATEGORIES] || [];
  };

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'minimal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading company statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company-Specific Scraper</h1>
        <p className="text-gray-600">Manage interview questions scraping for top companies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Coverage Summary */}
        {coverage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                📊 Coverage Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Complete:</span>
                  <Badge className="bg-green-100 text-green-800">{coverage.summary?.complete || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Good:</span>
                  <Badge className="bg-blue-100 text-blue-800">{coverage.summary?.good || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Needs Attention:</span>
                  <Badge className="bg-orange-100 text-orange-800">{coverage.summary?.needsAttention || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => {
                setSelectedCategory('high-priority');
                setMaxQuestions(15);
                setDays(7);
              }}
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              High Priority Companies
            </Button>
            <Button 
              onClick={() => {
                setSelectedCategory('indian');
                setMaxQuestions(12);
                setDays(7);
              }}
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              Indian Companies Only
            </Button>
            <Button 
              onClick={() => {
                setSelectedCategory('big-tech');
                setMaxQuestions(15);
                setDays(14);
              }}
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              Big Tech Focus
            </Button>
          </CardContent>
        </Card>

        {/* Next Scraping */}
        <Card>
          <CardHeader>
            <CardTitle>⏰ Scheduling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Automatic weekly scraping:</p>
              <p className="font-medium">Every Sunday at 3:00 AM UTC</p>
              <p className="text-xs mt-2">Covers all 15 important companies</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Scraping Configuration</CardTitle>
            <CardDescription>Configure company-specific scraping parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Company Selection */}
            <div>
              <Label htmlFor="category">Company Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Important Companies (15)</SelectItem>
                  <SelectItem value="high-priority">High Priority (5)</SelectItem>
                  <SelectItem value="big-tech">Big Tech (6)</SelectItem>
                  <SelectItem value="indian">Indian Companies (4)</SelectItem>
                  <SelectItem value="unicorns">Unicorns (3)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (3)</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Company Selection */}
            {selectedCategory === 'custom' && (
              <div>
                <Label>Custom Companies</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {IMPORTANT_COMPANIES.map(company => (
                    <div key={company} className="flex items-center space-x-2">
                      <Checkbox
                        id={company}
                        checked={customCompanies.includes(company)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCustomCompanies([...customCompanies, company]);
                          } else {
                            setCustomCompanies(customCompanies.filter(c => c !== company));
                          }
                        }}
                      />
                      <Label htmlFor={company} className="text-sm">
                        {company}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Configuration Options */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="days">Days Back</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 7)}
                />
              </div>
              <div>
                <Label htmlFor="maxQuestions">Max Questions/Company</Label>
                <Input
                  id="maxQuestions"
                  type="number"
                  min="5"
                  max="50"
                  value={maxQuestions}
                  onChange={(e) => setMaxQuestions(parseInt(e.target.value) || 12)}
                />
              </div>
            </div>

            {/* Sources */}
            <div>
              <Label>Sources</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'].map(source => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={source}
                      checked={sources.includes(source)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSources([...sources, source]);
                        } else {
                          setSources(sources.filter(s => s !== source));
                        }
                      }}
                    />
                    <Label htmlFor={source} className="text-sm capitalize">
                      {source}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="force"
                checked={forceMode}
                onCheckedChange={(checked) => setForceMode(!!checked)}
              />
              <Label htmlFor="force">Force Mode (ignore cache)</Label>
            </div>

            {/* Summary */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Configuration Summary:</p>
              <p className="text-sm text-gray-600">
                {getSelectedCompanies().length} companies, {days} days back, 
                up to {maxQuestions} questions each from {sources.length} sources
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Estimated time: ~{Math.ceil(getSelectedCompanies().length * 0.5)} minutes
              </p>
            </div>

            {/* Action Button */}
            <Button 
              onClick={runCompanyScraper}
              disabled={scraping || getSelectedCompanies().length === 0 || sources.length === 0}
              className="w-full"
            >
              {scraping ? 'Scraping...' : 'Start Company Scraping'}
            </Button>
          </CardContent>
        </Card>

        {/* Company Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Company Statistics</CardTitle>
            <CardDescription>Current question coverage by company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {IMPORTANT_COMPANIES.map(company => {
                const stats = companyStats[company];
                return (
                  <div key={company} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{company}</span>
                        <Badge className={getPriorityColor(stats?.priority || 'low')}>
                          {stats?.priority || 'low'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{stats?.totalQuestions || 0} questions</span>
                        <Badge className={getCoverageColor(stats?.coverage || 'minimal')}>
                          {stats?.coverage || 'minimal'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stats?.coverageScore || 0}%</div>
                      <div className="text-xs text-gray-500">
                        {stats?.recentQuestions || 0} recent
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Display */}
      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className={result.success ? 'text-green-700' : 'text-red-700'}>
              {result.success ? '✅ Scraping Results' : '❌ Scraping Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{result.message}</p>
            
            {result.success && result.data && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.data.companies}</div>
                    <div className="text-sm text-blue-600">Companies</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{result.data.successful}</div>
                    <div className="text-sm text-green-600">Successful</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{result.data.failed}</div>
                    <div className="text-sm text-red-600">Failed</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{result.data.totalQuestions}</div>
                    <div className="text-sm text-purple-600">Questions</div>
                  </div>
                </div>

                {result.data.results && (
                  <div>
                    <h4 className="font-medium mb-2">Company Results:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {Object.entries(result.data.results).map(([company, data]: [string, any]) => (
                        <div key={company} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{company}</span>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={
                                data.status === 'success' ? 'bg-green-100 text-green-800' :
                                data.status === 'skipped' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {data.status}
                            </Badge>
                            <span className="text-sm">{data.questionsAdded || 0} questions</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Companies Needing Attention */}
      {coverage?.needsAttention && coverage.needsAttention.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-orange-700">⚠️ Companies Needing Attention</CardTitle>
            <CardDescription>Companies with insufficient question coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {coverage.needsAttention.slice(0, 5).map((item: any) => (
                <div key={item.company} className="flex items-center justify-between p-3 border border-orange-200 rounded-lg">
                  <div>
                    <span className="font-medium">{item.company}</span>
                    <Badge className={`${getPriorityColor(item.priority)} ml-2 text-xs`}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {item.current}/{item.target} questions ({item.percentage}%)
                    </div>
                    <div className="text-xs text-orange-600">
                      Need {item.needed} more questions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}