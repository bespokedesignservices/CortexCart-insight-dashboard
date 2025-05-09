
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAI } from "@/hooks/useAI";
import { Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AIProductHelper: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const { isLoading, generateProductDescription } = useAI();

  const handleGenerateDescription = async () => {
    if (!productName || !keywords) return;
    
    const keywordsList = keywords.split(",").map(k => k.trim()).filter(k => k);
    const result = await generateProductDescription(productName, keywordsList);
    
    if (result?.response) {
      setDescription(result.response);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-recoai-purple" />
          AI Product Description Generator
        </CardTitle>
        <CardDescription>
          Generate compelling product descriptions for your e-commerce store
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product-name">Product Name</Label>
          <Input
            id="product-name"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (comma separated)</Label>
          <Input
            id="keywords"
            placeholder="premium, durable, handmade"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleGenerateDescription} 
          disabled={isLoading || !productName || !keywords}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Description
            </>
          )}
        </Button>
        
        {description && (
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Generated Description</Label>
              <Badge variant="outline" className="text-xs">AI Generated</Badge>
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        )}
      </CardContent>
      {description && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
