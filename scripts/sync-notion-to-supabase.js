#!/usr/bin/env node

/**
 * Notion to Supabase Sync Script
 * 
 * This script syncs data from Notion databases to Supabase for improved performance.
 * It should be run periodically (e.g., via cron job or GitHub Actions) to keep the cache fresh.
 * 
 * Usage:
 *   npm run sync:notion
 *   node scripts/sync-notion-to-supabase.js [--table=posts] [--full]
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Import our existing Notion fetcher
const { fetchNotionData } = require('../lib/notionContentFetcher');

// Environment configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Configuration for which tables to sync
const SYNC_CONFIG = {
  posts: {
    databaseId: process.env.NOTION_POSTS_DB_ID,
    entryType: 'posts'
  },
  projects: {
    databaseId: process.env.NOTION_PROJECTS_DB_ID,
    entryType: 'projects'
  },
  portfolio: {
    databaseId: process.env.NOTION_PORTFOLIO_DB_ID,
    entryType: 'portfolio'
  },
  // Add more as needed
};

class NotionSupabaseSync {
  async logSync(tableName, status, recordsCount = 0, errorMessage = null) {
    try {
      const logEntry = {
        table_name: tableName,
        sync_status: status,
        records_synced: recordsCount,
        error_message: errorMessage,
        sync_completed_at: status !== 'in_progress' ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('sync_logs')
        .insert([logEntry]);

      if (error) {
        console.error('Failed to log sync status:', error);
      }
    } catch (error) {
      console.error('Error logging sync:', error);
    }
  }

  async syncTable(tableName, config) {
    console.log(`\n🔄 Starting sync for ${tableName}...`);
    
    // Log sync start
    await this.logSync(tableName, 'in_progress');

    try {
      // Fetch data from Notion
      console.log(`📋 Fetching ${tableName} from Notion...`);
      const notionData = await fetchNotionData({
        databaseId: config.databaseId,
        entryType: config.entryType
      });

      if (!notionData || !notionData.listItems) {
        throw new Error('No data received from Notion');
      }

      console.log(`📦 Retrieved ${notionData.listItems.length} items from Notion`);

      // Clear existing cache for this table
      console.log(`🗑️  Clearing existing cache for ${tableName}...`);
      const { error: deleteError } = await supabase
        .from('cached_content')
        .delete()
        .eq('table_name', tableName);

      if (deleteError) {
        throw new Error(`Failed to clear cache: ${deleteError.message}`);
      }

      // Insert new data
      console.log(`💾 Inserting ${notionData.listItems.length} items into cache...`);
      const cacheEntries = notionData.listItems.map(item => ({
        table_name: tableName,
        notion_id: item.id,
        title: item.title || item.name || 'Untitled',
        content: item
      }));

      const { error: insertError } = await supabase
        .from('cached_content')
        .insert(cacheEntries);

      if (insertError) {
        throw new Error(`Failed to insert cache: ${insertError.message}`);
      }

      console.log(`✅ Successfully synced ${notionData.listItems.length} ${tableName} items`);
      await this.logSync(tableName, 'success', notionData.listItems.length);

      return notionData.listItems.length;

    } catch (error) {
      console.error(`❌ Failed to sync ${tableName}:`, error.message);
      await this.logSync(tableName, 'error', 0, error.message);
      throw error;
    }
  }

  async syncAll(tables = null) {
    const startTime = Date.now();
    console.log('🚀 Starting Notion → Supabase sync...');

    const tablesToSync = tables || Object.keys(SYNC_CONFIG);
    let totalSynced = 0;
    let errors = [];

    for (const tableName of tablesToSync) {
      const config = SYNC_CONFIG[tableName];
      
      if (!config) {
        console.error(`⚠️  Unknown table: ${tableName}`);
        continue;
      }

      try {
        const count = await this.syncTable(tableName, config);
        totalSynced += count;
      } catch (error) {
        errors.push({ tableName, error: error.message });
      }
    }

    const duration = Date.now() - startTime;
    console.log(`\n📊 Sync Summary:`);
    console.log(`   Total items synced: ${totalSynced}`);
    console.log(`   Tables processed: ${tablesToSync.length}`);
    console.log(`   Errors: ${errors.length}`);
    console.log(`   Duration: ${duration}ms`);

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(({ tableName, error }) => {
        console.log(`   ${tableName}: ${error}`);
      });
    }

    return { totalSynced, errors, duration };
  }

  async getStatus() {
    try {
      const { data: logs, error } = await supabase
        .from('sync_logs')
        .select('*')
        .order('sync_started_at', { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      console.log('\n📊 Recent Sync Status:');
      logs.forEach(log => {
        const status = log.sync_status === 'success' ? '✅' : 
                      log.sync_status === 'error' ? '❌' : '🔄';
        console.log(`   ${status} ${log.table_name}: ${log.records_synced} items (${log.sync_started_at})`);
        if (log.error_message) {
          console.log(`      Error: ${log.error_message}`);
        }
      });

      return logs;
    } catch (error) {
      console.error('Failed to get sync status:', error);
      return [];
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const sync = new NotionSupabaseSync();

  // Parse command line arguments
  let specificTable = null;
  let showStatus = false;

  for (const arg of args) {
    if (arg.startsWith('--table=')) {
      specificTable = arg.split('=')[1];
    } else if (arg === '--status') {
      showStatus = true;
    }
  }

  try {
    if (showStatus) {
      await sync.getStatus();
      return;
    }

    const tables = specificTable ? [specificTable] : null;
    const result = await sync.syncAll(tables);

    // Exit with error code if there were failures
    if (result.errors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { NotionSupabaseSync };
