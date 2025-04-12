
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Roadmap: React.FC = () => {
  const timelineItems = [
    {
      quarter: "Q2 2025",
      title: "Advanced Personalization Engine",
      description: "A completely redesigned personalization engine with deeper machine learning capabilities, allowing for more precise product recommendations based on subtle customer preferences and behaviors.",
      status: "planning",
    },
    {
      quarter: "Q1 2025",
      title: "Visual Similarity Search",
      description: "AI-powered visual search that allows customers to find products that look similar to ones they're interested in, enhancing product discovery and increasing conversion rates.",
      status: "planning",
    },
    {
      quarter: "Q4 2024",
      title: "Customer Lifetime Value Prediction",
      description: "Predictive analytics to estimate the future value of customers, helping you identify high-value prospects and allocate marketing resources more effectively.",
      status: "development",
    },
    {
      quarter: "Q3 2024",
      title: "Abandoned Cart Recovery Optimization",
      description: "Smart timing and messaging recommendations for abandoned cart emails, maximizing recovery rates through personalized approaches.",
      status: "development",
    },
    {
      quarter: "Q2 2024",
      title: "Multi-language Support",
      description: "Full localization of the RecoAI dashboard and recommendation widgets in 10+ languages, making our platform accessible to global e-commerce businesses.",
      status: "beta",
    },
    {
      quarter: "Q1 2024",
      title: "Enhanced Mobile Analytics",
      description: "Dedicated mobile analytics providing deeper insights into mobile shopping behavior and conversion optimization for smartphone users.",
      status: "released",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">Planning</span>;
      case "development":
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full">In Development</span>;
      case "beta":
        return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full">Beta</span>;
      case "released":
        return <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">Released</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Product <span className="gradient-text">Roadmap</span>
            </h1>
            <p className="text-lg text-recoai-gray mb-16">
              At RecoAI, we're constantly working to improve our platform and add new features.
              Here's a look at what we've recently launched and what's coming next.
            </p>
            
            <div className="relative border-l border-gray-200 pl-8 ml-4 mb-16">
              {timelineItems.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="absolute -left-12 mt-1.5 h-8 w-8 rounded-full border-4 border-white bg-recoai-purple flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Q{index + 1}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <time className="block text-sm font-medium text-recoai-purple mb-2">{item.quarter}</time>
                  <p className="text-recoai-gray">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-recoai-lightGray p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Feature Requests</h2>
              <p className="text-recoai-gray mb-6">
                We love hearing from our customers! If you have ideas for new features or improvements,
                please let us know. Your feedback directly influences our roadmap.
              </p>
              <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                <Link to="/contact">Submit Feature Request</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Roadmap;
