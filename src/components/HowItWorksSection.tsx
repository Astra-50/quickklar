import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "1",
    title: "WhatsApp Kontakt",
    description: "Schreiben Sie uns einfach per WhatsApp oder nutzen Sie unser Kontaktformular. Beschreiben Sie kurz Ihr Anliegen und senden Sie gerne Fotos mit."
  },
  {
    icon: Calendar,
    step: "2", 
    title: "Kostenlose Besichtigung",
    description: "Wir kommen kostenlos zu Ihnen vor Ort, schauen uns alles an und erstellen ein faires, transparentes Angebot – meist noch am gleichen Tag."
  },
  {
    icon: CheckCircle,
    step: "3",
    title: "Schnelle Umsetzung", 
    description: "Nach Ihrer Zusage führen wir die Arbeiten professionell und zügig durch. Alles wird fachgerecht entsorgt und die Wohnung besenrein übergeben."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            So einfach <span className="text-brand-red">geht's</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            In nur 3 Schritten von der Anfrage zur professionellen Durchführung. 
            Schnell, unkompliziert und transparent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-brand-red transform -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-brand-red transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <Card key={index} className="relative z-10 hover:shadow-card transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-brand-black mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};