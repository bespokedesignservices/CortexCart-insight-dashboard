
import React, { useState } from "react";
import { ClipboardCheck, ArrowRight, AlertCircle, Save, CheckSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Mock stock take data
const stockData = [
  { id: "1", name: "Premium Leather Wallet", sku: "PLW-001", expected: 42, counted: null, difference: null },
  { id: "2", name: "Organic Cotton T-Shirt", sku: "OCT-001", expected: 78, counted: null, difference: null },
  { id: "3", name: "Wireless Earbuds Pro", sku: "WEP-001", expected: 15, counted: null, difference: null },
  { id: "4", name: "Stainless Steel Water Bottle", sku: "SSWB-001", expected: 8, counted: null, difference: null },
  { id: "5", name: "Handcrafted Ceramic Mug", sku: "HCM-001", expected: 23, counted: null, difference: null },
];

const StockTake: React.FC = () => {
  const [items, setItems] = useState(stockData);
  const [isStockTakeActive, setIsStockTakeActive] = useState(false);
  const [stockTakeDate, setStockTakeDate] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleStartStockTake = () => {
    setIsStockTakeActive(true);
    setStockTakeDate(new Date().toISOString().split('T')[0]);
  };
  
  const handleCountChange = (id: string, count: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const difference = count - item.expected;
        return {
          ...item,
          counted: count,
          difference: difference
        };
      }
      return item;
    }));
  };
  
  const handleCompleteStockTake = () => {
    const uncountedItems = items.filter(item => item.counted === null);
    
    if (uncountedItems.length > 0) {
      toast({
        title: "Incomplete stock take",
        description: "Please count all items before completing the stock take.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate discrepancies
    const discrepancies = items.filter(item => item.difference !== 0 && item.difference !== null);
    
    toast({
      title: "Stock Take Completed",
      description: `Stock take completed with ${discrepancies.length} discrepancies found.`,
    });
    
    // Reset for next stock take
    setIsStockTakeActive(false);
  };
  
  const getDifferenceDisplay = (difference: number | null) => {
    if (difference === null) return null;
    
    if (difference === 0) {
      return <span className="text-green-600">Matched</span>;
    } else if (difference > 0) {
      return <span className="text-blue-600">+{difference}</span>;
    } else {
      return <span className="text-red-600">{difference}</span>;
    }
  };
  
  const getTotalCounts = () => {
    const expected = items.reduce((sum, item) => sum + item.expected, 0);
    const counted = items.reduce((sum, item) => sum + (item.counted || 0), 0);
    const difference = counted - expected;
    
    return { expected, counted, difference };
  };
  
  const totals = getTotalCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Stock Take</h3>
          <p className="text-muted-foreground">
            {isStockTakeActive 
              ? `Stock take in progress - started on ${stockTakeDate}` 
              : "Start a new stock take to reconcile your physical inventory"}
          </p>
        </div>
        
        {!isStockTakeActive ? (
          <Button onClick={handleStartStockTake}>
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Start Stock Take
          </Button>
        ) : (
          <Button onClick={handleCompleteStockTake} className="bg-green-600 hover:bg-green-700">
            <CheckSquare className="mr-2 h-4 w-4" />
            Complete Stock Take
          </Button>
        )}
      </div>
      
      {isStockTakeActive && (
        <>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Stock Take In Progress</AlertTitle>
            <AlertDescription>
              Count your physical inventory and enter the quantities below. The system will automatically calculate any discrepancies.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                  <TableHead className="text-right">Counted</TableHead>
                  <TableHead className="text-right">Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-right">{item.expected}</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        min="0"
                        value={item.counted !== null ? item.counted : ''}
                        onChange={(e) => handleCountChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 ml-auto"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      {getDifferenceDisplay(item.difference)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expected Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.expected}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Counted Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.counted}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Difference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  totals.difference > 0 ? 'text-blue-600' : 
                  totals.difference < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {totals.difference > 0 ? `+${totals.difference}` : totals.difference}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {!isStockTakeActive && (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <ClipboardCheck className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium">No active stock take</h3>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            Start a new stock take to reconcile your physical inventory with your system records.
          </p>
          <Button onClick={handleStartStockTake}>
            Start Stock Take
          </Button>
        </div>
      )}
    </div>
  );
};

export default StockTake;
