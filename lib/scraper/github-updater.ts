import { InterviewQuestion } from '@/data/interview-questions';

export class GitHubQuestionsUpdater {
  private readonly GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  private readonly REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'amankumarkeshu';
  private readonly REPO_NAME = process.env.GITHUB_REPO_NAME || 'cracktheloop';
  
  public async addQuestionsToFile(newQuestions: InterviewQuestion[]): Promise<{success: boolean, message: string}> {
    if (!this.GITHUB_TOKEN) {
      return { success: false, message: 'GitHub token not configured' };
    }

    try {
      // 1. Get current file content
      const fileResponse = await fetch(
        `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/data/interview-questions.ts`,
        {
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
      }
      
      const fileData = await fileResponse.json();
      const currentContent = atob(fileData.content.replace(/\s/g, ''));
      
      // 2. Parse and add new questions
      const updatedContent = this.insertQuestionsIntoFile(currentContent, newQuestions);
      
      // 3. Commit updated file
      const commitResponse = await fetch(
        `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/data/interview-questions.ts`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Add ${newQuestions.length} new interview questions via scraper`,
            content: btoa(updatedContent),
            sha: fileData.sha,
            branch: 'master'
          })
        }
      );
      
      if (!commitResponse.ok) {
        const error = await commitResponse.json();
        throw new Error(`Failed to commit: ${error.message}`);
      }
      
      return {
        success: true,
        message: `Successfully added ${newQuestions.length} questions to GitHub repository`
      };
      
    } catch (error) {
      console.error('GitHub update error:', error);
      return {
        success: false,
        message: `GitHub update failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
  
  private insertQuestionsIntoFile(currentContent: string, newQuestions: InterviewQuestion[]): string {
    // Find the closing bracket of the interviewQuestions array
    const arrayEndPattern = /];[\s\n]*$/m;
    const insertIndex = currentContent.search(arrayEndPattern);
    
    if (insertIndex === -1) {
      throw new Error('Could not find end of interviewQuestions array');
    }
    
    // Generate question strings
    const questionsCode = newQuestions.map(q => this.questionToCode(q)).join(',\n  ');
    
    // Insert new questions before the closing bracket
    const beforeClosing = currentContent.slice(0, insertIndex);
    const afterClosing = currentContent.slice(insertIndex);
    
    // Add comma if there are existing questions
    const needsComma = beforeClosing.trim().endsWith('}');
    const separator = needsComma ? ',\n\n  ' : '\n  ';
    
    return beforeClosing + separator + 
           `// ────────────────────────────────────────────────────────────────────\n` +
           `  // SCRAPED QUESTIONS - ${new Date().toISOString().split('T')[0]}\n` +
           `  // ────────────────────────────────────────────────────────────────────\n` +
           `  ${questionsCode}\n` + afterClosing;
  }
  
  private questionToCode(question: InterviewQuestion): string {
    const tags = question.tags.map(t => `"${t}"`).join(', ');
    const askedFor = question.askedFor ? `, askedFor: "${question.askedFor}"` : '';
    const frequency = question.frequency ? `, frequency: "${question.frequency}"` : '';
    const note = question.note ? `, note: "${question.note.replace(/"/g, '\\"')}"` : '';
    
    return `{ id: "${question.id}", company: "${question.company}", type: "${question.type}", difficulty: "${question.difficulty}", question: "${question.question.replace(/"/g, '\\"')}", tags: [${tags}]${askedFor}${frequency}${note} }`;
  }
}