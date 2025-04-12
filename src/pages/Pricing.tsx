
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small stores just getting started with AI-powered analytics.",
      features: [
        "Up to 5,000 monthly visitors",
        "Basic customer behavior analytics",
        "Product recommendation widgets",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      price: "$99",
      description: "Ideal for growing stores looking to maximize their conversion rates.",
      features: [
        "Up to 20,000 monthly visitors",
        "Advanced customer analytics",
        "A/B testing capabilities",
        "Personalized product recommendations",
        "Priority email support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Business",
      price: "$199",
      description: "For established businesses requiring advanced features and support.",
      features: [
        "Up to 100,000 monthly visitors",
        "Advanced customer segmentation",
        "Custom recommendation algorithms",
        "Revenue attribution models",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Get Started",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simple, <span className="gradient-text">Transparent</span> Pricing
              </h1>
              <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
                Choose the plan that fits your business needs. All plans include a 14-day free trial with no credit card required.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-sm border ${
                    plan.popular ? "border-recoai-purple ring-2 ring-recoai-purple/20" : "border-gray-100"
                  } overflow-hidden relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-recoai-purple text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-recoai-gray ml-1">/month</span>
                    </div>
                    <p className="text-recoai-gray mb-6">{plan.description}</p>
                    <Button
                      asChild
                      className={`w-full ${
                        plan.popular
                          ? "bg-recoai-purple hover:bg-recoai-purple/90 text-white"
                          : "bg-white border border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10"
                      }`}
                    >
                      <Link to={`/register?plan=${plan.name.toLowerCase()}`}>{plan.cta}</Link>
                    </Button>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="font-medium mb-4">What's included:</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-recoai-gray">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-recoai-lightGray rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Plan?</h3>
              <p className="text-recoai-gray mb-6">
                For larger businesses or those with specific requirements, we offer custom plans tailored to your needs.
              </p>
              <Button asChild variant="outline" className="border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Pricing;
