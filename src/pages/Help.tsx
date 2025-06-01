
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Book, Video, FileText, HelpCircle, ExternalLink } from "lucide-react";
import AIChatbot from "@/components/support/AIChatbot";

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Book className="h-5 w-5" />,
      questions: [
        {
          q: "How do I install the tracking widget on my website?",
          a: "Go to your Dashboard, find the Widget Code section, copy the JavaScript code, and paste it before the </head> tag in your website's HTML. The widget will start collecting data within 24 hours."
        },
        {
          q: "What platforms does RecoAI integrate with?",
          a: "RecoAI integrates with major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and custom websites. We also connect with Meta Ads, Google Ads, TikTok, LinkedIn, and Mailchimp."
        },
        {
          q: "How long does it take to see data in my dashboard?",
          a: "After installing the tracking widget, you'll typically see data within 24-48 hours. Initial setup requires some traffic to generate meaningful insights."
        }
      ]
    },
    {
      title: "Analytics & Reporting",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          q: "What's the difference between ROI and ROAS?",
          a: "ROI (Return on Investment) shows profit percentage: (Revenue - Cost) / Cost × 100. ROAS (Return on Ad Spend) shows revenue per dollar spent: Revenue / Ad Spend. Both help measure campaign effectiveness."
        },
        {
          q: "Why aren't my analytics showing any data?",
          a: "Common issues include: widget not properly installed, insufficient traffic, ad blockers interfering, or not waiting long enough for data collection. Check the installation guide in our documentation."
        },
        {
          q: "How do I interpret my conversion funnel?",
          a: "The conversion funnel shows your customer journey from visitor to purchase. Look for the biggest drop-offs between stages and optimize those areas first. A typical funnel: Visitors → Engaged → Cart → Checkout → Purchase."
        }
      ]
    },
    {
      title: "Features & Tools",
      icon: <Video className="h-5 w-5" />,
      questions: [
        {
          q: "How does abandoned cart recovery work?",
          a: "Our AI identifies users who add items to cart but don't purchase. We automatically send personalized email sequences to bring them back, typically recovering 10-15% of abandoned carts."
        },
        {
          q: "What is Customer Lifetime Value (CLV) prediction?",
          a: "CLV prediction uses machine learning to forecast how much revenue each customer will generate over their lifetime. This helps you identify high-value customers and optimize marketing spend."
        },
        {
          q: "Can I customize my dashboard theme?",
          a: "Yes! Pro users can customize dashboard themes, including light/dark mode and custom color schemes. Go to Settings → Theme Customization to personalize your experience."
        }
      ]
    },
    {
      title: "Billing & Account",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          q: "What's included in the Pro plan?",
          a: "Pro plan includes: unlimited tracking, advanced analytics, heatmaps, A/B testing, priority support, custom integrations, and white-label options. See our pricing page for full details."
        },
        {
          q: "Can I change my plan anytime?",
          a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime without penalty. Contact support for refund requests."
        }
      ]
    }
  ];

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: <Video className="h-6 w-6 text-red-500" />,
      link: "#",
      badge: "12 videos"
    },
    {
      title: "Documentation",
      description: "Complete technical documentation",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      link: "#",
      badge: "Updated"
    },
    {
      title: "API Reference",
      description: "Developer API documentation",
      icon: <Book className="h-6 w-6 text-green-500" />,
      link: "#",
      badge: "REST API"
    },
    {
      title: "Community Forum",
      description: "Connect with other RecoAI users",
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      link: "#",
      badge: "New"
    }
  ];

  const filteredFAQ = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers, get support, and learn how to make the most of RecoAI</p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="md:col-span-2">
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-6">
                {filteredFAQ.length > 0 ? (
                  filteredFAQ.map((category, categoryIndex) => (
                    <Card key={categoryIndex}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {category.icon}
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {category.questions.map((item, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <h4 className="font-medium text-gray-900 mb-2">{item.q}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                      <Button 
                        onClick={() => setShowChatbot(true)} 
                        className="mt-4"
                      >
                        Ask AI Assistant
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {resource.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                              <Badge variant="secondary" className="text-xs">{resource.badge}</Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                            <Button size="sm" variant="outline" className="text-xs">
                              View Resource
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setShowChatbot(true)} 
                  className="w-full"
                >
                  Chat with AI Assistant
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Support Team
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule a Demo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <a href="/guides" className="block text-blue-600 hover:underline">→ Setup Guides</a>
                  <a href="/dashboard" className="block text-blue-600 hover:underline">→ Dashboard</a>
                  <a href="/pricing" className="block text-blue-600 hover:underline">→ Pricing Plans</a>
                  <a href="/contact" className="block text-blue-600 hover:underline">→ Contact Us</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showChatbot && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] relative">
              <Button
                onClick={() => setShowChatbot(false)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
              >
                ✕
              </Button>
              <AIChatbot />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
