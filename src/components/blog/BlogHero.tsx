import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const BlogHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-glow py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          QuickKlar Blog
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Expertentipps für Entrümpelung, Umzug und nachhaltige Entsorgung in Dortmund. 
          Profitieren Sie von unserem Fachwissen und unserer langjährigen Erfahrung.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/#contact">Kostenloses Angebot</Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <Link to="/blog?category=entrumpelung-ratgeber">Entrümpelung Tipps</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};