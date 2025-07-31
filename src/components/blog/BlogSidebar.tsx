import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface BlogSidebarProps {
  categories: BlogCategory[];
}

export const BlogSidebar = ({ categories }: BlogSidebarProps) => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Kategorien</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link to="/blog">
            <Badge 
              variant={!currentCategory ? "default" : "secondary"}
              className="w-full justify-start cursor-pointer hover:bg-primary/80"
            >
              Alle Artikel
            </Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category.id} to={`/blog?category=${category.slug}`}>
              <Badge 
                variant={currentCategory === category.slug ? "default" : "secondary"}
                className="w-full justify-start cursor-pointer hover:bg-primary/80"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-white">Kostenlose Beratung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary-foreground/90 text-sm">
            Benötigen Sie professionelle Hilfe bei Ihrer Entrümpelung oder Ihrem Umzug? 
            Kontaktieren Sie uns für ein kostenloses Angebot.
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+49 1521 6251471</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>kontakt@quickklar.de</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Dortmund & Umgebung</span>
            </div>
          </div>
          
          <Button 
            asChild
            variant="secondary"
            className="w-full bg-white text-primary hover:bg-white/90"
          >
            <Link to="/#contact">Jetzt Kontakt aufnehmen</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Beliebte Themen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm space-y-1">
            <Link to="/blog?category=entrumpelung-ratgeber" className="block text-primary hover:underline">
              Entrümpelung Tipps
            </Link>
            <Link to="/blog?category=umzug-checklisten" className="block text-primary hover:underline">
              Umzug Checklisten
            </Link>
            <Link to="/blog?category=kosten-preise" className="block text-primary hover:underline">
              Kosten & Preise
            </Link>
            <Link to="/blog?category=nachhaltigkeit" className="block text-primary hover:underline">
              Nachhaltige Entsorgung
            </Link>
            <Link to="/blog?category=dortmund-lokal" className="block text-primary hover:underline">
              Dortmund Lokales
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};