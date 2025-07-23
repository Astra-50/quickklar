
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  name: string;
  phone: string;
  location: string;
  service: string;
  message?: string;
  source: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Lead notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadNotificationRequest = await req.json();
    console.log("Received lead data:", leadData);

    // Format the service name for display
    const serviceDisplayNames: Record<string, string> = {
      'entrümpelung': 'Entrümpelung',
      'umzug': 'Umzugshilfe',
      'sperrmüll': 'Sperrmüll-Entsorgung',
      'wohnungsübergabe': 'Wohnungsübergabe',
      'express': 'Express-Service',
      'sonstiges': 'Sonstiges'
    };

    const serviceDisplay = serviceDisplayNames[leadData.service] || leadData.service;

    // Create the email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #dc2626; margin-bottom: 20px; font-size: 24px;">🔔 Neue Lead-Anfrage bei QuickKlar</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Kontaktdaten</h2>
            <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${leadData.name}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Telefon/WhatsApp:</strong> ${leadData.phone}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Ort:</strong> ${leadData.location}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Service-Details</h2>
            <p style="margin: 8px 0; color: #374151;"><strong>Gewünschte Leistung:</strong> ${serviceDisplay}</p>
            ${leadData.message ? `<p style="margin: 8px 0; color: #374151;"><strong>Nachricht:</strong><br><span style="background-color: white; padding: 10px; border-radius: 4px; display: block; margin-top: 5px;">${leadData.message}</span></p>` : ''}
          </div>

          <div style="background-color: #fef3f2; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
            <p style="margin: 0; color: #7f1d1d;"><strong>Quelle:</strong> ${leadData.source === 'contact_form' ? 'Kontaktformular' : leadData.source}</p>
            <p style="margin: 5px 0 0 0; color: #7f1d1d; font-size: 14px;">Eingegangen: ${new Date(leadData.created_at).toLocaleString('de-DE')}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Diese E-Mail wurde automatisch generiert, wenn ein neuer Lead über Ihre Website eingegangen ist.
              <br>Bitte kontaktieren Sie den Kunden so schnell wie möglich für die beste Conversion-Rate.
            </p>
          </div>
        </div>
      </div>
    `;

    // Send the email
    const emailResponse = await resend.emails.send({
      from: "QuickKlar Leads <leads@mail.quickklar.de>",
      to: ["kontakt@quickklar.de"],
      subject: `🔔 Neue ${serviceDisplay} Anfrage von ${leadData.name} (${leadData.location})`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
