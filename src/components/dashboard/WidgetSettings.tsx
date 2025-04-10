
import React from "react";
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

const WidgetSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Widget Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Data Collection</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="track-clicks" className="text-sm font-medium">
                Track Click Events
              </Label>
              <p className="text-sm text-recoai-gray">Record when users click on elements</p>
            </div>
            <Switch id="track-clicks" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="track-views" className="text-sm font-medium">
                Track Page Views
              </Label>
              <p className="text-sm text-recoai-gray">Record when users view pages</p>
            </div>
            <Switch id="track-views" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="track-cart" className="text-sm font-medium">
                Track Cart Activity
              </Label>
              <p className="text-sm text-recoai-gray">Record add to cart and checkout events</p>
            </div>
            <Switch id="track-cart" defaultChecked />
          </div>
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
            <Switch id="enable-reco" defaultChecked />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="reco-placement" className="text-sm font-medium">
              Placement
            </Label>
            <Select defaultValue="product">
              <SelectTrigger id="reco-placement">
                <SelectValue placeholder="Select placement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product pages</SelectItem>
                <SelectItem value="cart">Cart page</SelectItem>
                <SelectItem value="homepage">Homepage</SelectItem>
                <SelectItem value="all">All pages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="reco-algorithm" className="text-sm font-medium">
              Recommendation Algorithm
            </Label>
            <Select defaultValue="personalized">
              <SelectTrigger id="reco-algorithm">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personalized">Personalized</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="similar">Similar Products</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Appearance</h3>
          <div className="grid gap-3">
            <Label htmlFor="theme-color" className="text-sm font-medium">
              Theme Color
            </Label>
            <Select defaultValue="brand">
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
              <Label htmlFor="show-logo" className="text-sm font-medium">
                Show RecoAI Logo
              </Label>
              <p className="text-sm text-recoai-gray">Display "Powered by RecoAI" logo</p>
            </div>
            <Switch id="show-logo" defaultChecked />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button variant="outline" className="border-gray-200">
            Reset to Defaults
          </Button>
          <Button className="bg-recoai-purple hover:bg-recoai-purple/90">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetSettings;
