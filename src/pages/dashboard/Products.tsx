
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Products: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-recoai-gray">Manage your product inventory.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Product Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Your product catalog will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Inventory management tools will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Product Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Product performance metrics will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Tools to add new products will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
