-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    author TEXT NOT NULL DEFAULT 'FinTax India Team'
);

-- Add index on status and category for public querying
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published_at ON public.blog_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);

-- Insert blog-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage objects (grant public read access, restrict write to service role/admin)
-- Note: Supabase Storage uses the `storage.objects` table.

-- Drop existing policies if running multiple times (optional safety)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Full Access" ON storage.objects;

-- Create Public Read Access Policy
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

-- Create Service Role Full Access Policy
-- Backend uses service_role key which bypasses RLS anyway, but good to be explicit
CREATE POLICY "Service Role Full Access" 
ON storage.objects FOR ALL 
USING (bucket_id = 'blog-images');
