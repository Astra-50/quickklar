import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Datenschutz() {
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
          
          <h1 className="text-4xl font-bold text-brand-black mb-2">Datenschutzerklärung</h1>
          <p className="text-muted-foreground">Informationen zur Datenverarbeitung</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white p-8 rounded-lg shadow-card space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-semibold text-brand-black mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-700 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-semibold text-brand-black mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-700 mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um 
                Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">2. Hosting</h2>
              <p className="text-gray-700 mb-4">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <h3 className="text-xl font-semibold text-brand-black mb-3">Externes Hosting</h3>
              <p className="text-gray-700 mb-4">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
                werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, 
                Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe 
                und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-xl font-semibold text-brand-black mb-3">Datenschutz</h3>
              <p className="text-gray-700 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-brand-black mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-gray-700 mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-gray-50 p-4 rounded border">
                <p className="text-gray-700">
                  QuickKlar Easy Move & Clean<br />
                  [Vollständiger Name]<br />
                  [Straße und Hausnummer]<br />
                  [PLZ und Ort]<br />
                  <br />
                  Telefon: +49 1521 6251471<br />
                  E-Mail: kontakt@quickklar.de
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-semibold text-brand-black mb-3">Kontaktformular</h3>
              <p className="text-gray-700 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="text-xl font-semibold text-brand-black mb-3">WhatsApp</h3>
              <p className="text-gray-700 mb-4">
                Für die Kommunikation nutzen wir den Messaging-Dienst WhatsApp. Anbieter ist die WhatsApp Ireland Limited, 
                4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Wenn Sie uns über WhatsApp kontaktieren, 
                werden Ihre Daten auf den Servern von WhatsApp gespeichert.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-black mb-4">5. Ihre Rechte</h2>
              <p className="text-gray-700 mb-4">
                Sie haben folgende Rechte:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                <li>Recht auf Berichtigung unrichtiger Daten</li>
                <li>Recht auf Löschung Ihrer Daten</li>
                <li>Recht auf Einschränkung der Datenverarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
                <li>Widerspruchsrecht gegen die Datenverarbeitung</li>
                <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Hinweis</h3>
              <p className="text-blue-700 text-sm">
                Diese Datenschutzerklärung ist ein Muster und muss an die spezifischen Gegebenheiten Ihres Unternehmens 
                angepasst werden. Konsultieren Sie einen Datenschutzexperten oder Rechtsanwalt für die finale Version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}