
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Code } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const platformDetails = {
  shopify: {
    name: "Shopify",
    logo: "https://cdn.shopify.com/s/files/1/0277/3365/8563/files/shopify-logo.svg",
    instructions: "Add the tracking code to the theme.liquid file just before the closing </head> tag.",
    settingsUrl: "https://your-store.myshopify.com/admin/themes/current/editor?section=theme-settings",
  },
  amazon: {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    instructions: "Amazon doesn't allow custom JavaScript. Please use our API integration instead.",
    settingsUrl: "https://sellercentral.amazon.com/",
  },
  ebay: {
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    instructions: "Add the tracking code to your eBay store's description template.",
    settingsUrl: "https://my.ebay.com/ws/eBayISAPI.dll?MyeBay",
  },
  woocommerce: {
    name: "WooCommerce",
    logo: "https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg",
    instructions: "Add the tracking code to your theme's header.php file just before the closing </head> tag, or use a plugin like 'Insert Headers and Footers'.",
    settingsUrl: "https://your-site.com/wp-admin/admin.php?page=wc-settings",
  },
  magento: {
    name: "Magento",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Magento_logo.svg",
    instructions: "Add the tracking code to your theme's default_head_blocks.xml file.",
    settingsUrl: "https://your-site.com/admin/system/config/",
  },
  bigcommerce: {
    name: "BigCommerce",
    logo: "https://www.bigcommerce.com/assets/images/logos/bigcommerce-logo-dark.svg",
    instructions: "Add the tracking code in Settings > Advanced Settings > Web Analytics.",
    settingsUrl: "https://login.bigcommerce.com/",
  },
  custom: {
    name: "Custom Platform",
    logo: null,
    instructions: "Add the tracking code just before the closing </head> tag of your website.",
    settingsUrl: "",
  }
};

// Define our form schemas
const manualDataSchema = z.object({
  currentSales: z.string().min(1, "Sales value is required"),
  totalProducts: z.string().min(1, "Products count is required"),
  activeCustomers: z.string().min(1, "Customer count is required"),
  startDate: z.string().min(1, "Start date is required"),
});

