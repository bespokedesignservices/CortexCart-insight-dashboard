
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const SalesPlatforms: React.FC = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    currentSales: "",
    salesGoal: "",
    timeframe: "6_months",
    platforms: {
      own_website: false,
      amazon: false,
      ebay: false,
      etsy: false,
      walmart: false,
      facebook: false,
      instagram: false,
      tiktok: false,
      other: false
    },
    otherPlatforms: "",
    challenges: "",
    primaryGoal: "increase_sales"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (platform: string, checked: boolean) => {
    setFormData({
      ...formData,
      platforms: {
        ...formData.platforms,
        [platform]: checked
      }
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd save this data
    console.log("Submitting sales platform data:", formData);
    setCompleted(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Sales Platforms Overview</h1>
      
      {!completed ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sales Platform Setup</CardTitle>
            <CardDescription>
              Let's configure your sales platforms to optimize your analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Current Sales Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentSales">What are your current monthly sales?</Label>
                    <Input 
                      id="currentSales" 
                      name="currentSales" 
                      placeholder="e.g. $5,000" 
                      value={formData.currentSales}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salesGoal">What is your sales goal?</Label>
                    <Input 
                      id="salesGoal" 
                      name="salesGoal" 
                      placeholder="e.g. $10,000" 
                      value={formData.salesGoal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe to achieve this goal</Label>
                    <Select 
                      name="timeframe" 
                      value={formData.timeframe} 
                      onValueChange={(value) => handleSelectChange("timeframe", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3_months">3 months</SelectItem>
                        <SelectItem value="6_months">6 months</SelectItem>
                        <SelectItem value="1_year">1 year</SelectItem>
                        <SelectItem value="2_years">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={handleNext}>Next</Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Sales Platforms</h2>
                  <p className="text-sm text-gray-500">Which platforms do you currently sell on?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(formData.platforms).map(([platform, checked]) => (
                      platform !== 'other' && (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox 
                            id={platform} 
                            checked={checked}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(platform, checked === true)
                            }
                          />
                          <Label 
                            htmlFor={platform}
                            className="capitalize"
                          >
                            {platform.replace('_', ' ')}
                          </Label>
                        </div>
                      )
                    ))}
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="other" 
                        checked={formData.platforms.other}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('other', checked === true)
                        }
                      />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                  
                  {formData.platforms.other && (
                    <div className="space-y-2">
                      <Label htmlFor="otherPlatforms">Please specify</Label>
                      <Input 
                        id="otherPlatforms" 
                        name="otherPlatforms" 
                        placeholder="Enter other platforms" 
                        value={formData.otherPlatforms}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevious}>Previous</Button>
                    <Button type="button" onClick={handleNext}>Next</Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Goals & Challenges</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryGoal">What's your primary goal?</Label>
                    <Select 
                      name="primaryGoal" 
                      value={formData.primaryGoal} 
                      onValueChange={(value) => handleSelectChange("primaryGoal", value)}
                    >
                      <SelectTrigger id="primaryGoal">
                        <SelectValue placeholder="Select your primary goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increase_sales">Increase sales</SelectItem>
                        <SelectItem value="reach_new_customers">Reach new customers</SelectItem>
                        <SelectItem value="improve_conversion_rate">Improve conversion rate</SelectItem>
                        <SelectItem value="reduce_costs">Reduce operational costs</SelectItem>
                        <SelectItem value="expand_to_new_platforms">Expand to new platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="challenges">What challenges are you facing with your current sales platforms?</Label>
                    <Textarea 
                      id="challenges" 
                      name="challenges" 
                      placeholder="Describe your current challenges..." 
                      rows={5}
                      value={formData.challenges}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevious}>Previous</Button>
                    <Button type="submit">Complete Setup</Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Platform Overview</CardTitle>
              <CardDescription>Track your sales performance across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-10 text-center text-gray-500">Your sales platform data is now configured. Real-time data will appear here as it becomes available.</p>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">No data available yet. Performance metrics will be displayed as sales data is collected.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Sales by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Waiting for sales data across your platforms.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPlatforms;
