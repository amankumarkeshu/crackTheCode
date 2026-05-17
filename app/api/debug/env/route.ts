import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    environment: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN ? '✅ Set (length: ' + process.env.GITHUB_TOKEN.length + ')' : '❌ Not set',
      GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER || '❌ Not set',
      GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME || '❌ Not set',
      NETLIFY: process.env.NETLIFY ? '✅ Running on Netlify' : '❌ Not Netlify',
      NODE_ENV: process.env.NODE_ENV
    }
  });
}