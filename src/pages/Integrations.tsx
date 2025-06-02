
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Integrations: React.FC = () => {
  const platforms = [
    {
      name: "Shopify",
      logo: "https://cdn.shopify.com/s/files/1/0277/3365/8563/files/shopify-logo.svg",
      description: "Seamless integration with Shopify stores. Install our app from the Shopify App Store and be up and running in minutes.",
    },
    {
      name: "WooCommerce",
      logo: "https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg",
      description: "Our WordPress plugin makes it easy to add CortexCart to your WooCommerce store with just a few clicks.",
    },
    {
      name: "Magento",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Magento_logo.svg",
      description: "Comprehensive integration with both Magento 1 and 2, supporting all features of the platform.",
    },
    {
      name: "BigCommerce",
      logo: "https://www.bigcommerce.com/assets/images/logos/bigcommerce-logo-dark.svg",
      description: "Connect your BigCommerce store to CortexCart with our official app available on the BigCommerce App Marketplace.",
    },
    {
      name: "PrestaShop",
      logo: "https://www.prestashop.com/sites/all/themes/prestashop/images/logos/logo-prestashop-colors.svg",
      description: "Our PrestaShop module allows for easy setup and configuration, with all features fully supported.",
    },
    {
      name: "Salesforce Commerce Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      description: "Enterprise-grade integration with Salesforce Commerce Cloud, with full support for multi-site setups.",
    },
  ];

  const tools = [
    {
      name: "Google Analytics",
      description: "Combine CortexCart insights with your Google Analytics data for comprehensive reporting.",
    },
    {
      name: "Klaviyo",
      description: "Use CortexCart customer segments and product recommendations in your Klaviyo email campaigns.",
    },
    {
      name: "Mailchimp",
      description: "Enhance your Mailchimp emails with personalized product recommendations from CortexCart.",
    },
    {
      name: "Facebook Ads",
      description: "Target your Facebook ads more effectively using CortexCart customer segments and insights.",
    },
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
            <p className="text-lg text-recoai-gray mb-16">
              CortexCart seamlessly integrates with your favorite e-commerce platforms and marketing tools,
              making it easy to enhance your store with AI-powered recommendations and analytics.
            </p>
            
            <h2 className="text-2xl font-bold mb-8">E-Commerce Platforms</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {platforms.map((platform, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-12 mb-4 flex items-center">
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className="h-10 max-w-[180px] object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                  <p className="text-recoai-gray">{platform.description}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold mb-8">Marketing Tools</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-recoai-gray">{tool.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-recoai-lightGray p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
              <p className="text-recoai-gray mb-6">
                We offer a flexible REST API that allows you to integrate CortexCart with any platform or tool.
                Our team can also help develop custom integrations for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10">
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
