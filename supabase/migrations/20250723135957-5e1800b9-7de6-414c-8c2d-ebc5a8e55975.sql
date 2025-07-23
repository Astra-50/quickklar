-- DISABLE the trigger that's causing INSERT failures
-- The trigger tries to use 'net' extension which doesn't exist
DROP TRIGGER IF EXISTS notify_new_lead_trigger ON public.leads;

-- We can re-enable this later once we fix the net extension issue
-- For now, leads will be inserted successfully without email notifications