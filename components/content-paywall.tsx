'use client';

import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, Users, TrendingUp } from 'lucide-react';

interface ContentPaywallProps {
  /** The category of the post */
  category: string;
  /** Preview content (not used in current implementation) */
  previewContent: string;
  /** Full content (not used in current implementation) */
  fullContent: string;
  /** Post title for the paywall message */
  title: string;
  /** Estimated reading time */
  readingTime?: number;
}

export function ContentPaywall({ 
  category, 
  title, 
  readingTime 
}: ContentPaywallProps) {
  return (
    <div>
      {/* Paywall Gradient Overlay */}
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none h-32 -mt-16 z-10" />
      
      {/* Paywall Card */}
      <Card className="relative z-20 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold mb-3">Continue Reading</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in with Google to unlock the complete system design guide and access our full library of premium content.
          </p>
          
          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border">
              <Eye className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-sm">Complete Content</div>
                <div className="text-xs text-muted-foreground">Full system design with diagrams</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border">
              <Users className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-sm">Join Community</div>
                <div className="text-xs text-muted-foreground">1,247+ engineers learning</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-sm">Track Progress</div>
                <div className="text-xs text-muted-foreground">Mark posts as read</div>
              </div>
            </div>
          </div>
          
          {/* Remaining Content Stats */}
          <div className="flex items-center justify-center gap-6 mb-6 text-sm text-muted-foreground">
            {readingTime && (
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{Math.ceil(readingTime / 2)} min remaining</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>📊</span>
              <span>Interactive diagrams</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💡</span>
              <span>Interview insights</span>
            </div>
          </div>
          
          {/* Sign In Button */}
          <Button 
            onClick={() => signIn('google', { callbackUrl: window.location.href })}
            size="lg" 
            className="w-full md:w-auto px-8 py-3"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Free to sign in • No spam • Secure with Google OAuth
          </p>
          
          {/* Premium Badge */}
          <div className="mt-6 inline-flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              🚀 System Design Premium
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}