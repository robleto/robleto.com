// Common interfaces for your application
export interface NotionPageContent {
  type: string;
  [key: string]: any;
}

export interface BaseItem {
  id: string;
  title?: string;
  name?: string; // Alternative to title for compatibility
  slug?: string;
  url?: string;
  description?: string;
  tags?: string[];
  isPinned?: boolean;
  sortOrder?: number;
}

export interface PostItem extends BaseItem {
  pubdate?: string;
  date?: string;
}

export interface ProjectItem extends BaseItem {
  image?: string;
  featured?: boolean;
}

export interface ArtItem extends BaseItem {
  animated?: boolean;
  image?: string;
  featured?: boolean;
  date?: string;
}

export interface LibraryItem extends BaseItem {
  topics?: string[];
  image?: string;
}

export interface TravelItem extends BaseItem {
  state?: string;
  cityState?: string;
  seen?: string;
}

export interface MusicalItem extends BaseItem {
  seen?: string;
}

export interface FollowingItem extends BaseItem {
  pubdate?: string;
}

export interface ReadingListItem extends BaseItem {
  tags?: string[];
}

export interface BookmarkItem extends BaseItem {
  pubdate?: string;
  tags?: string[];
}

// Component Props Interfaces
export interface PageHeaderProps {
  title: string;
  icon: string;
  linkUrl?: string;
  linkText?: string;
  pageContent: NotionPageContent[];
}

export interface GalleryProps<T = BaseItem> {
  items: T[];
  gridCols?: string;
  smGridCols?: string;
  mdGridCols?: string;
  lgGridCols?: string;
  pageKey?: string;
  titleKey?: keyof T;
  linkKey?: keyof T;
  slugKey?: keyof T;
  pubDateKey?: keyof T;
  descriptionKey?: keyof T;
  tagsKey?: keyof T;
  urlKey?: keyof T;
  cityStateKey?: keyof T;
  animatedKey?: keyof T;
  minHeight?: string;
  groupByKey?: string | null;
  sortItem?: (items: T[]) => T[];
  filterItem?: (items: T[]) => T[];
}

export interface ListsProps<T = BaseItem> {
  items: T[];
  pageKey?: string;
  titleKey?: keyof T;
  linkKey?: keyof T;
  slugKey?: keyof T;
  pubDateKey?: keyof T;
  descriptionKey?: keyof T;
  tagsKey?: keyof T;
  urlKey?: keyof T;
}

// API Response Types
export interface NotionFetchResponse<T = BaseItem> {
  pageContent: NotionPageContent[];
  listItems: T[];
  imageUrls?: string[];
}

// Utility function types
export type SortFunction<T> = (items: T[]) => T[];
export type FilterFunction<T> = (items: T[]) => T[];

// Environment variables interface
export interface EnvironmentConfig {
  NOTION_API_KEY: string;
  NOTION_ABOUT_DB_ID: string;
  NOTION_ABOUT_PAGE_ID: string;
  NOTION_POSTS_DB_ID: string;
  NOTION_POSTS_PAGE_ID: string;
  // ... add all your env vars here for better type safety
}
