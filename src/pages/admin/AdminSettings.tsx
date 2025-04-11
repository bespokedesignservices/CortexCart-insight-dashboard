
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, Globe, Database, Paintbrush, Shield, CreditCard } from "lucide-react";

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState("RecoAI");
  const [siteDescription, setSiteDescription] = useState("AI-powered e-commerce insights");
  const [siteURL, setSiteURL] = useState("https://recoai.com");
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Settings</h2>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Paintbrush className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="mr-2 h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's basic information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="site-name" className="text-sm font-medium">
                  Site Name
                </label>
                <Input 
                  id="site-name" 
                  value={siteName} 
                  onChange={(e) => setSiteName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="site-description" className="text-sm font-medium">
                  Site Description
                </label>
                <Input 
                  id="site-description" 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="site-url" className="text-sm font-medium">
                  Site URL
                </label>
                <Input 
                  id="site-url" 
                  value={siteURL} 
                  onChange={(e) => setSiteURL(e.target.value)} 
                />
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <label htmlFor="maintenance-mode" className="text-sm font-medium cursor-pointer">
                  Enable Maintenance Mode
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="allow-signups" defaultChecked />
                <label htmlFor="allow-signups" className="text-sm font-medium cursor-pointer">
                  Allow New User Registrations
                </label>
              </div>
              <Button onClick={handleSaveGeneral} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how your website looks.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Appearance settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>Manage your database configuration.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Database settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your subscription and payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Billing settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
