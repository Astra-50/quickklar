
-- Create a function that will call our Edge Function when a new lead is inserted
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  request_id int;
BEGIN
  -- Call the Edge Function to send email notification
  SELECT
    net.http_post(
      url := 'https://lqurkuuxeriokczigspg.supabase.co/functions/v1/send-lead-notification',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('request.jwt.claims', true)::json->>'sub' || '"}'::jsonb,
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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger that fires after a new lead is inserted
CREATE OR REPLACE TRIGGER trigger_notify_new_lead
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
