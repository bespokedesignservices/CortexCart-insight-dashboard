
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

type FormData = {
  pushNotifications: boolean;
};

const PushNotifications: React.FC = () => {
  const form = useForm<FormData>({ defaultValues: { pushNotifications: true } });
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({ title: "Push notification preference saved.", description: values.pushNotifications ? "Push notifications are ON" : "Push notifications are OFF" });
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Push Notifications</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField control={form.control} name="pushNotifications" render={({ field }) => (
            <FormItem className="flex items-center space-x-4">
              <FormLabel className="mb-0">Enable Push Notifications</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />
          <Button className="mt-4" type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default PushNotifications;

