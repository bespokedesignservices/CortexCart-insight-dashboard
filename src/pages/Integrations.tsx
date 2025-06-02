
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { platformDetails } from "@/utils/platformDetails";

const Integrations: React.FC = () => {
  const platforms = [
    {
      id: "shopify",
      ...platformDetails.shopify
    },
    {
      id: "woocommerce",
      ...platformDetails.woocommerce
    },
    {
      id: "magento",
      ...platformDetails.magento
    },
    {
      id: "bigcommerce",
      ...platformDetails.bigcommerce
    },
    {
      id: "prestashop",
      ...platformDetails.prestashop
    },
    {
      id: "opencast",
      name: "OpenCart",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/OpenCart_logo.png",
      description: "Integrate seamlessly with OpenCart stores using our comprehensive module that supports all OpenCart features."
    },
    {
      id: "custom",
      ...platformDetails.custom
    }
  ];

  const tools = [
    {
      name: "Google Analytics",
      logo: "https://www.google.com/analytics/static/53c5c7d1/svg/google-analytics-logo.svg",
      description: "Combine CortexCart insights with your Google Analytics data for comprehensive reporting."
    },
    {
      name: "Klaviyo",
      logo: "https://cdn.worldvectorlogo.com/logos/klaviyo.svg",
      description: "Use CortexCart customer segments and product recommendations in your Klaviyo email campaigns."
    },
    {
      name: "Mailchimp",
      logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie.svg",
      description: "Enhance your Mailchimp emails with personalized product recommendations from CortexCart."
    },
    {
      name: "Facebook Ads",
      logo: "https://cdn.worldvectorlogo.com/logos/facebook-icon-1.svg",
      description: "Target your Facebook ads more effectively using CortexCart customer segments and insights."
    },
    {
      name: "X (Twitter)",
      logo: "https://cdn.worldvectorlogo.com/logos/twitter-6.svg",
      description: "Leverage CortexCart analytics to optimize your Twitter advertising campaigns and audience targeting."
    },
    {
      name: "Snapchat Ads",
      logo: "https://cdn.worldvectorlogo.com/logos/snapchat-2.svg",
      description: "Use CortexCart customer insights to create more effective Snapchat ad campaigns and reach younger demographics."
    },
    {
      name: "LinkedIn Ads",
      logo: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg",
      description: "Target B2B audiences more precisely with CortexCart's professional customer segments and behavior data."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="gradient-text">Integrations</span>
            </h1>
            <p className="text-lg text-cortexcart-gray mb-16">
              CortexCart seamlessly integrates with your favorite e-commerce platforms and marketing tools,
              making it easy to enhance your store with AI-powered recommendations and analytics.
            </p>
            
            <h2 className="text-2xl font-bold mb-8">E-Commerce Platforms</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {platforms.map((platform, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-12 mb-4 flex items-center">
                    {platform.logo ? (
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="h-10 max-w-[180px] object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Logo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                  <p className="text-cortexcart-gray">{platform.description}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold mb-8">Marketing Tools</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-12 mb-4 flex items-center">
                    {tool.logo ? (
                      <img
                        src={tool.logo}
                        alt={`${tool.name} logo`}
                        className="h-10 max-w-[180px] object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Logo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-cortexcart-gray">{tool.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-cortexcart-lightGray p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
              <p className="text-cortexcart-gray mb-6">
                We offer a flexible REST API that allows you to integrate CortexCart with any platform or tool.
                Our team can also help develop custom integrations for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-cortexcart-purple hover:bg-cortexcart-purple/90 text-white">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-cortexcart-purple text-cortexcart-purple hover:bg-cortexcart-purple/10">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Integrations;
