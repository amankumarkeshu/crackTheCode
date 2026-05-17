'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Database, RefreshCw, Settings } from 'lucide-react';

interface ScrapingStatus {
  lastUpdated: string | null;
  totalQuestions: number;
  recentQuestions: number;
  nextScheduledUpdate: string | null;
  cacheStatus: 'fresh' | 'stale' | 'expired';
  sources: {
    name: string;
    lastScrape: string | null;
    questionsCount: number;
    status: 'active' | 'error' | 'rate_limited';
  }[];
}

interface ScrapingConfig {
  days: number;
  company: string;
  type: string;
  difficulty: string;
  sources: string[];
  maxQuestions: number;
}

export default function ScraperAdminPage() {
  const [status, setStatus] = useState<ScrapingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [config, setConfig] = useState<ScrapingConfig>({
    days: 7,
    company: '',
    type: 'all',
    difficulty: 'all',
    sources: ['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'],
    maxQuestions: 50
  });
  const [lastResult, setLastResult] = useState<any>(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/scraper/status-working');
      const data = await response.json();
      
      if (data.success) {
        setStatus(data.data);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    setLastResult(null);

    try {
      const response = await fetch('/api/scraper/questions-working', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...config,
          type: config.type === 'all' ? undefined : config.type,
          difficulty: config.difficulty === 'all' ? undefined : config.difficulty
        }),
      });

      const result = await response.json();
      setLastResult(result);
      
      if (result.success) {
        // Refresh status after successful scraping
        setTimeout(() => {
          fetchStatus();
        }, 1000);
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: 'Failed to start scraping',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setScraping(false);
    }
  };

  const handleClearCache = async () => {
    try {
      const response = await fetch('/api/scraper/status-working', {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        fetchStatus();
        setLastResult({
          success: true,
          message: 'Cache cleared successfully'
        });
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: 'Failed to clear cache'
      });
    }
  };

  const getCacheStatusBadge = (status: string) => {
    switch (status) {
      case 'fresh':
        return <Badge className="bg-green-100 text-green-800">Fresh</Badge>;
      case 'stale':
        return <Badge className="bg-yellow-100 text-yellow-800">Stale</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getSourceStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'rate_limited':
        return <Badge className="bg-orange-100 text-orange-800">Rate Limited</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleSourceToggle = (source: string, checked: boolean) => {
    if (checked) {
      setConfig(prev => ({
        ...prev,
        sources: [...prev.sources, source]
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        sources: prev.sources.filter(s => s !== source)
      }));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading scraper status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Questions Scraper</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your automated question scraping system
          </p>
        </div>
        <Button onClick={fetchStatus} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status?.totalQuestions || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Questions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status?.recentQuestions || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {status && getCacheStatusBadge(status.cacheStatus)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {status?.lastUpdated 
                ? new Date(status.lastUpdated).toLocaleDateString()
                : 'Never'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Sources Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {status?.sources?.map((source) => (
              <div key={source.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium capitalize">{source.name}</h4>
                  {getSourceStatusBadge(source.status)}
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Questions: {source.questionsCount}</div>
                  <div>
                    Last Scrape: {source.lastScrape 
                      ? new Date(source.lastScrape).toLocaleDateString()
                      : 'Never'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scraper Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Scraping</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure and run manual scraping with custom parameters
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="days">Days to Scrape</Label>
              <Input
                id="days"
                type="number"
                value={config.days}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  days: parseInt(e.target.value) || 7
                }))}
                min="1"
                max="30"
              />
            </div>

            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={config.company}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  company: e.target.value
                }))}
                placeholder="e.g., Google, Amazon"
              />
            </div>

            <div>
              <Label htmlFor="maxQuestions">Max Questions</Label>
              <Input
                id="maxQuestions"
                type="number"
                value={config.maxQuestions}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  maxQuestions: parseInt(e.target.value) || 50
                }))}
                min="1"
                max="200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Question Type</Label>
              <Select value={config.type} onValueChange={(value) => setConfig(prev => ({
                ...prev,
                type: value
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="dsa">DSA</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                  <SelectItem value="lld">Low Level Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={config.difficulty} onValueChange={(value) => setConfig(prev => ({
                ...prev,
                difficulty: value
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Sources to Scrape</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {['leetcode', 'geeksforgeeks', 'glassdoor', 'interviewbit'].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={source}
                    checked={config.sources.includes(source)}
                    onCheckedChange={(checked) => handleSourceToggle(source, checked as boolean)}
                  />
                  <Label htmlFor={source} className="capitalize">{source}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={handleScrape} 
              disabled={scraping || config.sources.length === 0}
              className="flex-1"
            >
              {scraping ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Start Scraping
                </>
              )}
            </Button>

            <Button 
              onClick={handleClearCache} 
              variant="outline"
              disabled={scraping}
            >
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {lastResult.success ? (
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              )}
              Scraping Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(lastResult, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Scheduled Update */}
      {status?.nextScheduledUpdate && (
        <Card>
          <CardHeader>
            <CardTitle>Next Scheduled Update</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The next automatic scraping is scheduled for:{' '}
              <strong>
                {new Date(status.nextScheduledUpdate).toLocaleString()}
              </strong>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}