-- SQL Migration for FinTax India Supabase Project
-- File: supabase/migrations/20260912000000_init_schema.sql

-- 1. Create Enum Types
CREATE TYPE qa_status AS ENUM ('pending', 'published', 'rejected');

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'briefcase',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Q&A Items Table
CREATE TABLE IF NOT EXISTS public.qa_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT,
    slug VARCHAR(255) UNIQUE,
    status qa_status NOT NULL DEFAULT 'pending',
    submitted_by_email VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    published_at TIMESTAMPTZ
);

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    attribution_label VARCHAR(255) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_interest VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Trigger to update updated_at on services
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- 7. Row Level Security (RLS) Setup
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qa_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------------------------------
-- RLS POLICIES FOR SERVICES
--------------------------------------------------------------------------------
-- Public/anon: SELECT published services only
CREATE POLICY "Public services read access"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Authenticated (admin): Full CRUD
CREATE POLICY "Admin full access on services"
ON public.services
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

--------------------------------------------------------------------------------
-- RLS POLICIES FOR QA ITEMS
--------------------------------------------------------------------------------
-- Public/anon: SELECT published Q&A items only
CREATE POLICY "Public qa_items read access"
ON public.qa_items
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Public/anon: INSERT only (forces status to 'pending')
CREATE POLICY "Public qa_items submit question access"
ON public.qa_items
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');

-- Authenticated (admin): Full CRUD
CREATE POLICY "Admin full access on qa_items"
ON public.qa_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

--------------------------------------------------------------------------------
-- RLS POLICIES FOR TESTIMONIALS
--------------------------------------------------------------------------------
-- Public/anon: SELECT published testimonials only
CREATE POLICY "Public testimonials read access"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Authenticated (admin): Full CRUD
CREATE POLICY "Admin full access on testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

--------------------------------------------------------------------------------
-- RLS POLICIES FOR CONTACT SUBMISSIONS
--------------------------------------------------------------------------------
-- Public/anon: INSERT only
CREATE POLICY "Public contact_submissions submit access"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated (admin): SELECT and DELETE (Full CRUD)
CREATE POLICY "Admin full access on contact_submissions"
ON public.contact_submissions
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
