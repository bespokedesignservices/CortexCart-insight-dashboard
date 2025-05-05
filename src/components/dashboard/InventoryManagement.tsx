
import React, { useState } from "react";
import { Package, Search, Archive, AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock inventory data
const inventoryData = [
  { id: "1", name: "Premium Leather Wallet", sku: "PLW-001", stock: 42, status: "In Stock", category: "Accessories" },
  { id: "2", name: "Organic Cotton T-Shirt", sku: "OCT-001", stock: 78, status: "In Stock", category: "Clothing" },
  { id: "3", name: "Wireless Earbuds Pro", sku: "WEP-001", stock: 15, status: "Low Stock", category: "Electronics" },
  { id: "4", name: "Stainless Steel Water Bottle", sku: "SSWB-001", stock: 0, status: "Out of Stock", category: "Home & Kitchen" },
  { id: "5", name: "Handcrafted Ceramic Mug", sku: "HCM-001", stock: 23, status: "In Stock", category: "Home & Kitchen" },
];

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockChange = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const status = newStock === 0 ? "Out of Stock" : newStock <= 15 ? "Low Stock" : "In Stock";
        return { ...item, stock: newStock, status };
      }
      return item;
    }));
    
    toast({
      title: "Inventory updated",
      description: "Product stock level has been updated successfully.",
    });
  };

  const handleEditItem = (item: any) => {
    setSelectedProduct({...item, newStock: item.stock});
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      handleStockChange(selectedProduct.id, selectedProduct.newStock);
      setSelectedProduct(null);
    }
  };

  const handleDamageItem = (id: string) => {
    const product = inventory.find(item => item.id === id);
    if (product && product.stock > 0) {
      handleStockChange(id, product.stock - 1);
      
      toast({
        title: "Damaged item recorded",
        description: `1 ${product.name} marked as damaged and removed from inventory.`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
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

      {inventory.length > 0 ? (
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
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                        disabled={item.stock <= 0}
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
