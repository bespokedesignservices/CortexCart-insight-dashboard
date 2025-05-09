
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Bot, MessageSquare, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAISettings: React.FC = () => {
  const { toast } = useToast();
  const [defaultPrompt, setDefaultPrompt] = useState(
    "You are an AI assistant for an e-commerce platform called RecoAI. You help users with product recommendations, answer questions about the platform, and provide insights about their store data. Keep responses concise and helpful."
  );
  const [aiEnabled, setAiEnabled] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your AI settings have been updated successfully.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">AI Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="prompts">System Prompts</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                General AI Settings
              </CardTitle>
              <CardDescription>
                Configure general settings for the AI features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Enable AI Features</h3>
                  <p className="text-sm text-recoai-gray">
                    Turn on/off all AI features across the platform
                  </p>
                </div>
                <Switch 
                  checked={aiEnabled} 
                  onCheckedChange={setAiEnabled} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <p className="text-sm text-recoai-gray mb-2">
                  Your API key is securely stored and not visible here. You can update it if needed.
                </p>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="••••••••••••••••••••••"
                    className="flex-grow"
                  />
                  <Button variant="outline">Update Key</Button>
                </div>
                <p className="text-xs text-recoai-gray mt-1">
                  Last updated: May 9, 2025
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="token-limit">Monthly Token Limit</Label>
                <Input
                  id="token-limit"
                  type="number"
                  defaultValue={100000}
                />
                <p className="text-xs text-recoai-gray">
                  Set a monthly limit on API tokens to control costs
                </p>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                System Prompts
              </CardTitle>
              <CardDescription>
                Configure the system prompts used for different AI features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-prompt">Default Assistant Prompt</Label>
                <Textarea
                  id="default-prompt"
                  value={defaultPrompt}
                  onChange={(e) => setDefaultPrompt(e.target.value)}
                  className="min-h-[150px]"
                />
                <p className="text-xs text-recoai-gray">
                  This prompt defines the behavior of the AI assistant throughout the application
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-prompt">Product Description Prompt</Label>
                <Textarea
                  id="product-prompt"
                  defaultValue="Generate a compelling product description for an e-commerce product. Focus on benefits, features, and persuasive language. Keep it concise but detailed."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Prompts</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                AI Models
              </CardTitle>
              <CardDescription>
                Configure which AI models to use for different features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Chat Assistant</Label>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <input type="radio" id="gpt-4o-mini" name="chat-model" defaultChecked />
                    <Label htmlFor="gpt-4o-mini" className="ml-2 cursor-pointer">
                      gpt-4o-mini (Default)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <input type="radio" id="gpt-4o" name="chat-model" />
                    <Label htmlFor="gpt-4o" className="ml-2 cursor-pointer">
                      gpt-4o (Higher quality)
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Product Descriptions</Label>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <input type="radio" id="prod-gpt-4o-mini" name="prod-model" defaultChecked />
                    <Label htmlFor="prod-gpt-4o-mini" className="ml-2 cursor-pointer">
                      gpt-4o-mini (Default)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <input type="radio" id="prod-gpt-4o" name="prod-model" />
                    <Label htmlFor="prod-gpt-4o" className="ml-2 cursor-pointer">
                      gpt-4o (Higher quality)
                    </Label>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Model Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAISettings;
