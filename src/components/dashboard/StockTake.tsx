
import React, { useState, useEffect } from "react";
import { ClipboardCheck, ArrowRight, AlertCircle, Save, CheckSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useProductsData } from "@/hooks/useProductsData";

interface StockTakeItem {
  id: string;
  name: string;
  sku: string;
  expected: number;
  counted: number | null;
  difference: number | null;
}

const StockTake: React.FC = () => {
  const { products, isLoading, updateProductStock } = useProductsData();
  const [stockTakeItems, setStockTakeItems] = useState<StockTakeItem[]>([]);
  const [isStockTakeActive, setIsStockTakeActive] = useState(false);
  const [stockTakeDate, setStockTakeDate] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Update the stock take items when products change
  useEffect(() => {
    if (products.length > 0) {
      const items = products.map(product => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        expected: product.quantity,
        counted: null,
        difference: null
      }));
      setStockTakeItems(items);
    }
  }, [products]);
  
  const handleStartStockTake = () => {
    setIsStockTakeActive(true);
    setStockTakeDate(new Date().toISOString().split('T')[0]);
  };
  
  const handleCountChange = (id: string, count: number) => {
    setStockTakeItems(prev => prev.map(item => {
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
    const uncountedItems = stockTakeItems.filter(item => item.counted === null);
    
    if (uncountedItems.length > 0) {
      toast({
        title: "Incomplete stock take",
        description: "Please count all items before completing the stock take.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate discrepancies and update stock quantities
    const discrepancies = stockTakeItems.filter(item => item.difference !== 0 && item.difference !== null);
    
    // Update the product quantities based on the stock take
    stockTakeItems.forEach(item => {
      if (item.counted !== null && item.counted !== item.expected) {
        updateProductStock(item.id, item.counted);
      }
    });
    
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
    const expected = stockTakeItems.reduce((sum, item) => sum + item.expected, 0);
    const counted = stockTakeItems.reduce((sum, item) => sum + (item.counted || 0), 0);
    const difference = counted - expected;
    
    return { expected, counted, difference };
  };
  
  const totals = getTotalCounts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading inventory data...</p>
        </div>
      </div>
    );
  }

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
          <Button onClick={handleStartStockTake} disabled={products.length === 0}>
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
                {stockTakeItems.map((item) => (
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
          <Button onClick={handleStartStockTake} disabled={products.length === 0}>
            Start Stock Take
          </Button>
        </div>
      )}
    </div>
  );
};

export default StockTake;
