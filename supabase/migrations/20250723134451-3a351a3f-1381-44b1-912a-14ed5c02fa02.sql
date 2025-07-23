
-- Fix the trigger function to work without JWT authentication
-- Use service role authentication instead of user JWT
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  request_id int;
  service_role_key text;
BEGIN
  -- Get the service role key from the database settings
  -- Note: In production, this should be set as a database secret
  service_role_key := current_setting('app.supabase_service_role_key', true);
  
  -- If no service role key is set, use a simpler approach without auth
  IF service_role_key IS NULL OR service_role_key = '' THEN
    -- Call the Edge Function without authentication (function must be public)
    SELECT
      net.http_post(
        url := 'https://lqurkuuxeriokczigspg.supabase.co/functions/v1/send-lead-notification',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object(
          'name', NEW.name,
          'phone', NEW.phone,
          'location', NEW.location,
          'service', NEW.service,
          'message', NEW.message,
          'source', NEW.source,
          'created_at', NEW.created_at
        )::text
      ) INTO request_id;
  ELSE
    -- Call the Edge Function with service role authentication
    SELECT
      net.http_post(
        url := 'https://lqurkuuxeriokczigspg.supabase.co/functions/v1/send-lead-notification',
        headers := ('{"Content-Type": "application/json", "Authorization": "Bearer ' || service_role_key || '"}')::jsonb,
        body := json_build_object(
          'name', NEW.name,
          'phone', NEW.phone,
          'location', NEW.location,
          'service', NEW.service,
          'message', NEW.message,
          'source', NEW.source,
          'created_at', NEW.created_at
        )::text
      ) INTO request_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS trigger_notify_new_lead ON public.leads;
CREATE TRIGGER trigger_notify_new_lead
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
