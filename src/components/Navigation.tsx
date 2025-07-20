import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/491234567890?text=Hallo,%20ich%20brauche%20Hilfe%20bei%20Entrümpelung/Umzug", "_blank");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold transition-colors duration-300"
            >
              <span className={`${isScrolled ? "text-brand-red" : "text-white"}`}>
                QuickKlar
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("services")}
              className={`font-medium transition-colors duration-300 hover:text-brand-red ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              Leistungen
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className={`font-medium transition-colors duration-300 hover:text-brand-red ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              Bewertungen
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className={`font-medium transition-colors duration-300 hover:text-brand-red ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              So geht's
            </button>
            <button 
              onClick={() => scrollToSection("contact-form")}
              className={`font-medium transition-colors duration-300 hover:text-brand-red ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              Kontakt
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open("tel:+491234567890", "_self")}
              className={`${
                isScrolled 
                  ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white" 
                  : "border-white text-white hover:bg-white hover:text-brand-black"
              }`}
            >
              <Phone className="w-4 h-4" />
              Anrufen
            </Button>
            <Button 
              variant="whatsapp" 
              size="sm"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-3 py-2 text-brand-black hover:bg-gray-100 rounded-md"
              >
                Leistungen
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left px-3 py-2 text-brand-black hover:bg-gray-100 rounded-md"
              >
                Bewertungen
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left px-3 py-2 text-brand-black hover:bg-gray-100 rounded-md"
              >
                So geht's
              </button>
              <button 
                onClick={() => scrollToSection("contact-form")}
                className="block w-full text-left px-3 py-2 text-brand-black hover:bg-gray-100 rounded-md"
              >
                Kontakt
              </button>
              
              <div className="pt-4 flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open("tel:+491234567890", "_self")}
                  className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                >
                  <Phone className="w-4 h-4" />
                  Anrufen
                </Button>
                <Button 
                  variant="whatsapp" 
                  size="sm"
                  onClick={handleWhatsAppContact}
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};