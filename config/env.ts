// Environment configuration with validation
import { validateEnvironmentVariables } from '@/utils/validation';

// Define all required environment variables
const REQUIRED_ENV_VARS = [
  'NOTION_API_KEY',
  'NOTION_ABOUT_DB_ID',
  'NOTION_POSTS_DB_ID',
  'NOTION_PORTFOLIO_DB_ID',
  'NOTION_PROJECTS_DB_ID',
];

// Optional env vars that are nice to have
const OPTIONAL_ENV_VARS = [
  'TWITTER_API_KEY',
  'TWITTER_API_SECRET_KEY',
  'TWITTER_BEARER_TOKEN',
];

// Validate environment on startup
try {
  validateEnvironmentVariables(REQUIRED_ENV_VARS);
  console.log('✅ All required environment variables are set');
} catch (error) {
  console.error('❌ Environment validation failed:', error);
  if (process.env.NODE_ENV === 'production') {
    throw error; // Fail fast in production
  }
}

// Export typed environment configuration
export const env = {
  // Notion Configuration
  NOTION_API_KEY: process.env.NOTION_API_KEY!,
  NOTION_ABOUT_DB_ID: process.env.NOTION_ABOUT_DB_ID!,
  NOTION_ABOUT_PAGE_ID: process.env.NOTION_ABOUT_PAGE_ID!,
  NOTION_ABOUT_DESCRIPTION_ID: process.env.NOTION_ABOUT_DESCRIPTION_ID!,
  NOTION_ART_DB_ID: process.env.NOTION_ART_DB_ID!,
  NOTION_ART_PAGE_ID: process.env.NOTION_ART_PAGE_ID!,
  NOTION_BOARDGAMES_DB_ID: process.env.NOTION_BOARDGAMES_DB_ID!,
  NOTION_BOARDGAMES_PAGE_ID: process.env.NOTION_BOARDGAMES_PAGE_ID!,
  NOTION_BOOKMARKS_DB_ID: process.env.NOTION_BOOKMARKS_DB_ID!,
  NOTION_BOOKMARKS_PAGE_ID: process.env.NOTION_BOOKMARKS_PAGE_ID!,
  NOTION_CASE_STUDIES_DB: process.env.NOTION_CASE_STUDIES_DB!,
  NOTION_FOLLOWING_DB_ID: process.env.NOTION_FOLLOWING_DB_ID!,
  NOTION_FOLLOWING_PAGE_ID: process.env.NOTION_FOLLOWING_PAGE_ID!,
  NOTION_LIBRARY_DB_ID: process.env.NOTION_LIBRARY_DB_ID!,
  NOTION_LIBRARY_PAGE_ID: process.env.NOTION_LIBRARY_PAGE_ID!,
  NOTION_LISTS_DB_ID: process.env.NOTION_LISTS_DB_ID!,
  NOTION_LISTS_PAGE_ID: process.env.NOTION_LISTS_PAGE_ID!,
  NOTION_MUSICALS_DB_ID: process.env.NOTION_MUSICALS_DB_ID!,
  NOTION_MUSICALS_PAGE_ID: process.env.NOTION_MUSICALS_PAGE_ID!,
  NOTION_PORTFOLIO_DB_ID: process.env.NOTION_PORTFOLIO_DB_ID!,
  NOTION_PORTFOLIO_PAGE_ID: process.env.NOTION_PORTFOLIO_PAGE_ID!,
  NOTION_POSTS_DB_ID: process.env.NOTION_POSTS_DB_ID!,
  NOTION_POSTS_PAGE_ID: process.env.NOTION_POSTS_PAGE_ID!,
  NOTION_PROJECTS_DB_ID: process.env.NOTION_PROJECTS_DB_ID!,
  NOTION_PROJECTS_PAGE_ID: process.env.NOTION_PROJECTS_PAGE_ID!,
  NOTION_READINGLIST_DB_ID: process.env.NOTION_READINGLIST_DB_ID!,
  NOTION_READINGLIST_PAGE_ID: process.env.NOTION_READINGLIST_PAGE_ID!,
  NOTION_RESOURCE_CATEGORIES_DB_ID: process.env.NOTION_RESOURCE_CATEGORIES_DB_ID!,
  NOTION_RESOURCES_DB_ID: process.env.NOTION_RESOURCES_DB_ID!,
  NOTION_RESOURCES_PAGE_ID: process.env.NOTION_RESOURCES_PAGE_ID!,
  NOTION_SHAKESPEARE_DB_ID: process.env.NOTION_SHAKESPEARE_DB_ID!,
  NOTION_SHAKESPEARE_PAGE_ID: process.env.NOTION_SHAKESPEARE_PAGE_ID!,
  NOTION_TRAVEL_DB_ID: process.env.NOTION_TRAVEL_DB_ID!,
  NOTION_TRAVEL_PAGE_ID: process.env.NOTION_TRAVEL_PAGE_ID!,
  
  // Twitter Configuration (optional)
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET_KEY: process.env.TWITTER_API_SECRET_KEY,
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
  
  // App Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export type Environment = typeof env;
