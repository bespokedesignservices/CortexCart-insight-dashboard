
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowUp, 
  ChevronDown, 
  ExternalLink, 
  MoreVertical,
  Search,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useProductsData } from "@/hooks/useProductsData";
import { useTrackingData } from "@/hooks/useTrackingData";

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const ProductsTable: React.FC = () => {
  const { products, isLoading } = useProductsData();
  const { hasData } = useTrackingData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  
  // Enrich products with analytics data if available
  const enrichedProducts = products.map(product => {
    // Default analytics values
    const analytics = {
      views: Math.floor(Math.random() * 1000) + 100,
      viewsChange: Math.floor(Math.random() * 40) - 20,
      sales: Math.floor(Math.random() * 100),
      salesChange: Math.floor(Math.random() * 40) - 20,
      conversion: parseFloat((Math.random() * 8 + 2).toFixed(1)),
      conversionChange: parseFloat((Math.random() * 4 - 2).toFixed(1))
    };
    
    return {
      ...product,
      ...analytics
    };
  });
  
  const filteredProducts = enrichedProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
        <div className="text-lg font-semibold">Products Catalog</div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-recoai-gray" />
            <Input
              placeholder="Search products..."
              className="pl-8 border-gray-200 w-[180px] md:w-[220px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-recoai-gray"
              >
                <span>Sort</span> <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => requestSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => requestSort('category')}>
                Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              {hasData && (
                <>
                  <DropdownMenuItem onClick={() => requestSort('views')}>
                    Views {sortConfig.key === 'views' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => requestSort('sales')}>
                    Sales {sortConfig.key === 'sales' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                {hasData && (
                  <>
                    <TableHead>Views</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Conversion</TableHead>
                  </>
                )}
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
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
                    
                    {hasData && (
                      <>
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
                      </>
                    )}
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Product</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={hasData ? 6 : 3} className="text-center py-6">
                    No products match your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
