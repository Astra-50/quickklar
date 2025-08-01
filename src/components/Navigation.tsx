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
    window.open("https://wa.me/4915216251471?text=Hallo,%20ich%20brauche%20Hilfe%20bei%20Entrümpelung/Umzug", "_blank");
  };

  const scrollToSection = (id: string) => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${id}`;
    }
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
              onClick={() => window.location.pathname === '/' ? window.scrollTo({ top: 0, behavior: "smooth" }) : window.location.href = '/'}
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
            <a 
              href="/blog"
              className={`font-medium transition-colors duration-300 hover:text-brand-red ${
                isScrolled ? "text-brand-black" : "text-white"
              }`}
            >
              Blog
            </a>
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
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="tel:+4915216251471"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border ${
                isScrolled 
                  ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white hover:shadow-lg" 
                  : "border-white text-white hover:bg-white hover:text-brand-black hover:shadow-lg"
              }`}
            >
              <Phone className="w-4 h-4" />
              +49 1521 6251471
            </a>
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
              <a 
                href="/blog"
                className="block w-full text-left px-3 py-2 text-brand-black hover:bg-gray-100 rounded-md"
              >
                Blog
              </a>
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
                <a 
                  href="tel:+4915216251471"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  +49 1521 6251471
                </a>
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