-- COMPLETELY REMOVE the notification system that's breaking INSERTs
-- Drop any remaining triggers
DROP TRIGGER IF EXISTS notify_new_lead_trigger ON public.leads;
DROP TRIGGER IF EXISTS new_lead_notification ON public.leads;

-- Drop the function that's trying to use the non-existent 'net' schema
DROP FUNCTION IF EXISTS public.notify_new_lead();

-- Test that we can now insert leads without errors
INSERT INTO public.leads (name, phone, location, service, message, source) 
VALUES ('Test Insert', '+49123456789', 'Test City', 'entrümpelung', 'Test message', 'contact_form');