import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

// Supabase configuration with graceful handling of missing credentials
const supabaseUrl = env.SUPABASE_URL
const supabaseKey = env.SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Check if Supabase is available
export const isSupabaseAvailable = () => !!supabase

// Database table interfaces
export interface CachedContent {
  id: string
  table_name: string
  notion_id: string
  title: string
  content: any
  last_updated: string
  created_at: string
}

export interface SyncLog {
  id: string
  table_name: string
  sync_status: 'success' | 'error' | 'in_progress'
  records_synced: number
  error_message?: string
  sync_started_at: string
  sync_completed_at?: string
}

// Supabase content fetcher functions
export class SupabaseContentFetcher {
  static async getAllPosts(): Promise<any[]> {
    if (!supabase) {
      console.log('⚠️  Supabase not configured, skipping cache')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('cached_content')
        .select('*')
        .eq('table_name', 'posts')
        .order('last_updated', { ascending: false })

      if (error) {
        console.error('Supabase error fetching posts:', error)
        return []
      }

      return data?.map(item => ({
        ...item.content,
        id: item.notion_id,
        _cached_at: item.last_updated
      })) || []
    } catch (error) {
      console.error('Error fetching posts from Supabase:', error)
      return []
    }
  }

  static async getAllProjects(): Promise<any[]> {
    if (!supabase) {
      console.log('⚠️  Supabase not configured, skipping cache')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('cached_content')
        .select('*')
        .eq('table_name', 'projects')
        .order('last_updated', { ascending: false })

      if (error) {
        console.error('Supabase error fetching projects:', error)
        return []
      }

      return data?.map(item => ({
        ...item.content,
        id: item.notion_id,
        _cached_at: item.last_updated
      })) || []
    } catch (error) {
      console.error('Error fetching projects from Supabase:', error)
      return []
    }
  }

  static async getPortfolioItems(): Promise<any[]> {
    if (!supabase) {
      console.log('⚠️  Supabase not configured, skipping cache')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('cached_content')
        .select('*')
        .eq('table_name', 'portfolio')
        .order('last_updated', { ascending: false })

      if (error) {
        console.error('Supabase error fetching portfolio:', error)
        return []
      }

      return data?.map(item => ({
        ...item.content,
        id: item.notion_id,
        _cached_at: item.last_updated
      })) || []
    } catch (error) {
      console.error('Error fetching portfolio from Supabase:', error)
      return []
    }
  }

  static async getAllBusinessCards(): Promise<any[]> {
    if (!supabase) {
      console.log('⚠️  Supabase not configured, skipping cache')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('cached_content')
        .select('*')
        .eq('table_name', 'business_cards')
        .order('last_updated', { ascending: false })

      if (error) {
        console.error('Supabase error fetching business cards:', error)
        return []
      }

      return data?.map(item => ({
        ...item.content,
        id: item.notion_id,
        _cached_at: item.last_updated
      })) || []
    } catch (error) {
      console.error('Error fetching business cards from Supabase:', error)
      return []
    }
  }

  static async getCachedContentAge(tableName: string): Promise<Date | null> {
    if (!supabase) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('cached_content')
        .select('last_updated')
        .eq('table_name', tableName)
        .order('last_updated', { ascending: false })
        .limit(1)

      if (error || !data || data.length === 0) {
        return null
      }

      return new Date(data[0].last_updated)
    } catch (error) {
      console.error('Error getting cached content age:', error)
      return null
    }
  }

  static async getLastSyncStatus(): Promise<SyncLog | null> {
    if (!supabase) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('sync_logs')
        .select('*')
        .order('sync_started_at', { ascending: false })
        .limit(1)

      if (error || !data || data.length === 0) {
        return null
      }

      return data[0]
    } catch (error) {
      console.error('Error getting last sync status:', error)
      return null
    }
  }
}
