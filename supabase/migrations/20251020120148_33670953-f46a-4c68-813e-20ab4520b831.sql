-- Simplification Migration: Remove Blog System and Admin Dashboard
-- This keeps only the core leads table for contact form submissions

-- Drop blog-related tables
DROP TABLE IF EXISTS public.blog_post_tags CASCADE;
DROP TABLE IF EXISTS public.blog_tags CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.blog_categories CASCADE;

-- Drop admin/auth tables
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop the app_role enum type
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Drop the has_role security definer function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;

-- Simplify leads table RLS policies
-- Remove all existing policies
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
DROP POLICY IF EXISTS "No public access to leads" ON public.leads;
DROP POLICY IF EXISTS "Validated contact form submissions only" ON public.leads;

-- Create simple public INSERT policy for contact form
CREATE POLICY "Anyone can submit contact form"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Basic validation only
  name IS NOT NULL AND TRIM(name) != '' AND length(name) <= 100
  AND phone IS NOT NULL AND TRIM(phone) != '' AND length(phone) <= 50
  AND location IS NOT NULL AND TRIM(location) != '' AND length(location) <= 200
  AND service IS NOT NULL AND TRIM(service) != '' AND length(service) <= 100
  AND (message IS NULL OR length(message) <= 1000)
  AND (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- No SELECT policy = no public reading of leads (secure by default)