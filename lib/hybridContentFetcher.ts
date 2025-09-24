import { fetchNotionData } from './notionContentFetcher'
import { getPageContent } from './notion'
import { performanceMeasure } from '@/utils/performance'
import { env } from '@/config/env'

/**
 * Hybrid content fetcher that tries Supabase first, falls back to Notion
 * This provides the best performance while maintaining reliability
 */
export class HybridContentFetcher {

  static async getAllPosts() {
    const timer = performanceMeasure.start('getAllPosts')
    try {
      const data = await fetchNotionData({
        databaseId: env.NOTION_POSTS_DB_ID,
        entryType: 'posts',
      })
      return data
    } catch (error) {
      console.error('Error fetching posts from Notion:', error)
      throw error
    } finally {
      timer.end()
    }
  }

  static async getAllProjects() {
    const timer = performanceMeasure.start('getAllProjects')
    try {
      const data = await fetchNotionData({
        databaseId: env.NOTION_PROJECTS_DB_ID,
        entryType: 'projects',
      })
      return data
    } catch (error) {
      console.error('Error fetching projects from Notion:', error)
      throw error
    } finally {
      timer.end()
    }
  }

  static async getPortfolioItems() {
    const timer = performanceMeasure.start('getPortfolioItems')
    try {
      const data = await fetchNotionData({
        databaseId: env.NOTION_PORTFOLIO_DB_ID,
        entryType: 'portfolio',
      })
      return data
    } catch (error) {
      console.error('Error fetching portfolio from Notion:', error)
      throw error
    } finally {
      timer.end()
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
