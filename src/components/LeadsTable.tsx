
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Phone } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  service: string;
  message?: string;
  status: string;
  source: string;
  created_at: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onStatusUpdate: (id: string, status: string) => void;
  getStatusColor: (status: string) => string;
  getServiceDisplayName: (service: string) => string;
}

export const LeadsTable = ({ 
  leads, 
  onStatusUpdate, 
  getStatusColor, 
  getServiceDisplayName 
}: LeadsTableProps) => {
  const openWhatsApp = (phone: string, name: string) => {
    const message = `Hallo ${name}, vielen Dank für Ihre Anfrage bei QuickKlar! Ich melde mich bezüglich Ihres Anliegens.`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStatusDisplayName = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Neu',
      'contacted': 'Kontaktiert',
      'converted': 'Konvertiert',
      'lost': 'Verloren'
    };
    return statusMap[status] || status;
  };

  if (leads.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Keine Leads gefunden.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Ort</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    {format(new Date(lead.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div>{lead.name}</div>
                      {lead.email && (
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{lead.phone}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openWhatsApp(lead.phone, lead.name)}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{lead.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getServiceDisplayName(lead.service)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`}></div>
                      <span className="text-sm">{getStatusDisplayName(lead.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        value={lead.status}
                        onValueChange={(status) => onStatusUpdate(lead.id, status)}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Neu</SelectItem>
                          <SelectItem value="contacted">Kontaktiert</SelectItem>
                          <SelectItem value="converted">Konvertiert</SelectItem>
                          <SelectItem value="lost">Verloren</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openWhatsApp(lead.phone, lead.name)}
                        className="h-8"
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {leads.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            {leads.length} Lead{leads.length !== 1 ? 's' : ''} gefunden
          </div>
        )}
      </CardContent>
    </Card>
  );
};
