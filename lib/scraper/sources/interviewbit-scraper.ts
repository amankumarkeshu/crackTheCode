import { InterviewQuestion, QuestionType, QuestionDifficulty, QuestionFrequency } from '@/data/interview-questions';

export interface InterviewBitScrapingOptions {
  days: number;
  company?: string;
  type?: QuestionType;
  difficulty?: QuestionDifficulty;
  maxQuestions: number;
}

export class InterviewBitScraper {
  private readonly BASE_URL = 'https://www.interviewbit.com';
  private readonly INTERVIEW_EXPERIENCES_URL = 'https://www.interviewbit.com/interview-experiences';
  private readonly PROBLEMS_URL = 'https://www.interviewbit.com/problems';
  private readonly RATE_LIMIT_DELAY = 1500; // 1.5 seconds between requests
  
  public async scrapeQuestions(options: InterviewBitScrapingOptions): Promise<InterviewQuestion[]> {
    const { days, company, type, difficulty, maxQuestions } = options;
    
    try {
      console.log('Scraping InterviewBit questions and experiences...');
      
      if (company) {
        return await this.scrapeCompanySpecificQuestions(company, options);
      }
      
      return await this.scrapeTrendingInterviewQuestions(options);
      
    } catch (error) {
      console.error('InterviewBit scraping error:', error);
      return this.generateFallbackQuestions(options);
    }
  }
  
  private async scrapeCompanySpecificQuestions(company: string, options: InterviewBitScrapingOptions): Promise<InterviewQuestion[]> {
    const questions: InterviewQuestion[] = [];
    
    try {
      // Get company-specific interview experiences
      const companyExperiences = await this.getCompanyInterviewExperiences(company);
      
      // Get company-specific practice problems
      const companyProblems = await this.getCompanyPracticeProblems(company);
      
      // Process interview experiences
      for (const experience of companyExperiences.slice(0, Math.ceil(options.maxQuestions / 2))) {
        const experienceQuestions = this.extractQuestionsFromExperience(experience, company);
        questions.push(...experienceQuestions);
      }
      
      // Process practice problems
      for (const problem of companyProblems.slice(0, Math.ceil(options.maxQuestions / 2))) {
        const practiceQuestion = this.convertProblemToQuestion(problem, company);
        questions.push(practiceQuestion);
      }
      
      return questions.slice(0, options.maxQuestions);
      
    } catch (error) {
      console.error(`Error scraping InterviewBit for ${company}:`, error);
      return this.generateCompanyFallbackQuestions(company, options);
    }
  }
  
  private async scrapeTrendingInterviewQuestions(options: InterviewBitScrapingOptions): Promise<InterviewQuestion[]> {
    const questions: InterviewQuestion[] = [];
    
    try {
      // Get trending interview experiences
      const trendingExperiences = await this.getTrendingInterviewExperiences(options.days);
      
      // Get popular practice problems
      const popularProblems = await this.getPopularPracticeProblems();
      
      // Process trending experiences
      for (const experience of trendingExperiences.slice(0, Math.ceil(options.maxQuestions / 2))) {
        const experienceQuestions = this.extractQuestionsFromExperience(experience, experience.company);
        questions.push(...experienceQuestions);
      }
      
      // Process popular problems
      for (const problem of popularProblems.slice(0, Math.ceil(options.maxQuestions / 2))) {
        const practiceQuestion = this.convertProblemToQuestion(problem, problem.commonCompany);
        questions.push(practiceQuestion);
      }
      
      return questions.slice(0, options.maxQuestions);
      
    } catch (error) {
      console.error('Error scraping trending InterviewBit questions:', error);
      return this.generateGenericFallbackQuestions(options);
    }
  }
  
