import { fetchNotionData } from './notionContentFetcher'
import { getPageContent } from './notion'
import { performanceMeasure } from '@/utils/performance'
import type { BaseItem, PortfolioItem, PostItem } from '@/types'
import { env } from '@/config/env'

// Build-time cache to avoid redundant Notion API calls during static generation
const buildCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes — covers a full build

function getCached<T>(key: string): T | null {
  const entry = buildCache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T
  }
  return null
}

function setCache(key: string, data: any) {
  buildCache.set(key, { data, timestamp: Date.now() })
}

// Track in-flight promises to deduplicate concurrent requests
const inFlight = new Map<string, Promise<any>>()

/**
 * Content fetcher for Notion-backed content.
 * All data is fetched directly from Notion with build-time caching.
 */
export class HybridContentFetcher {

  static async getAllPosts(): Promise<{ listItems: BaseItem[]; pageContent: any[]; imageUrls: string[] }> {
    const cacheKey = 'allPosts'
    const cached = getCached<{ listItems: BaseItem[]; pageContent: any[]; imageUrls: string[] }>(cacheKey)
    if (cached) return cached

    // Deduplicate concurrent calls
    if (inFlight.has(cacheKey)) return inFlight.get(cacheKey)

    const timer = performanceMeasure.start('getAllPosts')
    const promise = fetchNotionData({
      databaseId: env.NOTION_POSTS_DB_ID,
      entryType: 'posts',
    }).then(data => {
      setCache(cacheKey, data)
      inFlight.delete(cacheKey)
      timer.end()
      return data
    }).catch(error => {
      inFlight.delete(cacheKey)
      timer.end()
      console.error('Error fetching posts from Notion:', error)
      throw error
    })

    inFlight.set(cacheKey, promise)
    return promise
  }

  static async getPostBySlug(slug: string): Promise<(PostItem & { content: any[] }) | null> {
    const timer = performanceMeasure.start('getPostBySlug')
    try {
      const { listItems } = await this.getAllPosts()
      const postItems = listItems as PostItem[]
      const postItem = postItems.find((item) => item.slug === slug)

      if (!postItem) {
        timer.end()
        return null
      }

      const pageContent = await getPageContent(postItem.id)

      timer.end()
      return {
        ...postItem,
        content: pageContent,
      }
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      timer.end()
      return null
    }
  }

  static async getAllProjects(): Promise<{ listItems: BaseItem[]; pageContent: any[]; imageUrls: string[] }> {
    const cacheKey = 'allProjects'
    const cached = getCached<{ listItems: BaseItem[]; pageContent: any[]; imageUrls: string[] }>(cacheKey)
    if (cached) return cached

    if (inFlight.has(cacheKey)) return inFlight.get(cacheKey)

    const timer = performanceMeasure.start('getAllProjects')
    const promise = fetchNotionData({
      databaseId: env.NOTION_PROJECTS_DB_ID,
      entryType: 'projects',
    }).then(data => {
      setCache(cacheKey, data)
      inFlight.delete(cacheKey)
      timer.end()
      return data
    }).catch(error => {
      inFlight.delete(cacheKey)
      timer.end()
      console.error('Error fetching projects from Notion:', error)
      throw error
    })

    inFlight.set(cacheKey, promise)
    return promise
  }

  static async getPortfolioItems(): Promise<{ listItems: PortfolioItem[]; pageContent: any[]; imageUrls: string[] }> {
    const cacheKey = 'allPortfolio'
    const cached = getCached<{ listItems: PortfolioItem[]; pageContent: any[]; imageUrls: string[] }>(cacheKey)
    if (cached) return cached

    if (inFlight.has(cacheKey)) return inFlight.get(cacheKey)

    const timer = performanceMeasure.start('getPortfolioItems')
    const promise = fetchNotionData({
      databaseId: env.NOTION_PORTFOLIO_DB_ID,
      entryType: 'portfolio',
    }).then(data => {
      setCache(cacheKey, data)
      inFlight.delete(cacheKey)
      timer.end()
      return data as { listItems: PortfolioItem[]; pageContent: any[]; imageUrls: string[] }
    }).catch(error => {
      inFlight.delete(cacheKey)
      timer.end()
      console.error('Error fetching portfolio from Notion:', error)
      throw error
    })

    inFlight.set(cacheKey, promise)
    return promise
  }

  static async getPortfolioItemBySlug(slug: string): Promise<(PortfolioItem & { content: any[] }) | null> {
    const timer = performanceMeasure.start('getPortfolioItemBySlug')
    try {
      // Get all portfolio items first
  const { listItems: portfolioItems } = await this.getPortfolioItems()
      
      // Find the item with matching slug
  const portfolioItem = portfolioItems.find((item: PortfolioItem) => item.slug === slug)
      
      if (!portfolioItem) {
        timer.end()
        return null
      }

      // Get the full page content using the item's id
      const pageContent = await getPageContent(portfolioItem.id)
      
      timer.end()
      return {
        ...portfolioItem,
        content: pageContent
      }
    } catch (error) {
      console.error('Error fetching portfolio item by slug:', error)
      timer.end()
      return null
    }
  }

  // Direct pass-through methods for other content types
  static async getAllAbout() {
    return await fetchNotionData({
      databaseId: env.NOTION_ABOUT_DB_ID,
      entryType: "about",
    })
  }

  static async getAllReadinglist() {
    return await fetchNotionData({
      databaseId: env.NOTION_READINGLIST_DB_ID,
      entryType: "reading-list",
    })
  }
}
