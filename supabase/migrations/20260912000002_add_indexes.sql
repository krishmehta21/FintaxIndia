-- Add indexes for frequently queried columns

-- QA Items are filtered by status and category, and ordered by created_at
CREATE INDEX IF NOT EXISTS idx_qa_items_status_category_created_at
ON public.qa_items (status, category, created_at DESC);

-- Services are filtered by is_published and ordered by display_order
CREATE INDEX IF NOT EXISTS idx_services_is_published_display_order
ON public.services (is_published, display_order);

-- Testimonials are filtered by is_published and ordered by display_order
CREATE INDEX IF NOT EXISTS idx_testimonials_is_published_display_order
ON public.testimonials (is_published, display_order);
