-- Fix RLS policy for leads table to allow anonymous inserts
-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
DROP POLICY IF EXISTS "No public access to leads" ON public.leads;

-- Recreate INSERT policy to allow anyone to create leads
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Recreate SELECT policy to prevent public reading (admin only)
CREATE POLICY "No public access to leads" 
ON public.leads 
FOR SELECT 
USING (false);

-- Test that the table structure is correct and has proper defaults
-- Make sure email is nullable as intended
ALTER TABLE public.leads ALTER COLUMN email DROP NOT NULL;