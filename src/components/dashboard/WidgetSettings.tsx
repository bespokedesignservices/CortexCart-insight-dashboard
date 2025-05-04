
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WidgetSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    dataCollection: {
      trackClicks: true,
      trackPageViews: true,
      trackCartActivity: true,
      trackCartAbandonment: true,
      trackPromoCodeUsage: true,
    },
    recommendations: {
      enabled: true,
      placement: "product",
      algorithm: "personalized",
    },
    appearance: {
      themeColor: "brand",
      showLogo: true,
    },
    planLevel: "basic", // This would come from user account data
  });
  
  const handleTrackingToggle = (feature: keyof typeof settings.dataCollection, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      dataCollection: {
        ...prev.dataCollection,
        [feature]: checked
      }
    }));
    
    toast({
      title: checked ? `${featureNames[feature]} tracking enabled` : `${featureNames[feature]} tracking disabled`,
      description: `Widget settings updated successfully.`,
    });
  };
  
  const handleRecommendationsToggle = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        enabled: checked
      }
    }));
    
    toast({
      title: checked ? "Product recommendations enabled" : "Product recommendations disabled",
      description: "Widget settings updated successfully.",
    });
  };
  
  const handleRecommendationChange = (field: keyof typeof settings.recommendations, value: string) => {
    setSettings(prev => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        [field]: value
      }
    }));
  };
  
  const handleAppearanceChange = (field: keyof typeof settings.appearance, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, we'd save these settings to a user's profile
    toast({
      title: "Settings saved",
      description: "Your widget customization settings have been saved.",
    });
  };
  
  const handleLogoToggle = (checked: boolean) => {
    if (!checked && settings.planLevel === 'basic') {
      toast({
        title: "Upgrade required",
        description: "You need to upgrade to PRO or GROWTH plan to remove the RecoAI logo.",
        variant: "destructive"
      });
      return;
    }
    
    handleAppearanceChange('showLogo', checked);
  };
  
  const handleReset = () => {
    setSettings({
      dataCollection: {
        trackClicks: true,
        trackPageViews: true,
        trackCartActivity: true,
        trackCartAbandonment: true,
        trackPromoCodeUsage: true,
      },
      recommendations: {
        enabled: true,
        placement: "product",
        algorithm: "personalized",
      },
      appearance: {
        themeColor: "brand",
        showLogo: true,
      },
      planLevel: "basic",
    });
    
    toast({
      title: "Settings reset",
      description: "Widget settings have been reset to defaults.",
    });
  };
  
  const featureNames: Record<string, string> = {
    trackClicks: "Click events",
    trackPageViews: "Page views",
    trackCartActivity: "Cart activity",
    trackCartAbandonment: "Cart abandonment",
    trackPromoCodeUsage: "Promo code usage"
  };
  
  const placementTooltips: Record<string, string> = {
    product: "Show recommendations on product pages for related items",
    cart: "Display recommendations in the shopping cart to increase order value",
    homepage: "Feature recommendations on your homepage based on trends",
    all: "Show relevant recommendations across your entire website"
  };
  
  const algorithmTooltips: Record<string, string> = {
    personalized: "Tailored to each visitor's browsing and purchase history",
    popular: "Shows most frequently purchased items",
    similar: "Recommends products that are similar to what the user is viewing",
    trending: "Highlights products gaining popularity"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Widget Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Data Collection</h3>
          {Object.entries(settings.dataCollection).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label htmlFor={key} className="text-sm font-medium">
                  {featureNames[key]}
                </Label>
                <p className="text-sm text-recoai-gray">
                  {key === 'trackClicks' && "Record when users click on elements"}
                  {key === 'trackPageViews' && "Record when users view pages"}
                  {key === 'trackCartActivity' && "Record add to cart and checkout events"}
                  {key === 'trackCartAbandonment' && "Track when users leave with items in cart"}
                  {key === 'trackPromoCodeUsage' && "Track discount and promo code usage"}
                </p>
              </div>
              <Switch 
                id={key} 
                checked={value} 
                onCheckedChange={(checked) => handleTrackingToggle(key as keyof typeof settings.dataCollection, checked)} 
              />
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Recommendations</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-reco" className="text-sm font-medium">
                Enable Product Recommendations
              </Label>
              <p className="text-sm text-recoai-gray">Show personalized product suggestions</p>
            </div>
            <Switch 
              id="enable-reco" 
              checked={settings.recommendations.enabled}
              onCheckedChange={handleRecommendationsToggle}
            />
          </div>
          
          {settings.recommendations.enabled && (
            <>
              <div className="grid gap-3">
                <TooltipProvider>
                  <Label htmlFor="reco-placement" className="text-sm font-medium">
                    Placement
                  </Label>
                  <Select 
                    value={settings.recommendations.placement} 
                    onValueChange={(value) => handleRecommendationChange('placement', value)}
                  >
                    <SelectTrigger id="reco-placement">
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(placementTooltips).map(([value, tooltip]) => (
                        <Tooltip key={value}>
                          <TooltipTrigger asChild>
                            <SelectItem value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)} pages
                            </SelectItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipProvider>
              </div>
              
              <div className="grid gap-3">
                <TooltipProvider>
                  <Label htmlFor="reco-algorithm" className="text-sm font-medium">
                    Recommendation Algorithm
                  </Label>
                  <Select 
                    value={settings.recommendations.algorithm} 
                    onValueChange={(value) => handleRecommendationChange('algorithm', value)}
                  >
                    <SelectTrigger id="reco-algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(algorithmTooltips).map(([value, tooltip]) => (
                        <Tooltip key={value}>
                          <TooltipTrigger asChild>
                            <SelectItem value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </SelectItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipProvider>
              </div>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Appearance</h3>
          <div className="grid gap-3">
            <Label htmlFor="theme-color" className="text-sm font-medium">
              Theme Color
            </Label>
            <Select 
              value={settings.appearance.themeColor} 
              onValueChange={(value) => handleAppearanceChange('themeColor', value)}
            >
              <SelectTrigger id="theme-color">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Match Brand Colors</SelectItem>
                <SelectItem value="light">Light Theme</SelectItem>
                <SelectItem value="dark">Dark Theme</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-logo" className="text-sm font-medium flex items-center">
                Show RecoAI Logo
                {settings.planLevel === 'basic' && (
                  <Badge variant="outline" className="ml-2 text-xs">PRO FEATURE</Badge>
                )}
              </Label>
              <p className="text-sm text-recoai-gray">Display "Powered by RecoAI" logo</p>
            </div>
            <Switch 
              id="show-logo" 
              checked={settings.appearance.showLogo}
              onCheckedChange={handleLogoToggle}
              disabled={!settings.appearance.showLogo && settings.planLevel === 'basic'}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button variant="outline" onClick={handleReset} className="border-gray-200">
            Reset to Defaults
          </Button>
          <Button 
            className="bg-recoai-purple hover:bg-recoai-purple/90"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetSettings;
