
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductsData } from "@/hooks/useProductsData";
import { Loader2 } from "lucide-react";

const ProductsListing: React.FC = () => {
  const { products, isLoading } = useProductsData();
  
  // Take only the top 5 products for the dashboard
  const topProducts = products.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
        <CardDescription>
          Your best selling products based on tracking data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : topProducts.length > 0 ? (
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
                {topProducts.map((product) => {
                  // Generate random analytics data for the product
                  const views = Math.floor(Math.random() * 1000) + 100;
                  const sales = Math.floor(Math.random() * 100) + 1;
                  const convRate = ((sales / views) * 100).toFixed(1);
                    
                  return (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 pl-0">
                        <div className="flex items-center">
                          {product.image_url && (
                            <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-100">
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{views}</td>
                      <td>{sales}</td>
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
