
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketOverview } from "@/components/customers/TicketOverview";
import { SupportTicket, TicketStats } from "@/types/customer-support";

const Customers: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [ticketStats] = useState<TicketStats>({
    total: 48,
    open: 12,
    inProgress: 8,
    resolved: 23,
    closed: 5,
    averageResolutionTime: '4 hours 37 minutes'
  });

  const [tickets] = useState<SupportTicket[]>([
    {
      id: "TKT-2023-0001",
      customerId: "CUST-1234",
      customerName: "Jane Cooper",
      customerEmail: "jane@example.com",
      subject: "Unable to place an order",
      description: "I tried to place an order but got an error at checkout.",
      status: "open",
      priority: "high",
      createdAt: "2023-05-01T14:23:45Z",
      updatedAt: "2023-05-01T14:23:45Z",
      assignedTo: null,
      category: "checkout",
      tags: ["error", "payment"]
    },
    {
      id: "TKT-2023-0002",
      customerId: "CUST-2345",
      customerName: "Robert Fox",
      customerEmail: "robert@example.com",
      subject: "Wrong item received",
      description: "I ordered a blue shirt but received a red one.",
      status: "in-progress",
      priority: "medium",
      createdAt: "2023-05-02T09:15:30Z",
      updatedAt: "2023-05-02T10:45:12Z",
      assignedTo: "Sarah Johnson",
      category: "shipping",
      tags: ["wrong-item", "return"]
    },
    {
      id: "TKT-2023-0003",
      customerId: "CUST-3456",
      customerName: "Jenny Wilson",
      customerEmail: "jenny@example.com",
      subject: "Refund not processed",
      description: "I returned an item 2 weeks ago but haven't received my refund yet.",
      status: "open",
      priority: "urgent",
      createdAt: "2023-05-03T11:47:22Z",
      updatedAt: "2023-05-03T11:47:22Z",
      assignedTo: null,
      category: "refund",
      tags: ["money", "urgent"]
    },
    {
      id: "TKT-2023-0004",
      customerId: "CUST-4567",
      customerName: "Albert Flores",
      customerEmail: "albert@example.com",
      subject: "Login issues after password reset",
      description: "I can't log in after resetting my password yesterday.",
      status: "resolved",
      priority: "medium",
      createdAt: "2023-05-04T08:33:11Z",
      updatedAt: "2023-05-04T15:20:45Z",
      assignedTo: "Mike Taylor",
      category: "account",
      tags: ["login", "password"]
    },
    {
      id: "TKT-2023-0005",
      customerId: "CUST-5678",
      customerName: "Kristin Watson",
      customerEmail: "kristin@example.com",
      subject: "Missing item in order",
      description: "My order arrived today but one item is missing.",
      status: "in-progress",
      priority: "high",
      createdAt: "2023-05-05T13:05:18Z",
      updatedAt: "2023-05-05T14:30:22Z",
      assignedTo: "David Miller",
      category: "shipping",
      tags: ["missing-item", "order-issue"]
    },
    {
      id: "TKT-2023-0006",
      customerId: "CUST-6789",
      customerName: "Cameron Williamson",
      customerEmail: "cameron@example.com",
      subject: "Product doesn't match description",
      description: "The product specifications don't match what's on the website.",
      status: "resolved",
      priority: "low",
      createdAt: "2023-05-06T10:12:34Z",
      updatedAt: "2023-05-07T09:45:11Z",
      assignedTo: "Sarah Johnson",
      category: "product",
      tags: ["product-info", "description"]
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-recoai-gray">Manage your customer relationships and support tickets.</p>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="tickets" className="flex-1">Support Tickets</TabsTrigger>
          <TabsTrigger value="directory" className="flex-1">Customer Directory</TabsTrigger>
          <TabsTrigger value="segments" className="flex-1">Customer Segments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="mt-6">
          <TicketOverview stats={ticketStats} tickets={tickets} />
        </TabsContent>
        
        <TabsContent value="directory" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-recoai-gray">Your customer list will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-recoai-gray">Customer engagement data will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="segments" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-recoai-gray">Customer segmentation tools will be available here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-recoai-gray">Customer support management will be available here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customers;
