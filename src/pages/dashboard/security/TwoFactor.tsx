
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, Smartphone } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type FormData = {
  twoFactorEnabled: boolean;
  preferredMethod: "app" | "sms" | "email";
  phoneNumber?: string;
};

const TwoFactor: React.FC = () => {
  const form = useForm<FormData>({
    defaultValues: {
      twoFactorEnabled: false,
      preferredMethod: "app",
    },
  });
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({
      title: "Two-factor authentication settings saved.",
      description: values.twoFactorEnabled 
        ? `Two-factor authentication enabled using ${values.preferredMethod}.` 
        : "Two-factor authentication disabled.",
    });
  };

  const watchTwoFactorEnabled = form.watch("twoFactorEnabled");
  const watchPreferredMethod = form.watch("preferredMethod");

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Setup Two-Factor Authentication</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-recoai-purple" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by requiring more than just a password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <FormField control={form.control} name="twoFactorEnabled" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base mb-0">Enable Two-Factor Authentication</FormLabel>
                    <FormDescription>
                      When you log in you will need to provide a code from your authentication app, SMS, or email.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
              
              {watchTwoFactorEnabled && (
                <div className="mt-6 space-y-6">
                  <FormField control={form.control} name="preferredMethod" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Authentication Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="app" id="app" />
                            <Label htmlFor="app" className="flex items-center gap-3 font-normal">
                              <Shield className="h-5 w-5" />
                              <div className="space-y-1">
                                <p>Authentication App</p>
                                <p className="text-sm text-muted-foreground">
                                  Use an app like Google Authenticator or Authy
                                </p>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="sms" id="sms" />
                            <Label htmlFor="sms" className="flex items-center gap-3 font-normal">
                              <Smartphone className="h-5 w-5" />
                              <div className="space-y-1">
                                <p>SMS</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive a code via text message
                                </p>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email" className="flex items-center gap-3 font-normal">
                              <Mail className="h-5 w-5" />
                              <div className="space-y-1">
                                <p>Email</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive a code via email
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />
                  
                  {watchPreferredMethod === "sms" && (
                    <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 555 123 4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your phone number to receive verification codes.
                        </FormDescription>
                      </FormItem>
                    )} />
                  )}
                </div>
              )}
              
              <Button className="mt-6" type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactor;
