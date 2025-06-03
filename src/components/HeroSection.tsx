
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-cortexcart-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Unlock AI-Powered <span className="gradient-text">E-commerce Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-cortexcart-gray mb-8 max-w-3xl mx-auto">
            Transform your online store with CortexCart's intelligent analytics. 
            Understand customer behavior, boost conversions, and grow your business with actionable AI insights.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-cortexcart-purple hover:bg-cortexcart-purple/90 text-white px-8">
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cortexcart-purple text-cortexcart-purple hover:bg-cortexcart-purple/10">
              <Link to="/features">Explore Features</Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-cortexcart-gray">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
