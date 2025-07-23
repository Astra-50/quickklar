-- DROP everything with CASCADE to remove all dependencies
DROP FUNCTION IF EXISTS public.notify_new_lead() CASCADE;

-- Now test that we can insert leads
INSERT INTO public.leads (name, phone, location, service, message, source) 
VALUES ('SUCCESS TEST', '+49123456789', 'Test City', 'entrümpelung', 'Database now works!', 'contact_form');