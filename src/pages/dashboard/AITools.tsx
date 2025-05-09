
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIChat } from "@/components/ai/AIChat";
import { AIProductHelper } from "@/components/ai/AIProductHelper";
import { AIDataAnalyzer } from "@/components/ai/AIDataAnalyzer";
import { Bot, FileStack, MessageSquare, Sparkles } from "lucide-react";

const AITools: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-recoai-gray">Use AI to boost your e-commerce business</p>
      </div>

      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="assistant" className="flex-1 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="product-tools" className="flex-1 flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Product Tools
          </TabsTrigger>
          <TabsTrigger value="data-analysis" className="flex-1 flex items-center justify-center">
            <FileStack className="h-4 w-4 mr-2" />
            Data Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assistant" className="mt-6">
          <AIChat />
        </TabsContent>
        
        <TabsContent value="product-tools" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AIProductHelper />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-recoai-teal" />
                  Product Features
                </CardTitle>
                <CardDescription>
                  Coming soon: AI-generated product features and specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[300px] text-recoai-gray">
                  <Bot className="h-10 w-10 mb-4 opacity-50" />
                  <p>This feature will be available soon!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="data-analysis" className="mt-6">
          <AIDataAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITools;
