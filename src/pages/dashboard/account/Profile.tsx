
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const interestsOptions = [
  "Marketing",
  "Sales",
  "Customer Service",
  "Order Management",
  "Product Development",
  "Tech Support",
];

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  telephone: z.string().min(7, "Telephone must be at least 7 characters"),
  email: z.string().email("Invalid email address"),
  interests: z.array(z.enum(interestsOptions)).optional(),
  profileDescription: z.string().optional(),
  profileImage: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Max file size is 5MB"
    ),
});

type FormData = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      address: "",
      telephone: "",
      email: "",
      interests: [],
      profileDescription: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({ title: "Profile updated successfully." });
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Complete Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="telephone" render={({ field }) => (
            <FormItem>
              <FormLabel>Telephone</FormLabel>
              <FormControl>
                <Input placeholder="Telephone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="profileImage" render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="block w-full cursor-pointer rounded border border-input bg-background px-3 py-2 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="profileDescription" render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Description / Interests</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your interests or answer relevant questions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormLabel>Areas of Interest</FormLabel>
          <div className="mb-4 space-y-1 px-1">
            {interestsOptions.map((interest) => (
              <FormField
                key={interest}
                control={form.control}
                name="interests"
                render={({ field }) => {
                  const checked = field.value?.includes(interest);
                  return (
                    <FormItem key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked) => {
                          let newValue = field.value || [];
                          if (checked) {
                            newValue = [...newValue, interest];
                          } else {
                            newValue = newValue.filter((val) => val !== interest);
                          }
                          field.onChange(newValue);
                        }}
                      />
                      <FormLabel className="select-none">{interest}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <Button type="submit" className="mt-4">Save Profile</Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;