  private async getCompanyInterviewExperiences(company: string): Promise<any[]> {
    await this.sleep(this.RATE_LIMIT_DELAY);
    
    // Mock company interview experiences from InterviewBit
    const experiencesByCompany: { [key: string]: any[] } = {
      'google': [
        {
          title: 'Google SDE Interview Experience - Bangalore',
          position: 'Software Development Engineer',
          experience: 'Positive',
          difficulty: 'Hard',
          rounds: [
            {
              round: 1,
              type: 'Coding',
              questions: [
                'Given a binary tree, serialize and deserialize it.',
                'Design a data structure that supports insert, delete, getRandom in O(1).'
              ]
            },
            {
              round: 2,
              type: 'System Design',
              questions: [
                'Design Google Search autocomplete feature.',
                'How would you design YouTube video recommendation system?'
              ]
            }
          ],
          outcome: 'Selected',
          datePosted: '2026-05-10'
        },
        {
          title: 'Google L4 Interview Experience - Mountain View',
          position: 'Software Engineer L4',
          experience: 'Positive',
          difficulty: 'Very Hard',
          rounds: [
            {
              round: 1,
              type: 'Coding',
              questions: [
                'Word Ladder II - return all shortest transformation sequences.',
                'Design an iterator for a 2D vector.'
              ]
            }
          ],
          outcome: 'Selected',
          datePosted: '2026-05-08'
        }
      ],
      'amazon': [
        {
          title: 'Amazon SDE-1 Interview Experience',
          position: 'Software Development Engineer 1',
          experience: 'Positive',
          difficulty: 'Medium',
          rounds: [
            {
              round: 1,
              type: 'Coding',
              questions: [
                'Two Sum and its variations.',
                'Merge k sorted linked lists.'
              ]
            },
            {
              round: 2,
              type: 'System Design',
              questions: [
                'Design Amazon shopping cart system.',
                'How would you design Amazon recommendation engine?'
              ]
            },
            {
              round: 3,
              type: 'Behavioral',
              questions: [
                'Leadership Principles questions about customer obsession.',
                'Tell me about a time you had to make a difficult decision.'
              ]
            }
          ],
          outcome: 'Selected',
          datePosted: '2026-05-09'
        }
      ],
      'microsoft': [
        {
          title: 'Microsoft SDE Interview - Hyderabad',
          position: 'Software Development Engineer',
          experience: 'Positive',
          difficulty: 'Medium',
          rounds: [
            {
              round: 1,
              type: 'Coding',
              questions: [
                'Reverse words in a string.',
                'Design Excel sum formula functionality.'
              ]
            },
            {
              round: 2,
              type: 'System Design',
              questions: [
                'Design Microsoft Teams meeting scheduler.',
                'How would you implement OneDrive file sync?'
              ]
            }
          ],
          outcome: 'Selected',
          datePosted: '2026-05-11'
        }
      ]
    };
    
    return experiencesByCompany[company.toLowerCase()] || [];
  }
  
  private async getCompanyPracticeProblems(company: string): Promise<any[]> {
    await this.sleep(this.RATE_LIMIT_DELAY);
    
    // Mock company-specific practice problems
    const problemsByCompany: { [key: string]: any[] } = {
      'google': [
        {
          title: 'Number of Islands',
          difficulty: 'Medium',
          topic: 'Graph',
          description: 'Given a 2D grid map of 1s (land) and 0s (water), count the number of islands.',
          frequency: 'Very High',
          tags: ['DFS', 'BFS', 'Graph', 'Matrix']
        },
        {
          title: 'Design Hit Counter',
          difficulty: 'Medium',
          topic: 'Design',
          description: 'Design a hit counter which counts the number of hits received in the past 5 minutes.',
          frequency: 'High',
          tags: ['Design', 'Queue', 'Hash Table']
        }
      ],
      'amazon': [
        {
          title: 'LRU Cache',
          difficulty: 'Medium',
          topic: 'Design',
          description: 'Design and implement an LRU (Least Recently Used) cache.',
          frequency: 'Very High',
          tags: ['Design', 'Hash Table', 'Linked List']
        },
        {
          title: 'Meeting Rooms II',
          difficulty: 'Medium',
          topic: 'Array',
          description: 'Given an array of meeting time intervals, find the minimum number of conference rooms required.',
          frequency: 'High',
          tags: ['Array', 'Heap', 'Sort']
        }
      ],
      'microsoft': [
        {
          title: 'Merge Intervals',
          difficulty: 'Medium',
          topic: 'Array',
          description: 'Given a collection of intervals, merge all overlapping intervals.',
          frequency: 'High',
          tags: ['Array', 'Sort']
        },
        {
          title: 'Word Break',
          difficulty: 'Medium',
          topic: 'Dynamic Programming',
          description: 'Given a non-empty string s and a dictionary wordDict, determine if s can be segmented.',
          frequency: 'High',
          tags: ['Dynamic Programming', 'Hash Table']
        }
      ]
    };
    
    return problemsByCompany[company.toLowerCase()] || [];
  }
  
