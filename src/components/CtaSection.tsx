
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your E-Commerce Store?
          </h2>
          <p className="text-lg text-recoai-gray mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of store owners who are using RecoAI to understand their customers better and boost their sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-recoai-purple hover:bg-recoai-purple/90 text-white px-8">
              <Link to="/dashboard">Start Your Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10">
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
          <p className="text-sm text-recoai-gray mt-6">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
