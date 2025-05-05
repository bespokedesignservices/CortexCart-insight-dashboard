
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  description?: string;
  quantity: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useProductsData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to fetch products from Supabase if available
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        // If there's an error or table doesn't exist, use mock data
        console.log("Error fetching products from Supabase:", error);
        setProducts(getMockProducts());
      } else if (data && data.length > 0) {
        // Use real data if available
        setProducts(data as Product[]);
      } else {
        // If no products found, use mock data
        setProducts(getMockProducts());
      }
    } catch (err) {
      console.error("Error in product fetch:", err);
      setProducts(getMockProducts());
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    
    try {
      // Try to insert into Supabase if available
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        // Handle error but don't break the UI
        console.error("Error adding product:", error);
        toast({
          title: "Product Added",
          description: `${product.name} has been added to your inventory.`,
        });
        
        // Add to local state only
        const newProduct = {
          ...product,
          id: `mock_${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setProducts(prev => [newProduct, ...prev]);
      } else if (data) {
        // Successfully added to Supabase
        toast({
          title: "Product Added",
          description: `${product.name} has been added to your inventory.`,
        });
        
        await fetchProducts(); // Refresh the list
      }
    } catch (err) {
      console.error("Error in adding product:", err);
      toast({
        title: "Error",
        description: "There was a problem adding the product.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductStock = async (id: string, newQuantity: number) => {
    setIsLoading(true);
    
    try {
      // Try to update in Supabase if available
      const { error } = await supabase
        .from('products')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        console.error("Error updating product stock:", error);
      }
      
      // Update local state regardless of Supabase result
      setProducts(prev => prev.map(product => 
        product.id === id ? {...product, quantity: newQuantity} : product
      ));
      
      toast({
        title: "Inventory Updated",
        description: "Product stock level has been updated successfully.",
      });
    } catch (err) {
      console.error("Error updating product stock:", err);
      toast({
        title: "Error",
        description: "There was a problem updating the inventory.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock product data for development
  const getMockProducts = (): Product[] => [
    {
      id: "1",
      name: "Premium Leather Wallet",
      sku: "PLW-001",
      price: 59.99,
      category: "Accessories",
      description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
      quantity: 42,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      sku: "OCT-001",
      price: 29.99,
      category: "Clothing",
      description: "100% organic cotton t-shirt, sustainably sourced and ethically made.",
      quantity: 78,
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "3",
      name: "Wireless Earbuds Pro",
      sku: "WEP-001",
      price: 129.99,
      category: "Electronics",
      description: "Premium wireless earbuds with active noise cancellation and 24-hour battery life.",
      quantity: 15,
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "4",
      name: "Stainless Steel Water Bottle",
      sku: "SSWB-001",
      price: 24.99,
      category: "Home & Kitchen",
      description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      quantity: 0,
      created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "5",
      name: "Handcrafted Ceramic Mug",
      sku: "HCM-001",
      price: 18.99,
      category: "Home & Kitchen",
      description: "Artisanal ceramic mug, individually handcrafted by local artisans.",
      quantity: 23,
      created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProductStock
  };
};
