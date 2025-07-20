import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default Index;
