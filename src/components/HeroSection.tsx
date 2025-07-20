import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import heroImage from "@/assets/hero-junk-removal.jpg";

export const HeroSection = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/4915216251471?text=Hallo,%20ich%20brauche%20Hilfe%20bei%20Entrümpelung/Umzug", "_blank");
  };

  const handleQuoteRequest = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-brand-red">QuickKlar</span><br />
            Easy Move & Clean
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 font-medium">
            Professionelle Entrümpelung & Umzugshilfe in Dortmund
          </p>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Schnell • Zuverlässig • Fair – Ihr lokaler Partner für Entrümpelung, 
            Umzüge und Sperrmüll-Entsorgung. Sofort-Angebot per WhatsApp!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="whatsapp"
              onClick={handleWhatsAppContact}
              className="text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Sofort-Kontakt
            </Button>
            
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleQuoteRequest}
              className="text-lg px-8 py-6 h-auto"
            >
              <Phone className="w-6 h-6" />
              Kostenloses Angebot
            </Button>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
              <span>Heute noch verfügbar</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
              <span>Kostenlose Besichtigung</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
              <span>Transparente Preise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};