
import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, BarChart, Zap, AlertCircle, ChevronRight, Clock, User } from "lucide-react";

const Guides: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const guideCategories = [
    {
      id: "onboarding",
      title: "Getting Started",
      icon: User,
      description: "Complete onboarding guide for new users",
      guides: [
        {
          id: "account-setup",
          title: "Account Setup & First Login",
          duration: "5 minutes",
          difficulty: "Beginner",
          steps: [
            "Sign up for your RecoAI account at recoai.com",
            "Verify your email address",
            "Complete your profile information",
            "Choose your subscription plan",
            "Access your dashboard for the first time"
          ]
        },
        {
          id: "widget-installation",
          title: "Installing Your Tracking Widget",
          duration: "10 minutes",
          difficulty: "Beginner",
          steps: [
            "Navigate to Dashboard → Widget Code",
            "Copy your unique tracking script",
            "Paste the script in your website's <head> section",
            "Verify installation with our testing tool",
            "Wait 24 hours for initial data collection"
          ]
        }
      ]
    },
    {
      id: "integrations",
      title: "Platform Integrations",
      icon: Code,
      description: "Connect your e-commerce platforms and tools",
      guides: [
        {
          id: "shopify-integration",
          title: "Shopify Integration Setup",
          duration: "15 minutes",
          difficulty: "Intermediate",
          steps: [
            "Go to Dashboard → Sales Platforms",
            "Select 'Shopify' from the platform list",
            "Enter your Shopify store URL",
            "Generate and copy your API credentials from Shopify Admin",
            "Paste credentials in RecoAI and test connection",
            "Configure data sync preferences",
            "Verify product and order data is flowing correctly"
          ]
        },
        {
          id: "woocommerce-setup",
          title: "WooCommerce Plugin Installation",
          duration: "20 minutes",
          difficulty: "Intermediate",
          steps: [
            "Download the RecoAI WordPress plugin",
            "Upload and activate in your WordPress admin",
            "Navigate to WooCommerce → RecoAI Settings",
            "Enter your RecoAI API key from your dashboard",
            "Configure tracking preferences",
            "Test the connection and verify data sync"
          ]
        }
      ]
    },
    {
      id: "analytics",
      title: "Reports & Analytics",
      icon: BarChart,
      description: "Understanding your data and insights",
      guides: [
        {
          id: "dashboard-overview",
          title: "Understanding Your Dashboard",
          duration: "10 minutes",
          difficulty: "Beginner",
          steps: [
            "Overview of key metrics: visitors, conversion rate, sales",
            "Reading the performance chart and trends",
            "Understanding customer segments and behavior",
            "Interpreting AI insights and recommendations",
            "Setting up custom date ranges for analysis"
          ]
        },
        {
          id: "advanced-analytics",
          title: "Advanced Analytics Features",
          duration: "25 minutes",
          difficulty: "Advanced",
          steps: [
            "Setting up custom conversion goals",
            "Creating customer segments for targeted analysis",
            "Utilizing cohort analysis for retention insights",
            "Implementing A/B testing with RecoAI data",
            "Exporting data for external analysis"
          ]
        }
      ]
    },
    {
      id: "automation",
      title: "Campaign Automation",
      icon: Zap,
      description: "Automate your marketing campaigns",
      guides: [
        {
          id: "abandoned-cart",
          title: "Abandoned Cart Recovery Setup",
          duration: "30 minutes",
          difficulty: "Intermediate",
          steps: [
            "Configure cart abandonment tracking",
            "Set up email templates for recovery campaigns",
            "Define trigger conditions and timing",
            "Integrate with your email service provider",
            "Test the complete automation flow",
            "Monitor and optimize recovery rates"
          ]
        },
        {
          id: "product-recommendations",
          title: "AI Product Recommendations",
          duration: "20 minutes",
          difficulty: "Intermediate",
          steps: [
            "Enable AI recommendation engine",
            "Configure recommendation algorithms",
            "Design recommendation widgets for your site",
            "Implement cross-sell and upsell strategies",
            "Monitor recommendation performance"
          ]
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: AlertCircle,
      description: "Common issues and solutions",
      guides: [
        {
          id: "data-issues",
          title: "Data Not Appearing in Dashboard",
          duration: "15 minutes",
          difficulty: "Beginner",
          steps: [
            "Check if tracking widget is properly installed",
            "Verify website traffic is generating data",
            "Ensure JavaScript is enabled on your site",
            "Check for conflicting scripts or ad blockers",
            "Contact support if issues persist after 48 hours"
          ]
        },
        {
          id: "integration-problems",
          title: "Platform Integration Issues",
          duration: "20 minutes",
          difficulty: "Intermediate",
          steps: [
            "Verify API credentials are correct and active",
            "Check platform-specific requirements and permissions",
            "Review error logs in your integration dashboard",
            "Test connection with simplified data",
            "Update integration settings if platform has changed"
          ]
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Guides</span> & Documentation
              </h1>
              <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
                Step-by-step instructions to help you get the most out of RecoAI. From basic setup to advanced features.
              </p>
            </div>

            <Tabs defaultValue="onboarding" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                {guideCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {guideCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                    <p className="text-recoai-gray">{category.description}</p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.guides.map((guide) => (
                      <Card key={guide.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{guide.title}</CardTitle>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {guide.duration}
                            </Badge>
                            <Badge className={getDifficultyColor(guide.difficulty)}>
                              {guide.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {guide.steps.slice(0, 3).map((step, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="bg-recoai-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                            {guide.steps.length > 3 && (
                              <p className="text-sm text-gray-500 pl-7">
                                +{guide.steps.length - 3} more steps...
                              </p>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full mt-4"
                            onClick={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
                          >
                            {selectedGuide === guide.id ? "Hide Details" : "View Full Guide"}
                          </Button>
                          
                          {selectedGuide === guide.id && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-semibold mb-3">Complete Steps:</h4>
                              <div className="space-y-3">
                                {guide.steps.map((step, index) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <span className="bg-recoai-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                      {index + 1}
                                    </span>
                                    <span className="text-sm">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-16 bg-recoai-lightGray p-8 rounded-xl text-center">
              <BookOpen className="h-12 w-12 text-recoai-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-recoai-gray mb-6">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <Button className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Guides;
