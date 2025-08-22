-- Fix security issue: Add proper validation for leads INSERT operations
-- Remove the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a more secure INSERT policy with validation
CREATE POLICY "Validated contact form submissions only" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  -- Ensure required fields are present and not empty
  name IS NOT NULL AND trim(name) != '' AND
  phone IS NOT NULL AND trim(phone) != '' AND
  location IS NOT NULL AND trim(location) != '' AND
  service IS NOT NULL AND trim(service) != '' AND
  -- Validate phone format (basic validation)
  phone ~ '^[\+]?[0-9\s\-\(\)]+$' AND
  -- Limit input lengths to prevent abuse
  length(name) <= 100 AND
  length(phone) <= 50 AND
  length(location) <= 200 AND
  length(service) <= 100 AND
  (message IS NULL OR length(message) <= 1000) AND
  (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') AND
  -- Ensure status and source are from expected values
  (status IS NULL OR status IN ('new', 'contacted', 'converted', 'closed')) AND
  (source IS NULL OR source IN ('contact_form', 'whatsapp', 'phone', 'website'))
);

-- Add a policy to allow admins to manage leads (for the admin dashboard)
CREATE POLICY "Admins can manage leads" 
ON public.leads 
FOR ALL
USING (false) -- This will be updated when authentication is implemented
WITH CHECK (false); -- This will be updated when authentication is implemented