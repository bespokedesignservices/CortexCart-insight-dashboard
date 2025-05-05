
import React, { useState } from "react";
import { Package, Search, Archive, AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProductsData } from "@/hooks/useProductsData";

const InventoryManagement: React.FC = () => {
  const { products, isLoading, updateProductStock } = useProductsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();

  const filteredInventory = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditItem = (item: any) => {
    setSelectedProduct({...item, newStock: item.quantity});
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      updateProductStock(selectedProduct.id, selectedProduct.newStock);
      setSelectedProduct(null);
    }
  };

  const handleDamageItem = (id: string) => {
    const product = products.find(item => item.id === id);
    if (product && product.quantity > 0) {
      updateProductStock(id, product.quantity - 1);
      
      toast({
        title: "Damaged item recorded",
        description: `1 ${product.name} marked as damaged and removed from inventory.`,
      });
    }
  };

  const getStatusBadge = (quantity: number) => {
    const status = quantity === 0 ? "Out of Stock" : quantity <= 15 ? "Low Stock" : "In Stock";
    
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="outline" className="text-red-500 border-red-500">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground">Loading inventory data...</p>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{getStatusBadge(item.quantity)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Inventory</DialogTitle>
                            <DialogDescription>
                              Update the inventory for {selectedProduct?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="stock" className="text-right">
                                Stock
                              </Label>
                              <Input
                                id="stock"
                                type="number"
                                value={selectedProduct?.newStock || 0}
                                onChange={(e) => setSelectedProduct({
                                  ...selectedProduct,
                                  newStock: parseInt(e.target.value) || 0
                                })}
                                min="0"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleSaveEdit}>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDamageItem(item.id)}
                        disabled={item.quantity <= 0}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Package className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium">No products in inventory</h3>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            Add products to your inventory to track stock levels and manage your inventory.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
