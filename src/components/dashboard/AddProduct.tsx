
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileUp, AlertTriangle, FileCode, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const productCategories = [
  "Clothing",
  "Electronics",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Jewelry",
  "Accessories",
  "Food & Groceries",
  "Other"
];

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("0");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!productName || !productSKU || !productCategory || !productPrice || !productQuantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Product Added",
      description: `${productName} has been added to your inventory.`
    });
    
    // Reset form
    setProductName("");
    setProductSKU("");
    setProductCategory("");
    setProductPrice("");
    setProductDescription("");
    setProductQuantity("0");
    setProductImage(null);
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!csvFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "File Uploaded",
      description: `${csvFile.name} has been uploaded and is being processed.`
    });
    
    setCsvFile(null);
  };

  return (
    <Tabs defaultValue="single" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="single">Add Single Product</TabsTrigger>
        <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
      </TabsList>
      
      <TabsContent value="single" className="mt-6">
        <form onSubmit={handleAddProduct}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input 
                  id="productName" 
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productSKU">SKU *</Label>
                <Input 
                  id="productSKU"
                  value={productSKU}
                  onChange={e => setProductSKU(e.target.value)}
                  placeholder="Enter product SKU"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productCategory">Category *</Label>
                <Select 
                  value={productCategory} 
                  onValueChange={setProductCategory}
                >
                  <SelectTrigger id="productCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productPrice">Price *</Label>
                <Input 
                  id="productPrice" 
                  value={productPrice} 
                  onChange={e => setProductPrice(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productQuantity">Initial Stock Quantity *</Label>
                <Input 
                  id="productQuantity" 
                  value={productQuantity} 
                  onChange={e => setProductQuantity(e.target.value)}
                  placeholder="0"
                  type="number"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productDescription">Description</Label>
                <Textarea 
                  id="productDescription" 
                  value={productDescription}
                  onChange={e => setProductDescription(e.target.value)}
                  placeholder="Enter product description"
                  className="h-32"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productImage">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="border border-dashed rounded-lg p-4 w-full">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag and drop an image or click to browse</p>
                      <Input 
                        id="productImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => setProductImage(e.target.files?.[0] || null)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById("productImage")?.click()}
                      >
                        Choose File
                      </Button>
                      {productImage && (
                        <p className="text-sm text-gray-500 mt-2">{productImage.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </form>
      </TabsContent>
      
      <TabsContent value="bulk" className="mt-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CSV Bulk Upload</CardTitle>
              <CardDescription>
                Upload a CSV file containing your product data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkUpload}>
                <div className="space-y-4">
                  <div className="border border-dashed rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center py-6">
                      <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-1">Upload your CSV file</h3>
                      <p className="text-sm text-center text-gray-500 mb-4 max-w-md">
                        Drag and drop your CSV file here or click to browse
                      </p>
                      <Input 
                        id="csvUpload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={e => setCsvFile(e.target.files?.[0] || null)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("csvUpload")?.click()}
                      >
                        Select CSV File
                      </Button>
                      {csvFile && (
                        <div className="mt-4 p-3 bg-muted rounded-md flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-blue-500" />
                          <span>{csvFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>CSV Format Requirements</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">
                        Your CSV file must include these columns: name, sku, price, quantity, category.
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          Download Template
                        </Button>
                        <Button variant="link" size="sm" className="text-blue-600">
                          View Instructions
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button type="submit" disabled={!csvFile}>
                    Upload and Process
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Integration Instructions</CardTitle>
              <CardDescription>
                Learn how to export product data from popular eCommerce platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md border">
                  <h4 className="font-medium mb-2">Shopify</h4>
                  <ol className="space-y-2 text-sm text-gray-500 list-decimal list-inside">
                    <li>Go to Products in your Shopify admin</li>
                    <li>Click "Export" at the top of the page</li>
                    <li>Select "All products" and "CSV for Excel, Numbers, or other spreadsheet programs"</li>
                    <li>Click "Export products"</li>
                  </ol>
                </div>
                
                <div className="p-4 rounded-md border">
                  <h4 className="font-medium mb-2">WooCommerce</h4>
                  <ol className="space-y-2 text-sm text-gray-500 list-decimal list-inside">
                    <li>Go to Products in your WordPress admin</li>
                    <li>Click "Export" under WooCommerce</li>
                    <li>Choose "Products" and click "Generate CSV"</li>
                    <li>Download the generated file</li>
                  </ol>
                </div>
                
                <div className="p-4 rounded-md border">
                  <h4 className="font-medium mb-2">Etsy</h4>
                  <ol className="space-y-2 text-sm text-gray-500 list-decimal list-inside">
                    <li>Go to Shop Manager &gt; Listings</li>
                    <li>Click "Download Data" button</li>
                    <li>Select "CSV" format</li>
                    <li>Click "Download"</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AddProduct;
