import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Dortmund-Innenstadt",
    text: "Unglaublich schnell und professionell! Als Studentin hatte ich wenig Zeit für den Umzug – QuickKlar hat alles perfekt organisiert. Sehr faire Preise!",
    rating: 5,
    language: "de"
  },
  {
    name: "James Peterson",
    location: "Expat from UK",
    text: "Moving to Germany was stressful enough, but QuickKlar made the process so smooth. They even helped with German paperwork! Highly recommended for expats.",
    rating: 5,
    language: "en"
  },
  {
    name: "Herr Schmidt",
    location: "Vermieter, Dortmund",
    text: "Als Vermieter brauche ich schnelle und zuverlässige Entrümpelung zwischen Mietern. QuickKlar ist immer pünktlich und hinterlässt die Wohnung besenrein.",
    rating: 5,
    language: "de"
  },
  {
    name: "Anna K.",
    location: "TU Dortmund Studentin",
    text: "Studentenfreundliche Preise und sehr hilfsbereit! Sie haben sogar geholfen, meine Möbel auf den Campus zu transportieren. Danke!",
    rating: 5,
    language: "de"
  },
  {
    name: "Michael Chen",
    location: "International Student",
    text: "Perfect service for international students! They explained everything clearly and helped me understand the German waste separation rules. Very patient team.",
    rating: 5,
    language: "en"
  },
  {
    name: "Familie Weber",
    location: "Dortmund-Hörde",
    text: "Komplette Haushaltsauflösung nach Omas Tod. Das Team war sehr einfühlsam und hat alles diskret abgewickelt. Vielen Dank für die Unterstützung!",
    rating: 5,
    language: "de"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Das sagen unsere <span className="text-brand-red">Kunden</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Vertrauen Sie auf die Erfahrungen von über 500 zufriedenen Kunden 
            aus Dortmund und Umgebung.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-lg relative">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-brand-red mb-4 opacity-20" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-brand-black">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  {testimonial.language === "en" && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      English Review
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};