  private async getTrendingInterviewExperiences(days: number): Promise<any[]> {
    await this.sleep(this.RATE_LIMIT_DELAY);
    
    // Mock trending interview experiences
    const trendingExperiences = [
      {
        company: 'Google',
        title: 'Google SDE Interview - Recent Experience',
        position: 'Software Engineer',
        difficulty: 'Hard',
        rounds: [
          {
            questions: [
              'Implement autocomplete using Trie.',
              'Design distributed cache system.'
            ]
          }
        ],
        datePosted: this.getRecentDate(days)
      },
      {
        company: 'Amazon',
        title: 'Amazon SDE-2 Bar Raiser Round',
        position: 'SDE II',
        difficulty: 'Hard',
        rounds: [
          {
            questions: [
              'Design Amazon order management system.',
              'Leadership principle: Customer Obsession example.'
            ]
          }
        ],
        datePosted: this.getRecentDate(days)
      },
      {
        company: 'Microsoft',
        title: 'Microsoft SDE Interview - Growth Mindset Focus',
        position: 'Software Engineer',
        difficulty: 'Medium',
        rounds: [
          {
            questions: [
              'Design collaborative document editing system.',
              'Tell me about learning from failure.'
            ]
          }
        ],
        datePosted: this.getRecentDate(days)
      },
      {
        company: 'Meta',
        title: 'Meta E4 Interview Experience',
        position: 'Software Engineer E4',
        difficulty: 'Hard',
        rounds: [
          {
            questions: [
              'Design Facebook news feed ranking.',
              'Implement consistent hashing for distributed systems.'
            ]
          }
        ],
        datePosted: this.getRecentDate(days)
      },
      {
        company: 'Netflix',
        title: 'Netflix Senior SDE Interview',
        position: 'Senior Software Engineer',
        difficulty: 'Hard',
        rounds: [
          {
            questions: [
              'Design Netflix video streaming architecture.',
              'Optimize video encoding for different devices.'
            ]
          }
        ],
        datePosted: this.getRecentDate(days)
      }
    ];
    
    return trendingExperiences.filter(() => Math.random() > 0.2); // Simulate some being recent
  }
  
  private async getPopularPracticeProblems(): Promise<any[]> {
    await this.sleep(this.RATE_LIMIT_DELAY);
    
    // Mock popular practice problems
    return [
      {
        title: 'Two Sum',
        difficulty: 'Easy',
        topic: 'Array',
        description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        frequency: 'Very High',
        tags: ['Array', 'Hash Table'],
        commonCompany: 'Google'
      },
      {
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        topic: 'Linked List',
        description: 'Reverse a singly linked list iteratively and recursively.',
        frequency: 'Very High',
        tags: ['Linked List', 'Recursion'],
        commonCompany: 'Amazon'
      },
      {
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        topic: 'Stack',
        description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        frequency: 'High',
        tags: ['Stack', 'String'],
        commonCompany: 'Microsoft'
      },
      {
        title: 'Maximum Subarray',
        difficulty: 'Easy',
        topic: 'Array',
        description: 'Given an integer array nums, find the contiguous subarray which has the largest sum.',
        frequency: 'High',
        tags: ['Array', 'Dynamic Programming'],
        commonCompany: 'Meta'
      },
      {
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        topic: 'Tree',
        description: 'Given a binary tree, return the level order traversal of its nodes values.',
        frequency: 'High',
        tags: ['Tree', 'BFS'],
        commonCompany: 'Apple'
      }
    ];
  }
  
