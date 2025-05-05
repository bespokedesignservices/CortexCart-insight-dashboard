
import React from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for the product performance chart
const productPerformanceData = [
  { name: "Premium Leather Wallet", sales: 78, returns: 5, damages: 2 },
  { name: "Organic Cotton T-Shirt", sales: 143, returns: 12, damages: 3 },
  { name: "Wireless Earbuds Pro", sales: 215, returns: 18, damages: 7 },
  { name: "Stainless Steel Water Bottle", sales: 98, returns: 6, damages: 4 },
  { name: "Handcrafted Ceramic Mug", sales: 67, returns: 3, damages: 1 },
];

// Mock data for underperforming products
const underperformingProducts = [
  { id: "p1", name: "Stainless Steel Water Bottle", salesLoss: "15%", returnRate: "6.1%" },
  { id: "p2", name: "Designer Backpack", salesLoss: "12%", returnRate: "8.4%" },
  { id: "p3", name: "Bluetooth Speaker", salesLoss: "9%", returnRate: "7.2%" },
];

const ProductAnalytics: React.FC = () => {
  const hasData = productPerformanceData.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={productPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#10b981" name="Sales" />
                  <Bar dataKey="returns" fill="#f59e0b" name="Returns" />
                  <Bar dataKey="damages" fill="#ef4444" name="Damages" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No product performance data available</h3>
                <p className="text-gray-500 max-w-md">
                  Add the tracking widget to your site to collect product performance data and gain valuable insights.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Underperforming Products</CardTitle>
          </CardHeader>
          <CardContent>
            {underperformingProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2 pl-0">Product</th>
                      <th className="text-left font-medium p-2">Sales Loss</th>
                      <th className="text-left font-medium p-2">Return Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {underperformingProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 pl-0">
                          <span className="font-medium">{product.name}</span>
                        </td>
                        <td className="text-red-600">{product.salesLoss}</td>
                        <td>{product.returnRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No underperforming products detected</h3>
                <p className="text-gray-500 max-w-md">
                  We'll analyze your sales and returns data to identify underperforming products once more data is collected.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Product analysis is based on sales, returns, and damage data. Install the tracking widget to improve insights.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProductAnalytics;
