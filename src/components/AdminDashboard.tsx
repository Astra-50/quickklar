
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeadsTable } from "@/components/LeadsTable";
import { Search, Users, Phone, MessageCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export const AdminDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Note: This will only work if RLS policies allow access or if user has admin privileges
  // For production, you'd want proper authentication
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      console.log('Fetching leads...');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }
      
      console.log('Fetched leads:', data);
      return data as Lead[];
    },
  });

  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Status aktualisiert",
        description: "Lead-Status wurde erfolgreich geändert.",
      });
    },
    onError: (error) => {
      console.error('Error updating lead status:', error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
    }
  });

  // Filter leads based on current filters
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesService = serviceFilter === "all" || lead.service === serviceFilter;
    const matchesSearch = searchTerm === "" || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesService && matchesSearch;
  });

  // Get statistics
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'converted': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getServiceDisplayName = (service: string) => {
    const serviceMap: Record<string, string> = {
      'entrümpelung': 'Entrümpelung',
      'umzug': 'Umzugshilfe',
      'sperrmüll': 'Sperrmüll-Entsorgung',
      'wohnungsübergabe': 'Wohnungsübergabe',
      'express': 'Express-Service',
      'sonstiges': 'Sonstiges'
    };
    return serviceMap[service] || service;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
          <p>Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black mb-2">
          QuickKlar Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Leads und verfolgen Sie Conversions
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neue Leads</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kontaktiert</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konvertiert</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Suche nach Name, Telefon oder Ort..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="new">Neu</SelectItem>
                <SelectItem value="contacted">Kontaktiert</SelectItem>
                <SelectItem value="converted">Konvertiert</SelectItem>
                <SelectItem value="lost">Verloren</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Service Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Services</SelectItem>
                <SelectItem value="entrümpelung">Entrümpelung</SelectItem>
                <SelectItem value="umzug">Umzugshilfe</SelectItem>
                <SelectItem value="sperrmüll">Sperrmüll</SelectItem>
                <SelectItem value="wohnungsübergabe">Wohnungsübergabe</SelectItem>
                <SelectItem value="express">Express-Service</SelectItem>
                <SelectItem value="sonstiges">Sonstiges</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <LeadsTable 
        leads={filteredLeads}
        onStatusUpdate={(id, status) => updateLeadStatus.mutate({ id, status })}
        getStatusColor={getStatusColor}
        getServiceDisplayName={getServiceDisplayName}
      />
    </div>
  );
};
