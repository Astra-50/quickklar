
-- Remove the problematic trigger that uses the non-existent 'net' schema
DROP TRIGGER IF EXISTS trigger_notify_new_lead ON public.leads;
DROP FUNCTION IF EXISTS notify_new_lead();
