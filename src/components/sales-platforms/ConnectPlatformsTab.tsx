
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PlatformGrid from "./PlatformGrid";
import TrackingCodeDisplay from "./TrackingCodeDisplay";
import { platformDetails } from "@/utils/platformDetails";

interface ConnectPlatformsTabProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ConnectPlatformsTab: React.FC<ConnectPlatformsTabProps> = ({ formData, handleInputChange }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const { toast } = useToast();
  
  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Connect Your Sales Platform</CardTitle>
        <CardDescription>
          Select your e-commerce platform to get customized installation instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlatformGrid 
          selectedPlatform={selectedPlatform}
          onPlatformSelect={handlePlatformSelect}
        />

        {selectedPlatform && (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-medium">
              {platformDetails[selectedPlatform as keyof typeof platformDetails].name} Integration
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="platformUrl">Store URL</Label>
                <Input 
                  id="platformUrl" 
                  name="platformUrl" 
                  placeholder={`Enter your ${platformDetails[selectedPlatform as keyof typeof platformDetails].name} store URL`}
                  value={formData.platformUrl}
                  onChange={handleInputChange}
                />
              </div>
              
              {selectedPlatform !== 'custom' && (
                <div>
                  <Label htmlFor="apiKey">API Key/Secret (optional)</Label>
                  <Input 
                    id="apiKey" 
                    name="apiKey" 
                    placeholder="For advanced integrations"
                    value={formData.apiKey}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This is optional and only needed for certain features
                  </p>
                </div>
              )}
              
              <div>
                <Label htmlFor="storeId">Store Identifier</Label>
                <Input 
                  id="storeId" 
                  name="storeId" 
                  placeholder="A unique identifier for this store"
                  value={formData.storeId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <TrackingCodeDisplay 
              platform={platformDetails[selectedPlatform as keyof typeof platformDetails]} 
              storeId={formData.storeId}
              selectedPlatformId={selectedPlatform}
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={() => {
                  toast({
                    title: "Platform connected",
                    description: "Your sales platform has been successfully connected.",
                  });
                }}
              >
                Save Connection
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectPlatformsTab;
