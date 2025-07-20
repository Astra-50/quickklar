import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AGB() {
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
          
          <h1 className="text-4xl font-bold text-brand-black mb-2">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-muted-foreground">AGB für Entrümpelung und Umzugsservice</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white p-8 rounded-lg shadow-card space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 1 Geltungsbereich</h2>
              <p className="text-gray-700 mb-4">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen QuickKlar Easy Move & Clean 
                (nachfolgend "Auftragnehmer") und dem Kunden über die Erbringung von Entrümperungs- und Umzugsdienstleistungen.
              </p>
              <p className="text-gray-700">
                Entgegenstehende oder abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, 
                der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 2 Vertragsschluss</h2>
              <p className="text-gray-700 mb-4">
                <strong>2.1</strong> Die Darstellung der Dienstleistungen auf der Website stellt kein verbindliches Angebot dar, 
                sondern eine unverbindliche Aufforderung zur Abgabe eines Angebots.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>2.2</strong> Durch die Absendung des Kontaktformulars oder die Kontaktaufnahme per WhatsApp gibt 
                der Kunde ein verbindliches Angebot ab.
              </p>
              <p className="text-gray-700">
                <strong>2.3</strong> Der Vertrag kommt durch die Annahme des Angebots durch den Auftragnehmer zustande, 
                spätestens jedoch durch Beginn der Dienstleistung.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 3 Leistungsumfang</h2>
              <p className="text-gray-700 mb-4">
                <strong>3.1</strong> Der Auftragnehmer erbringt Dienstleistungen im Bereich:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Entrümpelung von Wohnungen, Häusern und Gewerbeobjekten</li>
                <li>Umzugshilfe und -service</li>
                <li>Sperrmüll-Entsorgung</li>
                <li>Wohnungsübergabe-Service</li>
                <li>Express-Dienstleistungen</li>
              </ul>
              <p className="text-gray-700">
                <strong>3.2</strong> Der genaue Leistungsumfang wird im Einzelfall vereinbart und richtet sich nach 
                der jeweiligen Auftragsbestätigung.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 4 Preise und Zahlungsbedingungen</h2>
              <p className="text-gray-700 mb-4">
                <strong>4.1</strong> Es gelten die zum Zeitpunkt des Vertragsschlusses gültigen Preise. 
                Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>4.2</strong> Die Vergütung ist nach Leistungserbringung fällig. Eine Teilzahlung kann vereinbart werden.
              </p>
              <p className="text-gray-700">
                <strong>4.3</strong> Bei Zahlungsverzug werden Verzugszinsen in Höhe von 8 Prozentpunkten über dem 
                Basiszinssatz berechnet.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 5 Termine und Ausführung</h2>
              <p className="text-gray-700 mb-4">
                <strong>5.1</strong> Vereinbarte Termine sind verbindlich. Bei kurzfristigen Absagen (weniger als 24 Stunden) 
                können Ausfallkosten berechnet werden.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>5.2</strong> Der Kunde stellt sicher, dass die zu entrümpelnden Räume zugänglich sind und 
                ausreichend Parkmöglichkeiten vorhanden sind.
              </p>
              <p className="text-gray-700">
                <strong>5.3</strong> Sondermüll, Gefahrstoffe und persönliche Dokumente werden nicht entsorgt und 
                müssen vom Kunden separiert werden.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 6 Haftung</h2>
              <p className="text-gray-700 mb-4">
                <strong>6.1</strong> Der Auftragnehmer haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>6.2</strong> Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, es sei denn, 
                es handelt sich um die Verletzung wesentlicher Vertragspflichten.
              </p>
              <p className="text-gray-700">
                <strong>6.3</strong> Für das Auffinden und die Sicherung von Wertgegenständen ist der Kunde selbst verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 7 Umweltgerechte Entsorgung</h2>
              <p className="text-gray-700 mb-4">
                Der Auftragnehmer verpflichtet sich zur umweltgerechten Entsorgung der Gegenstände entsprechend 
                den geltenden gesetzlichen Bestimmungen. Wiederverwertbare Materialien werden separiert und 
                den entsprechenden Recycling-Kreisläufen zugeführt.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 8 Datenschutz</h2>
              <p className="text-gray-700 mb-4">
                Die Verarbeitung personenbezogener Daten erfolgt entsprechend der Datenschutzerklärung, 
                die Bestandteil dieser AGB ist.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">§ 9 Schlussbestimmungen</h2>
              <p className="text-gray-700 mb-4">
                <strong>9.1</strong> Es gilt das Recht der Bundesrepublik Deutschland.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>9.2</strong> Erfüllungsort und Gerichtsstand ist [Ort einfügen].
              </p>
              <p className="text-gray-700">
                <strong>9.3</strong> Sollten einzelne Bestimmungen dieser AGB unwirksam sein, 
                bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Hinweis</h3>
              <p className="text-green-700 text-sm">
                Diese AGB sind ein Muster und müssen an die spezifischen Bedürfnisse Ihres Unternehmens angepasst werden. 
                Lassen Sie diese von einem Rechtsanwalt prüfen und vervollständigen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}