-- Supabase database schema for caching Notion data
-- This dramatically improves performance by avoiding direct Notion API calls

-- Table to store cached content from Notion
CREATE TABLE cached_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,
  notion_id text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  last_updated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  
  -- Create unique constraint to prevent duplicates
  UNIQUE(table_name, notion_id)
);

-- Table to track sync operations and status
CREATE TABLE sync_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,
  sync_status text NOT NULL CHECK (sync_status IN ('success', 'error', 'in_progress')),
  records_synced integer DEFAULT 0,
  error_message text,
  sync_started_at timestamp with time zone DEFAULT now(),
  sync_completed_at timestamp with time zone,
  
  -- Add metadata about the sync
  sync_metadata jsonb DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_cached_content_table_name ON cached_content(table_name);
CREATE INDEX idx_cached_content_last_updated ON cached_content(last_updated);
CREATE INDEX idx_cached_content_notion_id ON cached_content(notion_id);
CREATE INDEX idx_sync_logs_table_name ON sync_logs(table_name);
CREATE INDEX idx_sync_logs_status ON sync_logs(sync_status);
CREATE INDEX idx_sync_logs_started_at ON sync_logs(sync_started_at);

-- Enable Row Level Security (RLS) for security
ALTER TABLE cached_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for read access (adjust based on your authentication needs)
-- For now, allowing public read access since this is cached public content
CREATE POLICY "Allow public read access to cached_content" ON cached_content
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to sync_logs" ON sync_logs
  FOR SELECT USING (true);

-- You might want to restrict write access to specific roles/users
-- CREATE POLICY "Allow sync service to write" ON cached_content
--   FOR ALL USING (auth.role() = 'sync_service');

-- Function to automatically update the last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update last_updated on cached_content updates
CREATE TRIGGER update_cached_content_last_updated
  BEFORE UPDATE ON cached_content
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated_column();

-- Function to clean up old cache entries (optional)
CREATE OR REPLACE FUNCTION cleanup_old_cache(days_old integer DEFAULT 30)
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM cached_content 
  WHERE last_updated < now() - interval '1 day' * days_old;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ language 'plpgsql';

-- Comments for documentation
COMMENT ON TABLE cached_content IS 'Stores cached content from Notion databases for improved performance';
COMMENT ON TABLE sync_logs IS 'Tracks synchronization operations between Notion and Supabase';
COMMENT ON COLUMN cached_content.table_name IS 'Identifies which Notion database this content came from (posts, projects, portfolio, etc.)';
COMMENT ON COLUMN cached_content.notion_id IS 'The original Notion page/database entry ID';
COMMENT ON COLUMN cached_content.content IS 'The full content object as retrieved from Notion API';
COMMENT ON FUNCTION cleanup_old_cache IS 'Removes cache entries older than specified days to prevent unbounded growth';
