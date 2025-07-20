import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, Clock, Star } from "lucide-react";

const faqs = [
  {
    question: "Wie schnell können Sie kommen?",
    answer: "Meist noch am gleichen Tag! Rufen Sie uns einfach an oder schreiben Sie uns per WhatsApp."
  },
  {
    question: "Was kostet eine Entrümpelung?",
    answer: "Die Kosten hängen von Umfang und Art der Gegenstände ab. Wir erstellen immer ein kostenloses Angebot vor Ort."
  },
  {
    question: "Entsorgen Sie auch Elektrogeräte?",
    answer: "Ja, wir entsorgen alle Arten von Elektrogeräten fachgerecht und umweltfreundlich."
  },
  {
    question: "Sind Sie auch am Wochenende verfügbar?",
    answer: "Ja, wir arbeiten auch samstags und bei Eilaufträgen auch sonntags. Sprechen Sie uns an!"
  }
];

export const Footer = () => {
  return (
    <footer className="bg-brand-black text-white">
      {/* FAQ Section */}
      <div className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              Häufige <span className="text-brand-red">Fragen</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-card">
                <h3 className="font-semibold text-brand-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-brand-red">QuickKlar</span> Easy Move & Clean
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ihr zuverlässiger Partner für Entrümpelung und Umzüge in Dortmund. 
                Schnell, professionell und zu fairen Preisen.
              </p>
              
              <div className="flex gap-4 mb-6">
                <Button 
                  variant="whatsapp" 
                  size="sm"
                  onClick={() => window.open("https://wa.me/4915216251471", "_blank")}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-brand-black"
                  onClick={() => window.open("tel:+4915216251471", "_self")}
                >
                  <Phone className="w-4 h-4" />
                  Anrufen
                </Button>
              </div>

              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-white ml-2">4.9/5 (200+ Bewertungen)</span>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Kontakt</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Servicegebiet</p>
                    <p className="text-gray-300">Dortmund und Umkreis (bis 30km)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-gray-300">+49 1521 6251471</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-gray-300">Sofort-Kontakt für schnelle Anfragen</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <p className="text-gray-300">kontakt@quickklar.de</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Öffnungszeiten</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-red" />
                  <div>
                    <p className="font-medium">Montag - Freitag</p>
                    <p className="text-gray-300">7:00 - 19:00 Uhr</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-red" />
                  <div>
                    <p className="font-medium">Samstag</p>
                    <p className="text-gray-300">8:00 - 16:00 Uhr</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-red" />
                  <div>
                    <p className="font-medium">Notfälle & Express</p>
                    <p className="text-gray-300">Auch sonntags verfügbar</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-brand-red/10 rounded-lg border border-brand-red/20">
                <p className="text-sm font-medium text-brand-red mb-1">
                  Speziell für Studenten & Expats:
                </p>
                <p className="text-sm text-gray-300">
                  Flexible Terminvereinbarung auch außerhalb der Geschäftszeiten möglich!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 QuickKlar Easy Move & Clean. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="/agb" className="hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};