import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Impressum() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>
          
          <h1 className="text-4xl font-bold text-brand-black mb-2">Impressum</h1>
          <p className="text-muted-foreground">Angaben gemäß § 5 TMG</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white p-8 rounded-lg shadow-card space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Anbieter</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>QuickKlar Easy Move & Clean</strong><br />
                  [Vollständiger Name des Inhabers]<br />
                  [Straße und Hausnummer]<br />
                  [PLZ und Ort]<br />
                  Deutschland
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Kontakt</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Telefon:</strong> +49 1521 6251471<br />
                  <strong>E-Mail:</strong> kontakt@quickklar.de<br />
                  <strong>Website:</strong> quickklar.de
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p className="text-gray-700">
                Entsorgungsdienstleistungen und Umzugsservice<br />
                Zuständige Kammer: [Falls erforderlich]<br />
                Verliehen in: Deutschland
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Redaktionell verantwortlich</h2>
              <p className="text-gray-700">
                [Name des Verantwortlichen]<br />
                [Adresse]
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">EU-Streitschlichtung</h2>
              <p className="text-gray-700">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="text-gray-700">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Hinweis</h3>
              <p className="text-yellow-700 text-sm">
                Dieses Impressum ist ein Muster und muss mit den tatsächlichen Geschäftsdaten vervollständigt werden. 
                Bitte konsultieren Sie einen Rechtsanwalt für die finale Version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}