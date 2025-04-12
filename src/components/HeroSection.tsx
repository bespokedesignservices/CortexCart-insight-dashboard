
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white to-recoai-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered Insights</span> for Your E-Commerce Store
            </h1>
            <p className="text-lg md:text-xl text-recoai-gray mb-8">
              Understand your customers better, personalize their experience, and boost your sales with RecoAI's powerful analytics and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-recoai-purple hover:bg-recoai-purple/90 text-white px-8">
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10">
                <Link to="/#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <p className="text-sm text-recoai-gray mt-4">
              No credit card required • Free 14-day trial
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="RecoAI Dashboard Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-recoai-purple/20 to-transparent mix-blend-overlay"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-recoai-blue/10 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-recoai-purple/10 rounded-full filter blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
