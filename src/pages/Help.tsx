
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Book, 
  MessageSquare, 
  Video, 
  HelpCircle, 
  Search, 
  PhoneCall 
} from "lucide-react";
import { Link } from "react-router-dom";

const Help: React.FC = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-gray-500 mt-2">Get assistance with using RecoAI platform.</p>
      </div>

      <div className="w-full max-w-3xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search for help articles, tutorials, or FAQs..." 
            className="pl-10 py-6"
          />
        </div>
      </div>

      <Tabs defaultValue="knowledgeBase" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4">
          <TabsTrigger value="knowledgeBase" className="flex flex-col items-center gap-1 py-2">
            <Book className="h-5 w-5" />
            <span>Knowledge Base</span>
          </TabsTrigger>
          <TabsTrigger value="contactSupport" className="flex flex-col items-center gap-1 py-2">
            <MessageSquare className="h-5 w-5" />
            <span>Contact Support</span>
          </TabsTrigger>
          <TabsTrigger value="videoTutorials" className="flex flex-col items-center gap-1 py-2">
            <Video className="h-5 w-5" />
            <span>Video Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex flex-col items-center gap-1 py-2">
            <HelpCircle className="h-5 w-5" />
            <span>FAQs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledgeBase" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Knowledge Base</CardTitle>
                <CardDescription>Browse our knowledge base for answers to common questions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { title: "Getting Started", description: "Learn the basics of using the RecoAI platform", articles: 12 },
                    { title: "Account Management", description: "Managing your account settings and preferences", articles: 8 },
                    { title: "Data Analytics", description: "Understanding your analytics dashboard", articles: 15 },
                    { title: "Integration Guides", description: "Connect your existing platforms and tools", articles: 10 },
                    { title: "Troubleshooting", description: "Common issues and how to resolve them", articles: 14 },
                    { title: "Security", description: "Keeping your account and data secure", articles: 7 }
                  ].map((category, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{category.articles} articles</span>
                          <Button variant="ghost" size="sm">Browse</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contactSupport" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Contact Support</CardTitle>
                <CardDescription>Reach out to our support team for personalized assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <MessageSquare className="h-10 w-10 text-purple-600 mb-4" />
                      <h3 className="font-semibold mb-2">Live Chat Support</h3>
                      <p className="text-sm text-gray-500 mb-4">Chat with our support team in real-time for immediate assistance.</p>
                      <Button>Start Chat</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <PhoneCall className="h-10 w-10 text-blue-600 mb-4" />
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <p className="text-sm text-gray-500 mb-4">Call our dedicated support line for urgent issues.</p>
                      <Button variant="outline">+1 (800) 123-4567</Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Submit a Support Request</h3>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Your Name</label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email Address</label>
                        <Input placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subject</label>
                      <Input placeholder="Briefly describe your issue" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Message</label>
                      <textarea 
                        className="w-full h-32 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Provide details about your issue or question"
                      ></textarea>
                    </div>
                    <Button type="submit">Submit Request</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videoTutorials" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Video Tutorials</CardTitle>
                <CardDescription>Watch tutorials on how to use various features of the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { title: "Getting Started with RecoAI", duration: "5:24", views: "2.4K" },
                    { title: "Setting Up Your Analytics Dashboard", duration: "8:12", views: "1.8K" },
                    { title: "Connecting Your Online Store", duration: "6:45", views: "3.2K" },
                    { title: "Using AI Insights for Sales Growth", duration: "10:18", views: "5.1K" },
                    { title: "Customizing Your Recommendations", duration: "7:33", views: "2.7K" },
                    { title: "Advanced Analytics Features", duration: "12:40", views: "1.9K" }
                  ].map((video, i) => (
                    <div key={i} className="group relative rounded-lg overflow-hidden bg-black aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm cursor-pointer">
                          <div className="w-0 h-0 ml-1 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-medium text-sm">{video.title}</h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-white/80 text-xs">{video.duration}</span>
                          <span className="text-white/80 text-xs">{video.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to frequently asked questions about our services.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is RecoAI and how does it work?</AccordionTrigger>
                    <AccordionContent>
                      RecoAI is an AI-powered recommendation platform that helps online businesses increase sales by suggesting relevant products to customers. It works by analyzing your product data and customer behavior patterns to deliver personalized recommendations in real-time.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I integrate RecoAI with my online store?</AccordionTrigger>
                    <AccordionContent>
                      Integration is simple. You can add our tracking script to your website, connect through our API, or use one of our pre-built integrations for platforms like Shopify, WooCommerce, and Magento. Visit the "Sales Platforms" section in your dashboard for detailed instructions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is my customers' data secure with RecoAI?</AccordionTrigger>
                    <AccordionContent>
                      Yes, security is our priority. We use industry-standard encryption and security measures to protect all data. We are GDPR compliant and never share personal data with third parties. You can review our security practices in the Security section of your account settings.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How long does it take to see results?</AccordionTrigger>
                    <AccordionContent>
                      Most customers see initial results within 2-4 weeks after proper implementation. The AI system learns and improves over time, so results typically get better as it gathers more data about your products and customers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I customize the recommendation algorithm?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can adjust various parameters in your dashboard settings to guide the recommendation engine. You can emphasize factors like profit margin, inventory levels, or new product promotion depending on your business goals.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>What kind of support is included with my subscription?</AccordionTrigger>
                    <AccordionContent>
                      All subscription plans include access to our knowledge base, email support, and community forum. Premium plans include priority support, dedicated account managers, and regular strategy sessions with our optimization experts.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      You can cancel your subscription at any time from the Billing section in your dashboard settings. Your service will continue until the end of your current billing period. We don't offer refunds for partial billing periods.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
