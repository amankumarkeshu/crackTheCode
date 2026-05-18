/**
 * Utilities for creating content previews and handling paywall logic
 */

export interface ContentSplit {
  previewContent: string;
  fullContent: string;
  hasMore: boolean;
}

/**
 * Split markdown content into preview and full versions
 * @param content - Raw markdown content
 * @param previewLength - Approximate character length for preview (default: 2000)
 * @returns Object with preview and full content
 */
export function splitContent(content: string, previewLength: number = 2000): ContentSplit {
  // If content is shorter than preview length, return as-is
  if (content.length <= previewLength) {
    return {
      previewContent: content,
      fullContent: content,
      hasMore: false
    };
  }

  // Try to split at natural breakpoints (headers, paragraphs)
  const lines = content.split('\n');
  let previewLines: string[] = [];
  let currentLength = 0;
  let foundGoodBreakpoint = false;

  // Look for natural breakpoints
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLength = line.length + 1; // +1 for newline
    
    // If adding this line would exceed preview length
    if (currentLength + lineLength > previewLength) {
      // Look ahead for a good breakpoint within next few lines
      const lookahead = 5;
      for (let j = i; j < Math.min(i + lookahead, lines.length); j++) {
        const nextLine = lines[j];
        
        // Good breakpoints: headers, empty lines, horizontal rules
        if (
          nextLine.startsWith('## ') ||           // H2 headers
          nextLine.startsWith('### ') ||          // H3 headers  
          nextLine.trim() === '' ||               // Empty lines
          nextLine.startsWith('---') ||           // Horizontal rules
          nextLine.startsWith('<Callout') ||      // Callout components
          nextLine.startsWith('<Excalidraw')      // Excalidraw components
        ) {
          // Include lines up to this breakpoint
          previewLines = lines.slice(0, j);
          foundGoodBreakpoint = true;
          break;
        }
      }
      
      if (foundGoodBreakpoint) {
        break;
      } else {
        // No good breakpoint found, cut at current position
        previewLines = lines.slice(0, i);
        break;
      }
    }
    
    previewLines.push(line);
    currentLength += lineLength;
  }

  // Ensure we have some content in preview
  if (previewLines.length === 0) {
    previewLines = lines.slice(0, Math.max(1, Math.floor(lines.length * 0.3)));
  }

  const previewContent = previewLines.join('\n');

  return {
    previewContent,
    fullContent: content,
    hasMore: previewContent.length < content.length
  };
}

/**
 * Determine if a category should show paywall for unauthenticated users
 * @param category - Post category
 * @returns boolean indicating if paywall should be shown
 */
export function shouldShowPaywall(category: string): boolean {
  const paywallCategories = ['system-design'];
  return paywallCategories.includes(category);
}

/**
 * Calculate approximate reading time for remaining content
 * @param fullContent - Complete content
 * @param previewContent - Preview content  
 * @param wordsPerMinute - Reading speed (default: 200 WPM)
 * @returns Remaining reading time in minutes
 */
export function calculateRemainingReadTime(
  fullContent: string, 
  previewContent: string,
  wordsPerMinute: number = 200
): number {
  const remainingContent = fullContent.slice(previewContent.length);
  const wordCount = remainingContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract a compelling preview excerpt from content
 * @param content - Markdown content
 * @param maxLength - Maximum length of excerpt
 * @returns Clean excerpt without markdown syntax
 */
export function extractPreviewExcerpt(content: string, maxLength: number = 300): string {
  // Remove markdown syntax for cleaner excerpt
  let cleaned = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/^[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/<[^>]+>/g, '') // Remove HTML/JSX tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Find last complete sentence within limit
  const truncated = cleaned.slice(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.7) {
    return truncated.slice(0, lastSentence + 1);
  }
  
  // Fallback to word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}

/**
 * Get paywall configuration for different content types
 */
export const paywallConfig = {
  'system-design': {
    previewLength: 2500, // Show more for system design (complex content)
    title: 'System Design Premium',
    description: 'Complete system design guides with interactive diagrams',
    benefits: [
      'Full architecture breakdowns',
      'Interactive Excalidraw diagrams', 
      'Real interview insights',
      'Implementation details',
      'Scalability considerations'
    ]
  },
  'lld': {
    previewLength: 2000,
    title: 'Design Patterns Premium', 
    description: 'Comprehensive low-level design solutions',
    benefits: [
      'Complete class diagrams',
      'Code implementations',
      'Design pattern analysis',
      'SOLID principles application'
    ]
  },
  'default': {
    previewLength: 1800,
    title: 'Premium Content',
    description: 'Full access to premium content',
    benefits: [
      'Complete technical guides',
      'Detailed explanations',
      'Code examples',
      'Best practices'
    ]
  }
} as const;