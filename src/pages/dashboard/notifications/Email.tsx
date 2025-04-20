
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

type FormData = {
  emailNotifications: boolean;
  salesEmails: boolean;
  specialOffers: boolean;
  newFeatures: boolean;
};

const EmailNotifications: React.FC = () => {
  const form = useForm<FormData>({
    defaultValues: {
      emailNotifications: true,
      salesEmails: false,
      specialOffers: false,
      newFeatures: false,
    },
  });
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({title: "Email notification preferences saved."});
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Email Notifications</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField control={form.control} name="emailNotifications" render={({ field }) => (
            <FormItem className="flex items-center space-x-4">
              <FormLabel className="mb-0">Enable Email Notifications</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />
          {form.watch("emailNotifications") && (
            <div className="ml-6 space-y-2 mt-2">
              <FormField control={form.control} name="salesEmails" render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <FormLabel className="mb-0">I am happy to receive: Sales Emails</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="specialOffers" render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <FormLabel className="mb-0">Special Offers</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="newFeatures" render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <FormLabel className="mb-0">New Features</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
          )}
          <Button className="mt-4" type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailNotifications;

