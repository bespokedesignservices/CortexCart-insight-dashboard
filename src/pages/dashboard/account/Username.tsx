
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const usernameSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric (no special characters)"),
});

type FormData = z.infer<typeof usernameSchema>;

const Username: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: "" },
  });
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({ title: "Username changed successfully.", description: `New username: ${values.username}` });
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Change Username</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter new username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      </Form>
    </div>
  );
}

export default Username;
