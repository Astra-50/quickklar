
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
    message: ""
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      
      // Store lead in database
      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          service: formData.service,
          message: formData.message,
          source: 'contact_form'
        });

      if (leadError) {
        console.error('Error storing lead:', leadError);
        toast({
          title: "Fehler beim Speichern",
          description: "Die Anfrage konnte nicht gespeichert werden, aber Sie werden zu WhatsApp weitergeleitet.",
          variant: "destructive"
        });
      } else {
        console.log('Lead stored successfully');
        
        // Call the email notification function directly
        try {
          const { error: emailError } = await supabase.functions.invoke('send-lead-notification', {
            body: {
              name: formData.name,
              phone: formData.phone,
              location: formData.location,
              service: formData.service,
              message: formData.message,
              source: 'contact_form',
              created_at: new Date().toISOString()
            }
          });

          if (emailError) {
            console.error('Error sending email notification:', emailError);
          } else {
            console.log('Email notification sent successfully');
          }
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
        }
      }

      // Create WhatsApp message
      const whatsappMessage = `Hallo QuickKlar Team!

Name: ${formData.name}
Telefon: ${formData.phone}
Ort: ${formData.location}
Service: ${formData.service}

Nachricht: ${formData.message}

Bitte um ein kostenloses Angebot. Vielen Dank!`;

      const whatsappUrl = `https://wa.me/4915216251471?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Anfrage gesendet!",
        description: "Sie werden zu WhatsApp weitergeleitet. Wir melden uns schnell bei Ihnen zurück.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        location: "",
        service: "",
        message: ""
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact-form" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Kostenloses <span className="text-brand-red">Angebot</span> anfordern
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Füllen Sie das Formular aus und erhalten Sie innerhalb von 2 Stunden 
            ein unverbindliches Angebot per WhatsApp.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-brand-black">
                Ihre Anfrage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Ihr vollständiger Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon / WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+49 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ort / Stadtteil *</Label>
                  <Input
                    id="location"
                    placeholder="z.B. Dortmund-Innenstadt, Hörde, etc."
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Gewünschte Leistung *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Wählen Sie eine Leistung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrümpelung">Entrümpelung</SelectItem>
                      <SelectItem value="umzug">Umzugshilfe</SelectItem>
                      <SelectItem value="sperrmüll">Sperrmüll-Entsorgung</SelectItem>
                      <SelectItem value="wohnungsübergabe">Wohnungsübergabe</SelectItem>
                      <SelectItem value="express">Express-Service</SelectItem>
                      <SelectItem value="sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Beschreibung</Label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie kurz Ihr Anliegen (Anzahl Zimmer, Art der Gegenstände, Zeitrahmen, etc.)"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 text-lg"
                    variant="hero"
                    disabled={!formData.name || !formData.phone || !formData.location || !formData.service}
                  >
                    <Send className="w-5 h-5" />
                    Angebot per WhatsApp anfordern
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="whatsapp"
                    className="h-12"
                    onClick={() => window.open("https://wa.me/4915216251471?text=Hallo,%20ich%20brauche%20Hilfe%20bei%20Entrümpelung/Umzug", "_blank")}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Direkt WhatsApp
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nur für die Angebotserstellung verwendet.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
