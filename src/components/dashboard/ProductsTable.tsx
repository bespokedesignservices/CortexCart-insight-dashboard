
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowUp, 
  ChevronDown, 
  ExternalLink, 
  MoreVertical,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  views: number;
  viewsChange: number;
  sales: number;
  salesChange: number;
  conversion: number;
  conversionChange: number;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Wallet",
    category: "Accessories",
    price: 59.99,
    views: 1245,
    viewsChange: 12,
    sales: 78,
    salesChange: 23,
    conversion: 6.3,
    conversionChange: 1.2,
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    views: 2187,
    viewsChange: 8,
    sales: 143,
    salesChange: 5,
    conversion: 6.5,
    conversionChange: -0.8,
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 129.99,
    views: 3498,
    viewsChange: 35,
    sales: 215,
    salesChange: 42,
    conversion: 6.1,
    conversionChange: 0.7,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: 24.99,
    views: 1876,
    viewsChange: -5,
    sales: 98,
    salesChange: -12,
    conversion: 5.2,
    conversionChange: -1.5,
  },
  {
    id: "5",
    name: "Handcrafted Ceramic Mug",
    category: "Home & Kitchen",
    price: 18.99,
    views: 956,
    viewsChange: 3,
    sales: 67,
    salesChange: 9,
    conversion: 7.0,
    conversionChange: 0.5,
  },
];

const ProductsTable: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-recoai-gray" />
            <Input
              placeholder="Search products..."
              className="pl-8 border-gray-200 w-[180px] md:w-[220px]"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-recoai-gray"
          >
            <span>Sort</span> <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-recoai-darkGray">{product.name}</div>
                      <div className="text-sm text-recoai-gray">
                        <Badge variant="outline" className="bg-gray-50">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{product.views.toLocaleString()}</span>
                      <span className="flex items-center text-xs mt-1">
                        {product.viewsChange > 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={
                            product.viewsChange > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {Math.abs(product.viewsChange)}%
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{product.sales}</span>
                      <span className="flex items-center text-xs mt-1">
                        {product.salesChange > 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={
                            product.salesChange > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {Math.abs(product.salesChange)}%
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{product.conversion.toFixed(1)}%</span>
                      <span className="flex items-center text-xs mt-1">
                        {product.conversionChange > 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={
                            product.conversionChange > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {Math.abs(product.conversionChange)}%
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
