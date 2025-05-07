
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define schema
const manualDataSchema = z.object({
  currentSales: z.string().min(1, "Sales value is required"),
  totalProducts: z.string().min(1, "Products count is required"),
  activeCustomers: z.string().min(1, "Customer count is required"),
  startDate: z.string().min(1, "Start date is required"),
});

type ManualDataFormValues = z.infer<typeof manualDataSchema>;

const ManualDataTab: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ManualDataFormValues>({
    resolver: zodResolver(manualDataSchema),
    defaultValues: {
      currentSales: "",
      totalProducts: "",
      activeCustomers: "",
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const handleManualDataSubmit = (data: ManualDataFormValues) => {
    console.log("Submitting manual data:", data);
    toast({
      title: "Data saved",
      description: "Your initial data has been saved and will be used as a starting point.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Manual Data Entry</CardTitle>
        <CardDescription>
          Enter your current metrics as a starting point for RecoAI's tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleManualDataSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentSales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Monthly Sales</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 5000" />
                  </FormControl>
                  <FormDescription>
                    Enter your total sales amount for the last month.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="totalProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Products</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 120" />
                  </FormControl>
                  <FormDescription>
                    The total number of products in your catalog.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="activeCustomers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Customers</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 250" />
                  </FormControl>
                  <FormDescription>
                    The number of active customers in the past month.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormDescription>
                    The date from which you want to start tracking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Initial Data</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ManualDataTab;
