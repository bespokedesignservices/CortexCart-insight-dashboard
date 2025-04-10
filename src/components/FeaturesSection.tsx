
import React from "react";
import { Brain, LineChart, ShoppingCart, Users, Zap, Gauge } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-recoai-purple/20 h-full">
      <div className="h-12 w-12 rounded-lg bg-recoai-purple/10 text-recoai-purple flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-recoai-darkGray">{title}</h3>
      <p className="text-recoai-gray">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Analytics",
      description: "Leverage machine learning to uncover patterns in customer behavior that drive purchasing decisions."
    },
    {
      icon: <LineChart size={24} />,
      title: "Real-time Insights",
      description: "Monitor customer activity as it happens with live dashboards and instant notifications."
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Product Recommendations",
      description: "Automatically suggest products that your customers are most likely to purchase next."
    },
    {
      icon: <Users size={24} />,
      title: "Customer Segmentation",
      description: "Group your customers by behavior, preferences, and demographics for targeted marketing."
    },
    {
      icon: <Zap size={24} />,
      title: "Easy Integration",
      description: "Integrate with your existing e-commerce platform in minutes with our simple copy-paste widget."
    },
    {
      icon: <Gauge size={24} />,
      title: "Performance Metrics",
      description: "Track key performance indicators like conversion rates, average order value, and customer lifetime value."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Growing Stores</span>
          </h2>
          <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
            Our suite of tools gives you everything you need to understand your customers and grow your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
