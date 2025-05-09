
import React, { useState, useRef } from "react";
import { Code, BarChart, Lightbulb, Play, Pause } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const steps = [
    {
      number: "01",
      icon: <Code size={24} className="text-recoai-purple" />,
      title: "Quick Integration",
      description: "Simply copy our tracking widget and paste it into your online store. It works with Shopify, WooCommerce, Magento, and more.",
    },
    {
      number: "02",
      icon: <BarChart size={24} className="text-recoai-blue" />,
      title: "Data Collection & Analysis",
      description: "Our AI starts tracking visitor behavior, purchase patterns, and product interactions, providing immediate insights.",
    },
    {
      number: "03",
      icon: <Lightbulb size={24} className="text-recoai-teal" />,
      title: "Smart Recommendations",
      description: "Based on the collected data, receive actionable recommendations to enhance customer experience and boost sales.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-recoai-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">RecoAI</span> Works
          </h2>
          <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
            Get up and running in minutes with our simple three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-xl h-full shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-recoai-purple/20">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-recoai-purple/10">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-recoai-darkGray">{step.title}</h3>
                <p className="text-recoai-gray">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="h-0.5 w-8 bg-recoai-purple/30"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-recoai-darkGray">See it in action</h3>
              <p className="text-recoai-gray mb-4">
                Watch our short demo video to see how RecoAI can transform your e-commerce business with powerful customer insights.
              </p>
              <button className="text-recoai-purple font-medium flex items-center">
                <span className="mr-2">Schedule a demo</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="md:w-1/2 relative rounded-lg overflow-hidden">
              <div 
                className={`absolute inset-0 bg-black/20 flex items-center justify-center z-10 cursor-pointer ${isPlaying ? 'opacity-0 hover:opacity-100 transition-opacity' : ''}`}
                onClick={toggleVideo}
              >
                <div className="h-16 w-16 rounded-full bg-recoai-purple/90 text-white flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </div>
              </div>
              <video 
                ref={videoRef}
                className="w-full h-auto rounded-lg aspect-video"
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
