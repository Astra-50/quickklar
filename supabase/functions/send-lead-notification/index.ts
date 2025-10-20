
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Input validation schema
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().regex(/^[\+]?[0-9\s\-\(\)]+$/, "Invalid phone format").max(50, "Phone is too long"),
  location: z.string().trim().min(1, "Location is required").max(200, "Location is too long"),
  service: z.enum(['entrümpelung', 'umzug', 'sperrmüll', 'wohnungsübergabe', 'express', 'sonstiges'], {
    errorMap: () => ({ message: "Invalid service type" })
  }),
  message: z.string().max(1000, "Message is too long").optional(),
  email: z.string().email("Invalid email format").max(255, "Email is too long").optional(),
  source: z.enum(['contact_form', 'whatsapp', 'phone', 'website']).optional().default('contact_form'),
  created_at: z.string().optional(),
});

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Lead notification function called');
    
    // Parse and validate input
    const rawData = await req.json();
    const validationResult = leadSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.format());
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data', 
          details: validationResult.error.format() 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const { name, phone, location, service, message, source, created_at } = validationResult.data;
    
    console.log('Received lead data:', { name, phone, location, service });

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Format the service name for display
    const serviceDisplayNames: Record<string, string> = {
      'entrümpelung': 'Entrümpelung',
      'umzug': 'Umzugshilfe',
      'sperrmüll': 'Sperrmüll-Entsorgung',
      'wohnungsübergabe': 'Wohnungsübergabe',
      'express': 'Express-Service',
      'sonstiges': 'Sonstiges'
    };

    const serviceDisplay = serviceDisplayNames[service] || service;

    // Format the date
    const date = new Date(created_at);
    const formattedDate = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeLocation = escapeHtml(location);
    const safeServiceDisplay = escapeHtml(serviceDisplay);
    const safeMessage = message ? escapeHtml(message) : '';

    // Create HTML email template with escaped values
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neue Lead-Anfrage - QuickKlar</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🚨 Neue Lead-Anfrage</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">QuickKlar Entrümpelung & Umzug</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #dc2626; margin-top: 0;">Kundendaten</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #dc2626;">${safePhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Ort:</td>
              <td style="padding: 8px 0;">${safeLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;"><span style="background-color: #dc2626; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${safeServiceDisplay}</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Eingegangen:</td>
              <td style="padding: 8px 0;">${formattedDate}</td>
            </tr>
          </table>
        </div>

        ${safeMessage ? `
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #dc2626; margin-top: 0;">Nachricht</h3>
          <p style="margin: 0; padding: 10px; background-color: #f5f5f5; border-radius: 4px; border-left: 4px solid #dc2626;">${safeMessage}</p>
        </div>
        ` : ''}

        <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Schnell antworten</h3>
          <a href="https://wa.me/${phone.replace(/[^0-9+]/g, '')}?text=Hallo%20${encodeURIComponent(name)},%20vielen%20Dank%20für%20Ihre%20Anfrage%20bei%20QuickKlar!%20Ich%20melde%20mich%20bezüglich%20Ihres%20Anliegens." 
             style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
            📱 WhatsApp öffnen
          </a>
          <a href="tel:${phone}" 
             style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
            📞 Anrufen
          </a>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>Diese E-Mail wurde automatisch vom QuickKlar Lead-System generiert.</p>
        <p>Quelle: ${source === 'contact_form' ? 'Kontaktformular Website' : source}</p>
      </div>
    </body>
    </html>
    `;

    // Create plain text version
    const textContent = `
🚨 NEUE LEAD-ANFRAGE - QuickKlar

Kundendaten:
Name: ${name}
Telefon: ${phone}
Ort: ${location}
Service: ${serviceDisplay}
Eingegangen: ${formattedDate}

${message ? `Nachricht:\n${message}\n\n` : ''}

Schnell antworten:
WhatsApp: https://wa.me/${phone.replace(/[^0-9+]/g, '')}?text=Hallo%20${encodeURIComponent(name)},%20vielen%20Dank%20für%20Ihre%20Anfrage%20bei%20QuickKlar!
Telefon: ${phone}

---
Diese E-Mail wurde automatisch generiert.
Quelle: ${source === 'contact_form' ? 'Kontaktformular Website' : source}
    `;

    console.log('Sending email via Resend...');

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'QuickKlar Leads <leads@mail.quickklar.de>',
        to: ['kontakt@quickklar.de'],
        subject: `🚨 Neue Lead-Anfrage: ${serviceDisplay} in ${location}`,
        html: htmlContent,
        text: textContent,
      }),
    });

    const emailResult = await emailResponse.json();
    
    console.log('Resend API Response:', emailResult);

    if (!emailResponse.ok) {
      console.error('Resend API Error:', emailResult);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailResult }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Email sent successfully:', emailResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResult.id,
        message: 'Lead notification sent successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in lead notification function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
