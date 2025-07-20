import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home, Trash2, Package, Hammer, Clock } from "lucide-react";

const services = [
  {
    icon: Trash2,
    title: "Entrümpelung",
    description: "Komplette Haushalts- und Geschäftsauflösungen. Wir räumen alles fachgerecht aus."
  },
  {
    icon: Truck,
    title: "Umzugshilfe",
    description: "Professionelle Umzugsunterstützung für Studenten, Expats und Familien."
  },
  {
    icon: Package,
    title: "Sperrmüll-Entsorgung",
    description: "Schnelle und ordnungsgemäße Entsorgung von Sperrmüll und Elektrogeräten."
  },
  {
    icon: Home,
    title: "Wohnungsübergabe",
    description: "Perfekte Vorbereitung für Wohnungsübergaben – besenrein garantiert."
  },
  {
    icon: Hammer,
    title: "Kleinreparaturen",
    description: "Kleinere Reparaturen und Renovierungsarbeiten auf Wunsch."
  },
  {
    icon: Clock,
    title: "Express-Service",
    description: "Eilaufträge noch am gleichen Tag – auch am Wochenende verfügbar."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Unsere <span className="text-brand-red">Leistungen</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Von der kompletten Entrümpelung bis zum professionellen Umzug – 
            wir sind Ihr zuverlässiger Partner in Dortmund und Umgebung.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-black mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};