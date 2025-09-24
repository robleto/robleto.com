import { fetchNotionData } from './notionContentFetcher'
import { getPageContent } from './notion'
import { SupabaseContentFetcher } from './supabase'
import { performanceMeasure } from '@/utils/performance'
import { env } from '@/config/env'

/**
 * Hybrid content fetcher that tries Supabase first, falls back to Notion
 * This provides the best performance while maintaining reliability
 */
export class HybridContentFetcher {
  private static readonly CACHE_TIMEOUT_HOURS = 1 // Consider cache stale after 1 hour
  
  private static isCacheStale(cachedAt: Date): boolean {
    const now = new Date()
    const diffHours = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60)
    return diffHours > this.CACHE_TIMEOUT_HOURS
  }

  static async getAllPosts() {
    const timer = performanceMeasure.start('getAllPosts')
    try {
      // Try Supabase first
      const cachedAge = await SupabaseContentFetcher.getCachedContentAge('posts')
      
      if (cachedAge && !this.isCacheStale(cachedAge)) {
        console.log('📋 Using cached posts from Supabase')
        const data = await SupabaseContentFetcher.getAllPosts()
        if (data.length > 0) {
          timer.end()
          return { listItems: data, pageContent: null }
        }
      }

      // Fallback to Notion if cache is stale or empty
      console.log('🔄 Fetching fresh posts from Notion')
      const data = await fetchNotionData({
        databaseId: env.NOTION_POSTS_DB_ID,
        entryType: "posts",
      })
      timer.end()
      return data
    } catch (error) {
      console.error('Error in hybrid posts fetch:', error)
      timer.end()
      // Final fallback to Notion
      return await fetchNotionData({
        databaseId: env.NOTION_POSTS_DB_ID,
        entryType: "posts",
      })
    }
  }

  static async getAllProjects() {
    const timer = performanceMeasure.start('getAllProjects')
    try {
      // Try Supabase first
      const cachedAge = await SupabaseContentFetcher.getCachedContentAge('projects')
      
      if (cachedAge && !this.isCacheStale(cachedAge)) {
        console.log('📋 Using cached projects from Supabase')
        const data = await SupabaseContentFetcher.getAllProjects()
        if (data.length > 0) {
          timer.end()
          return { listItems: data, pageContent: null }
        }
      }

      // Fallback to Notion if cache is stale or empty
      console.log('🔄 Fetching fresh projects from Notion')
      const data = await fetchNotionData({
        databaseId: env.NOTION_PROJECTS_DB_ID,
        entryType: "projects",
      })
      timer.end()
      return data
    } catch (error) {
      console.error('Error in hybrid projects fetch:', error)
      timer.end()
      // Final fallback to Notion
      return await fetchNotionData({
        databaseId: env.NOTION_PROJECTS_DB_ID,
        entryType: "projects",
      })
    }
  }

  static async getPortfolioItems() {
    const timer = performanceMeasure.start('getPortfolioItems')
    try {
      // Try Supabase first
      const cachedAge = await SupabaseContentFetcher.getCachedContentAge('portfolio')
      
      if (cachedAge && !this.isCacheStale(cachedAge)) {
        console.log('📋 Using cached portfolio from Supabase')
        const data = await SupabaseContentFetcher.getPortfolioItems()
        if (data.length > 0) {
          timer.end()
          return { listItems: data, pageContent: null }
        }
      }

      // Fallback to Notion if cache is stale or empty
      console.log('🔄 Fetching fresh portfolio from Notion')
      const data = await fetchNotionData({
        databaseId: env.NOTION_PORTFOLIO_DB_ID,
        entryType: "portfolio",
      })
      timer.end()
      return data
    } catch (error) {
      console.error('Error in hybrid portfolio fetch:', error)
      timer.end()
      // Final fallback to Notion
      return await fetchNotionData({
        databaseId: env.NOTION_PORTFOLIO_DB_ID,
        entryType: "portfolio",
      })
    }
  }

  static async getPortfolioItemBySlug(slug: string) {
    const timer = performanceMeasure.start('getPortfolioItemBySlug')
    try {
      // Get all portfolio items first
      const { listItems: portfolioItems } = await this.getPortfolioItems()
      
      // Find the item with matching slug
      const portfolioItem = portfolioItems.find((item: any) => item.slug === slug)
      
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
