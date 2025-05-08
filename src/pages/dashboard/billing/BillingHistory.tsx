
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, FileText, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  description: string;
}

const BillingHistory: React.FC = () => {
  const [invoices] = React.useState<Invoice[]>([
    {
      id: "INV-2025-001",
      date: "Jul 1, 2025",
      amount: "$29.00",
      status: "paid",
      description: "RecoAI Pro Plan - Monthly",
    },
    {
      id: "INV-2025-002",
      date: "Jun 1, 2025",
      amount: "$29.00",
      status: "paid",
      description: "RecoAI Pro Plan - Monthly",
    },
    {
      id: "INV-2025-003",
      date: "May 1, 2025",
      amount: "$29.00",
      status: "paid",
      description: "RecoAI Pro Plan - Monthly",
    },
    {
      id: "INV-2025-004",
      date: "Apr 1, 2025",
      amount: "$29.00",
      status: "paid",
      description: "RecoAI Pro Plan - Monthly",
    },
    {
      id: "INV-2025-005",
      date: "Mar 1, 2025",
      amount: "$9.00",
      status: "paid",
      description: "RecoAI Starter Plan - Monthly",
    },
    {
      id: "INV-2025-006",
      date: "Feb 1, 2025",
      amount: "$9.00",
      status: "paid",
      description: "RecoAI Starter Plan - Monthly",
    },
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Billing History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-recoai-purple" />
            Invoice History
          </CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      {invoice.id}
                      <span className="text-xs text-gray-500">{invoice.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      {invoice.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3 text-gray-500" />
                      {invoice.amount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingHistory;
