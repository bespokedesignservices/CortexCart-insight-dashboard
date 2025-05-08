
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Download, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Receipt {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: string;
}

const Receipts: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [receipts] = useState<Receipt[]>([
    {
      id: "R-2025-001",
      date: "Jul 1, 2025",
      type: "Subscription",
      description: "RecoAI Pro Plan - Monthly",
      amount: "$29.00",
    },
    {
      id: "R-2025-002",
      date: "Jun 1, 2025",
      type: "Subscription",
      description: "RecoAI Pro Plan - Monthly",
      amount: "$29.00",
    },
    {
      id: "R-2025-003",
      date: "May 15, 2025",
      type: "Add-On",
      description: "Additional API Credits",
      amount: "$19.99",
    },
    {
      id: "R-2025-004",
      date: "May 1, 2025",
      type: "Subscription",
      description: "RecoAI Pro Plan - Monthly",
      amount: "$29.00",
    },
    {
      id: "R-2025-005", 
      date: "Apr 1, 2025",
      type: "Subscription",
      description: "RecoAI Pro Plan - Monthly",
      amount: "$29.00",
    },
    {
      id: "R-2025-006",
      date: "Mar 1, 2025",
      type: "Subscription",
      description: "RecoAI Starter Plan - Monthly",
      amount: "$9.00",
    },
    {
      id: "R-2025-007",
      date: "Feb 1, 2025",
      type: "Subscription",
      description: "RecoAI Starter Plan - Monthly",
      amount: "$9.00",
    },
  ]);

  const filteredReceipts = receipts.filter(receipt => 
    receipt.id.toLowerCase().includes(filter.toLowerCase()) ||
    receipt.description.toLowerCase().includes(filter.toLowerCase())
  );
  
  const subscriptionReceipts = receipts.filter(receipt => receipt.type === "Subscription");
  const otherReceipts = receipts.filter(receipt => receipt.type !== "Subscription");

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Receipts & Downloads</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-recoai-purple" />
            Your Receipts
          </CardTitle>
          <CardDescription>
            Download and print receipts for your records.
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search receipts..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="subscription">Subscriptions</TabsTrigger>
              <TabsTrigger value="other">Add-Ons & Others</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ReceiptTable receipts={filteredReceipts} />
            </TabsContent>
            
            <TabsContent value="subscription">
              <ReceiptTable receipts={subscriptionReceipts.filter(receipt => 
                receipt.id.toLowerCase().includes(filter.toLowerCase()) ||
                receipt.description.toLowerCase().includes(filter.toLowerCase())
              )} />
            </TabsContent>
            
            <TabsContent value="other">
              <ReceiptTable receipts={otherReceipts.filter(receipt => 
                receipt.id.toLowerCase().includes(filter.toLowerCase()) ||
                receipt.description.toLowerCase().includes(filter.toLowerCase())
              )} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface ReceiptTableProps {
  receipts: Receipt[];
}

const ReceiptTable: React.FC<ReceiptTableProps> = ({ receipts }) => {
  if (receipts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No receipts found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Receipt</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receipts.map((receipt) => (
          <TableRow key={receipt.id}>
            <TableCell className="font-medium">{receipt.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gray-500" />
                {receipt.date}
              </div>
            </TableCell>
            <TableCell>
              <div>
                {receipt.description}
                <span className="text-xs ml-2 text-gray-500">{receipt.type}</span>
              </div>
            </TableCell>
            <TableCell>{receipt.amount}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  PDF
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Receipts;
