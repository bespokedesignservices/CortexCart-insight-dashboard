
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTable from "@/components/dashboard/ProductsTable";
import ProductAnalytics from "@/components/dashboard/ProductAnalytics";
import AddProduct from "@/components/dashboard/AddProduct";
import InventoryManagement from "@/components/dashboard/InventoryManagement";
import StockTake from "@/components/dashboard/StockTake";

const Products: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="product-list" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="product-list">Products List</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="stock-take">Stock Take</TabsTrigger>
          <TabsTrigger value="product-analytics">Product Analysis</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product-list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Products Catalog</CardTitle>
              <CardDescription>
                View and manage all your products in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Inventory Management</CardTitle>
              <CardDescription>
                Add, edit or update inventory levels for your products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stock-take" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Stock Take</CardTitle>
              <CardDescription>
                Complete inventory checks and reconcile physical stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StockTake />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="product-analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Product Analytics</CardTitle>
              <CardDescription>
                Get insights into product performance, returns and damages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add-product" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Add New Product</CardTitle>
              <CardDescription>
                Add products individually or bulk upload via CSV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddProduct />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
