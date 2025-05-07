
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PlatformSetupTabProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (platform: string, checked: boolean) => void;
  currentStep: number;
}

const PlatformSetupTab: React.FC<PlatformSetupTabProps> = ({
  handleSubmit,
  handleNext,
  handlePrevious,
  formData,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
  currentStep
}) => {
  return (
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
                        checked={checked as boolean}
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
                    checked={formData.platforms.other as boolean}
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
  );
};

export default PlatformSetupTab;