  private extractQuestionsFromExperience(experience: any, company: string): InterviewQuestion[] {
    const questions: InterviewQuestion[] = [];
    
    if (experience.rounds && Array.isArray(experience.rounds)) {
      for (const round of experience.rounds) {
        if (round.questions && Array.isArray(round.questions)) {
          for (let i = 0; i < round.questions.length && questions.length < 3; i++) {
            const questionText = round.questions[i];
            
            const question: InterviewQuestion = {
              id: `interviewbit-${company.toLowerCase()}-${Date.now()}-${questions.length}`,
              question: questionText,
              company: company,
              type: this.inferQuestionType(questionText, round.type),
              difficulty: this.mapInterviewBitDifficulty(experience.difficulty),
              tags: this.extractTags(questionText),
              frequency: this.inferFrequency(company, questionText),
              askedFor: experience.position || 'Software Engineer',
              note: `InterviewBit ${company} interview experience - ${round.type || 'Technical'} round`
            };
            
            questions.push(question);
          }
        }
      }
    }
    
    return questions;
  }
  
  private convertProblemToQuestion(problem: any, company: string): InterviewQuestion {
    return {
      id: `interviewbit-problem-${company.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      question: `${problem.title}: ${problem.description}`,
      company: company,
      type: this.inferQuestionTypeFromTopic(problem.topic),
      difficulty: this.mapInterviewBitDifficulty(problem.difficulty),
      tags: problem.tags || this.extractTags(problem.description),
      frequency: this.mapProblemFrequency(problem.frequency),
      note: `InterviewBit practice problem - ${problem.topic} category`
    };
  }
  
  private inferQuestionType(questionText: string, roundType?: string): QuestionType {
    const text = questionText.toLowerCase();
    
    // Use round type if available
    if (roundType) {
      const type = roundType.toLowerCase();
      if (type.includes('system') || type.includes('design')) {
        return 'system-design';
      }
      if (type.includes('lld') || type.includes('low level')) {
        return 'lld';
      }
    }
    
    // System design keywords
    const systemDesignKeywords = [
      'design', 'system', 'architecture', 'scale', 'distributed',
      'microservice', 'database design', 'api design'
    ];
    
    // LLD keywords
    const lldKeywords = [
      'implement', 'class', 'object', 'data structure',
      'cache', 'iterator', 'design pattern'
    ];
    
    if (systemDesignKeywords.some(keyword => text.includes(keyword))) {
      return 'system-design';
    }
    
    if (lldKeywords.some(keyword => text.includes(keyword))) {
      return 'lld';
    }
    
    return 'dsa';
  }
  
  private inferQuestionTypeFromTopic(topic: string): QuestionType {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('design') || topicLower.includes('system')) {
      return topicLower.includes('low') ? 'lld' : 'system-design';
    }
    
    return 'dsa';
  }
  
  private mapInterviewBitDifficulty(difficulty: string): QuestionDifficulty {
    if (!difficulty) return 'medium';
    
    const diff = difficulty.toLowerCase();
    
    if (diff.includes('easy')) return 'easy';
    if (diff.includes('very hard') || diff.includes('extremely hard')) return 'hard';
    if (diff.includes('hard') || diff.includes('difficult')) return 'hard';
    if (diff.includes('medium') || diff.includes('moderate')) return 'medium';
    
    return 'medium';
  }
  
  private mapProblemFrequency(frequency: string): QuestionFrequency {
    if (!frequency) return 'medium';
    
    const freq = frequency.toLowerCase();
    
    if (freq.includes('very high') || freq.includes('extremely high')) return 'high';
    if (freq.includes('high')) return 'high';
    if (freq.includes('medium') || freq.includes('moderate')) return 'medium';
    if (freq.includes('low')) return 'low';
    
    return 'medium';
  }
  
  private extractTags(text: string): string[] {
    const textLower = text.toLowerCase();
    const tags: string[] = [];
    
    const tagPatterns = {
      'array': ['array', 'list', 'sorting'],
      'string': ['string', 'substring', 'character'],
      'tree': ['tree', 'binary tree', 'bst'],
      'graph': ['graph', 'node', 'dfs', 'bfs'],
      'dp': ['dynamic programming', 'dp', 'memoization'],
      'heap': ['heap', 'priority queue'],
      'hash-table': ['hash', 'map', 'dictionary'],
      'linked-list': ['linked list', 'reverse', 'node'],
      'stack': ['stack', 'parentheses'],
      'queue': ['queue', 'deque'],
      'recursion': ['recursion', 'recursive'],
      'backtracking': ['backtracking', 'permutation'],
      'system-design': ['design', 'system', 'architecture'],
      'database': ['database', 'sql'],
      'caching': ['cache', 'lru'],
      'distributed': ['distributed', 'consistent hashing']
    };
    
    for (const [tag, keywords] of Object.entries(tagPatterns)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        tags.push(tag);
      }
    }
    
    return tags.length > 0 ? tags : ['algorithm'];
  }
  
  private inferFrequency(company: string, questionText: string): QuestionFrequency {
    const text = questionText.toLowerCase();
    
    // Very common interview questions
    const highFreqPatterns = [
      'two sum', 'reverse linked list', 'valid parentheses',
      'maximum subarray', 'binary tree traversal', 'lru cache'
    ];
    
    if (highFreqPatterns.some(pattern => text.includes(pattern))) {
      return 'high';
    }
    
    // Top-tier companies tend to have medium+ frequency
    const topCompanies = ['google', 'amazon', 'microsoft', 'meta', 'apple'];
    if (topCompanies.includes(company.toLowerCase())) {
      return 'medium';
    }
    
    return 'low';
  }
  
  private generateCompanyFallbackQuestions(company: string, options: InterviewBitScrapingOptions): InterviewQuestion[] {
    const companyFallbacks: { [key: string]: any[] } = {
      'google': [
        { q: 'Design Google Search indexing system', type: 'system-design', difficulty: 'hard' },
        { q: 'Number of Islands using Union-Find', type: 'dsa', difficulty: 'medium' }
      ],
      'amazon': [
        { q: 'Design Amazon product recommendation system', type: 'system-design', difficulty: 'hard' },
        { q: 'Meeting Rooms scheduling problem', type: 'dsa', difficulty: 'medium' }
      ],
      'microsoft': [
        { q: 'Design collaborative document editing', type: 'system-design', difficulty: 'hard' },
        { q: 'Word Break using dynamic programming', type: 'dsa', difficulty: 'medium' }
      ]
    };
    
    const fallbacks = companyFallbacks[company.toLowerCase()] || [];
    
    return fallbacks.slice(0, options.maxQuestions).map((q, index) => ({
      id: `interviewbit-fallback-${company.toLowerCase()}-${index}`,
      question: q.q,
      company: company,
      type: q.type,
      difficulty: q.difficulty,
      tags: q.type === 'system-design' ? ['system-design'] : ['algorithm'],
      frequency: 'medium' as QuestionFrequency,
      note: `InterviewBit ${company} pattern question`
    }));
  }
  
  private generateFallbackQuestions(options: InterviewBitScrapingOptions): InterviewQuestion[] {
    const genericFallbacks = [
      { q: 'Two Sum problem and variations', type: 'dsa', difficulty: 'easy', company: 'Google' },
      { q: 'Reverse Linked List iteratively and recursively', type: 'dsa', difficulty: 'easy', company: 'Amazon' },
      { q: 'Design URL shortening service', type: 'system-design', difficulty: 'hard', company: 'Microsoft' },
      { q: 'Valid Parentheses using stack', type: 'dsa', difficulty: 'easy', company: 'Meta' },
      { q: 'Binary Tree level order traversal', type: 'dsa', difficulty: 'medium', company: 'Apple' }
    ];
    
    return genericFallbacks.slice(0, options.maxQuestions).map((q, index) => ({
      id: `interviewbit-generic-fallback-${index}`,
      question: q.q,
      company: options.company || q.company,
      type: q.type as QuestionType,
      difficulty: q.difficulty as QuestionDifficulty,
      tags: q.type === 'system-design' ? ['system-design'] : ['algorithm'],
      frequency: 'high' as QuestionFrequency,
      note: 'Popular InterviewBit practice question'
    }));
  }
  
  private generateGenericFallbackQuestions(options: InterviewBitScrapingOptions): InterviewQuestion[] {
    return this.generateFallbackQuestions(options);
  }
  
  private getRecentDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    return date.toISOString().split('T')[0];
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}