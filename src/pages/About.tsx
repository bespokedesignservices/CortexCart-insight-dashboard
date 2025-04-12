
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      title: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
      bio: "Former Head of E-Commerce at a Fortune 500 retailer, Sarah founded RecoAI to solve the challenges she experienced firsthand with understanding customer behavior and personalizing shopping experiences.",
    },
    {
      name: "Michael Chen",
      title: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300",
      bio: "With a PhD in Machine Learning and 10+ years developing AI systems, Michael leads our engineering team in creating cutting-edge recommendation algorithms and analytics solutions.",
    },
    {
      name: "Emily Rodriguez",
      title: "Head of Product",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=300",
      bio: "Emily brings 8 years of product management experience from leading tech companies, focusing on creating intuitive, powerful e-commerce tools that solve real business problems.",
    },
    {
      name: "David Kim",
      title: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300",
      bio: "With a background in e-commerce consulting, David ensures our customers get maximum value from RecoAI through personalized onboarding, training, and ongoing support.",
    },
  ];

  const values = [
    {
      title: "Customer-Centric Innovation",
      description: "We build our product based on real customer needs, not assumptions. Every feature we develop solves a genuine challenge faced by e-commerce businesses.",
    },
    {
      title: "Accessible Intelligence",
      description: "We believe powerful AI shouldn't require a data science team to implement. We make advanced analytics and machine learning accessible to businesses of all sizes.",
    },
    {
      title: "Measurable Impact",
      description: "We're focused on delivering tangible results for our customers. If it doesn't improve your metrics, we don't build it.",
    },
    {
      title: "Continuous Improvement",
      description: "We're never satisfied with the status quo. Our team constantly researches, tests, and implements new approaches to make our platform better.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">RecoAI</span>
            </h1>
            <p className="text-lg text-recoai-gray mb-8">
              We're on a mission to democratize AI-powered analytics and personalization for e-commerce stores of all sizes.
            </p>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <div className="prose max-w-none text-recoai-gray">
                <p className="mb-4">
                  Founded in 2022 by e-commerce veterans Sarah Johnson and Michael Chen, RecoAI was born from a shared frustration: powerful customer analytics and personalization tools were too complex and expensive for most online stores.
                </p>
                <p className="mb-4">
                  Having worked with enterprise retailers, Sarah and Michael saw firsthand how AI-driven insights and recommendations could transform businesses. They also recognized that most solutions required dedicated data teams and six-figure budgets—putting them out of reach for the vast majority of e-commerce entrepreneurs.
                </p>
                <p className="mb-4">
                  RecoAI was created to change that. By combining powerful AI technology with intuitive, no-code interfaces, we've made enterprise-grade analytics and personalization accessible to online stores of all sizes.
                </p>
                <p>
                  Today, we serve thousands of e-commerce businesses worldwide, helping them understand their customers better and create more personalized shopping experiences that drive growth.
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-recoai-purple">{member.title}</p>
                      </div>
                    </div>
                    <p className="text-recoai-gray">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-recoai-gray">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-lg text-recoai-gray mb-6">
                We're constantly growing and looking for talented people to join our team.
              </p>
              <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                <Link to="/careers">View Open Positions</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default About;
