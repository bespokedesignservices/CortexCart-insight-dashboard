
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketStats, SupportTicket } from "@/types/customer-support";
import { TicketsTable } from "./TicketsTable";
import { TicketsSummary } from "./TicketsSummary";

interface TicketOverviewProps {
  stats: TicketStats;
  tickets: SupportTicket[];
}

export const TicketOverview: React.FC<TicketOverviewProps> = ({ stats, tickets }) => {
  return (
    <div className="space-y-6">
      <TicketsSummary stats={stats} />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <TicketsTable tickets={tickets} />
        </TabsContent>
        
        <TabsContent value="open">
          <TicketsTable tickets={tickets.filter(ticket => ticket.status === 'open')} />
        </TabsContent>
        
        <TabsContent value="in-progress">
          <TicketsTable tickets={tickets.filter(ticket => ticket.status === 'in-progress')} />
        </TabsContent>
        
        <TabsContent value="resolved">
          <TicketsTable tickets={tickets.filter(ticket => ticket.status === 'resolved')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
