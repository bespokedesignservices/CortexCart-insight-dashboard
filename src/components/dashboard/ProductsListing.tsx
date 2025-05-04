
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: string;
  sales: number;
  views: number;
  image?: string;
}

interface ProductsListingProps {
  products: Product[];
}

const ProductsListing: React.FC<ProductsListingProps> = ({ products }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
        <CardDescription>
          Your best selling products based on tracking data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2 pl-0">Product</th>
                  <th className="text-left font-medium p-2">Price</th>
                  <th className="text-left font-medium p-2">Views</th>
                  <th className="text-left font-medium p-2">Sales</th>
                  <th className="text-left font-medium p-2">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const convRate = product.views > 0 
                    ? ((product.sales / product.views) * 100).toFixed(1) 
                    : "0.0";
                    
                  return (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 pl-0">
                        <div className="flex items-center">
                          {product.image && (
                            <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-100">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.views}</td>
                      <td>{product.sales}</td>
                      <td>{convRate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No product data available yet. Add the tracking widget to collect product performance data.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsListing;