const SalesPlatforms: React.FC = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("setup");
  const { toast } = useToast();
  
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

  const manualDataForm = useForm<z.infer<typeof manualDataSchema>>({
    resolver: zodResolver(manualDataSchema),
    defaultValues: {
      currentSales: "",
      totalProducts: "",
      activeCustomers: "",
      startDate: new Date().toISOString().split('T')[0],
    },
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

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
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

  const handleManualDataSubmit = (data: z.infer<typeof manualDataSchema>) => {
    console.log("Submitting manual data:", data);
    toast({
      title: "Data saved",
      description: "Your initial data has been saved and will be used as a starting point.",
    });
  };

  // Sample tracking code with the platform URL
  const getTrackingCode = () => {
    const storeId = formData.storeId || "your-store-id";
    return `<script>
  (function(r,e,c,o,a,i){
    r.RecoAITracker = { 
      storeId: "${storeId}",
      endpoint: "${window.location.origin}/api/track",
      platform: "${selectedPlatform}"
    };
    r.rctk = r.rctk || function() {
      (r.rctk.q = r.rctk.q || []).push(arguments);
      
      // Log the event to console for debugging
      console.log('RecoAI Event:', arguments);
      
      // Send data to tracking endpoint
      if (arguments[0] === 'event') {
        const payload = {
          storeId: r.RecoAITracker.storeId,
          platform: r.RecoAITracker.platform,
          event: arguments[1],
          data: arguments[2] || {}
        };
        
        fetch(r.RecoAITracker.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(console.error);
      }
    };
    
    // Auto-track page views
    rctk('event', 'page_view', { 
      url: window.location.href,
      title: document.title,
      referrer: document.referrer
    });
    
    // Track product views
    document.addEventListener('DOMContentLoaded', function() {
      // Platform-specific selectors
      const productSelectors = {
        shopify: '.product-single__title, .product__title',
        woocommerce: '.product_title',
        magento: '.page-title',
        bigcommerce: '.productView-title',
        default: '.product-title, .product-name, [data-product-title]'
      };
      
      const selector = productSelectors[r.RecoAITracker.platform] || productSelectors.default;
      const productElements = document.querySelectorAll(selector);
      
      if (productElements.length > 0) {
        rctk('event', 'product_view', {
          title: productElements[0].textContent.trim(),
          url: window.location.href
        });
      }
    });
    
    // Set up click tracking
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button') || e.target;
      if (target.tagName) {
        rctk('event', 'click', {
          element: target.tagName.toLowerCase(),
          text: target.innerText,
          path: target.getAttribute('href') || '',
          classes: target.className
        });
      }
    });
    
    // Load the actual tracker script
    a = e.createElement(c);
    a.async = 1;
    a.src = o;
    i = e.getElementsByTagName(c)[0];
    i.parentNode.insertBefore(a, i);
  })(window, document, "script", "${window.location.origin}/tracker.js");
</script>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTrackingCode());
    setCopied(true);
    
    toast({
      title: "Tracking code copied!",
      description: "You can now paste it into your website's head section.",
    });
    
    setTimeout(() => setCopied(false), 2000);
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
          </TabsContent>
          
          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Connect Your Sales Platform</CardTitle>
                <CardDescription>
                  Select your e-commerce platform to get customized installation instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                  {Object.entries(platformDetails).map(([id, platform]) => (
                    <div 
                      key={id}
                      onClick={() => handlePlatformSelect(id)}
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer transition-all ${
                        selectedPlatform === id 
                          ? 'border-recoai-purple bg-recoai-purple/5 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {platform.logo ? (
                        <img 
                          src={platform.logo} 
                          alt={platform.name} 
                          className="h-10 mb-3 object-contain" 
                        />
                      ) : (
                        <div className="h-10 mb-3 w-full flex items-center justify-center">
                          <Code size={24} className="text-gray-500" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-center">{platform.name}</span>
                    </div>
                  ))}
                </div>

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
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Installation Instructions</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className={
                            copied
                              ? "bg-green-500 text-white hover:bg-green-600 border-green-500"
                              : "border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10"
                          }
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" /> Copy Code
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <p className="text-sm mb-3">
                        {platformDetails[selectedPlatform as keyof typeof platformDetails].instructions}
                      </p>
                      
                      {platformDetails[selectedPlatform as keyof typeof platformDetails].settingsUrl && (
                        <p className="text-sm mb-3">
                          Access your store settings at: <a href={platformDetails[selectedPlatform as keyof typeof platformDetails].settingsUrl} target="_blank" rel="noopener noreferrer" className="text-recoai-purple underline">
                            {platformDetails[selectedPlatform as keyof typeof platformDetails].settingsUrl}
                          </a>
                        </p>
                      )}
                      
                      <div className="bg-gray-900 text-gray-300 p-3 rounded-md overflow-x-auto text-xs">
                        <pre className="whitespace-pre-wrap">
                          {getTrackingCode()}
                        </pre>
                      </div>
                    </div>
                    
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
          </TabsContent>
          
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Manual Data Entry</CardTitle>
                <CardDescription>
                  Enter your current metrics as a starting point for RecoAI's tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...manualDataForm}>
                  <form onSubmit={manualDataForm.handleSubmit(handleManualDataSubmit)} className="space-y-6">
                    <FormField
                      control={manualDataForm.control}
                      name="currentSales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Monthly Sales</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. 5000" />
                          </FormControl>
                          <FormDescription>
                            Enter your total sales amount for the last month.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={manualDataForm.control}
                      name="totalProducts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Products</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. 120" />
                          </FormControl>
                          <FormDescription>
                            The total number of products in your catalog.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={manualDataForm.control}
                      name="activeCustomers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Active Customers</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. 250" />
                          </FormControl>
                          <FormDescription>
                            The number of active customers in the past month.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={manualDataForm.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking Start Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormDescription>
                            The date from which you want to start tracking.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Initial Data</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
