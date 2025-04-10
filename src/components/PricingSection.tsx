
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  title: string;
  price: number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  const pricingTiers: PricingTier[] = [
    {
      title: "Starter",
      price: isYearly ? 19 : 29,
      description: "Perfect for new stores getting started with analytics",
      features: [
        { text: "Up to 1,000 monthly visitors", included: true },
        { text: "Basic customer behavior analytics", included: true },
        { text: "Product performance tracking", included: true },
        { text: "Email support", included: true },
        { text: "AI-powered recommendations", included: false },
        { text: "Advanced customer segmentation", included: false },
        { text: "Custom reports", included: false }
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline"
    },
    {
      title: "Growth",
      price: isYearly ? 49 : 69,
      description: "For businesses ready to leverage advanced analytics",
      features: [
        { text: "Up to 10,000 monthly visitors", included: true },
        { text: "Advanced customer behavior analytics", included: true },
        { text: "Product performance tracking", included: true },
        { text: "Priority email support", included: true },
        { text: "AI-powered recommendations", included: true },
        { text: "Advanced customer segmentation", included: true },
        { text: "Custom reports", included: false }
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default"
    },
    {
      title: "Pro",
      price: isYearly ? 99 : 129,
      description: "Complete solution for established e-commerce stores",
      features: [
        { text: "Up to 50,000 monthly visitors", included: true },
        { text: "Advanced customer behavior analytics", included: true },
        { text: "Product performance tracking", included: true },
        { text: "24/7 priority support", included: true },
        { text: "AI-powered recommendations", included: true },
        { text: "Advanced customer segmentation", included: true },
        { text: "Custom reports", included: true }
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-recoai-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-recoai-gray max-w-2xl mx-auto mb-8">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          
          <div className="inline-flex items-center bg-white p-1 rounded-full border border-gray-200 mb-8">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly
                  ? "bg-recoai-purple text-white"
                  : "text-recoai-darkGray hover:text-recoai-purple"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isYearly
                  ? "bg-recoai-purple text-white"
                  : "text-recoai-darkGray hover:text-recoai-purple"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="text-xs opacity-90">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="relative">
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-recoai-purple text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden ${
                tier.popular 
                  ? "border-2 border-recoai-purple shadow-md" 
                  : "border border-gray-100"
              }`}>
                <div className="p-6 md:p-8 border-b border-gray-100 flex-grow">
                  <h3 className="text-xl font-bold text-recoai-darkGray">{tier.title}</h3>
                  <div className="my-4">
                    <span className="text-4xl font-bold text-recoai-darkGray">${tier.price}</span>
                    <span className="text-recoai-gray">/{isYearly ? "year" : "month"}</span>
                  </div>
                  <p className="text-recoai-gray mb-6">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        {feature.included ? (
                          <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X size={18} className="text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-recoai-darkGray" : "text-recoai-gray"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:p-8 bg-gray-50">
                  <Button 
                    asChild
                    variant={tier.buttonVariant} 
                    className={`w-full ${
                      tier.buttonVariant === "default" 
                        ? "bg-recoai-purple hover:bg-recoai-purple/90" 
                        : "border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10"
                    }`}
                  >
                    <Link to="/dashboard">{tier.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-recoai-gray mb-4">
            Need a custom plan for your larger business?
          </p>
          <Button asChild variant="secondary" className="bg-white">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
