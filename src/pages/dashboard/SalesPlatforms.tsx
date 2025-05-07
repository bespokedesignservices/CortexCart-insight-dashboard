
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlatformSetupTab from "@/components/sales-platforms/PlatformSetupTab";
import ConnectPlatformsTab from "@/components/sales-platforms/ConnectPlatformsTab";
import ManualDataTab from "@/components/sales-platforms/ManualDataTab";
import CompletedView from "@/components/sales-platforms/CompletedView";

const SalesPlatforms: React.FC = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("setup");
  
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
    primaryGoal: "increase_sales",
    platformUrl: "",
    apiKey: "",
    storeId: ""
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Platform Setup</TabsTrigger>
            <TabsTrigger value="platforms">Connect Platforms</TabsTrigger>
            <TabsTrigger value="manual">Manual Data Entry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <PlatformSetupTab 
              handleSubmit={handleSubmit}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
              currentStep={currentStep}
            />
          </TabsContent>
          
          <TabsContent value="platforms">
            <ConnectPlatformsTab 
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </TabsContent>
          
          <TabsContent value="manual">
            <ManualDataTab />
          </TabsContent>
        </Tabs>
      ) : (
        <CompletedView />
      )}
    </div>
  );
};

export default SalesPlatforms;
