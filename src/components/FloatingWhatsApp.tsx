import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/4917680774054?text=Hallo,%20ich%20brauche%20Hilfe%20bei%20Entrümpelung/Umzug"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow animate-pulse"
      aria-label="WhatsApp Kontakt"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};
