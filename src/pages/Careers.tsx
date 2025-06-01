
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Careers: React.FC = () => {
  const benefits = [
    {
      title: "Remote-First Culture",
      description: "Work from anywhere in the world. We believe in hiring the best talent regardless of location.",
    },
    {
      title: "Competitive Compensation",
      description: "Salary packages that reflect your experience and skills, plus equity options to share in our success.",
    },
    {
      title: "Flexible Working Hours",
      description: "We focus on results, not hours. Work when you're most productive.",
    },
    {
      title: "Learning Budget",
      description: "Annual budget for courses, books, conferences, and other resources to help you grow professionally.",
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs to keep you at your best.",
    },
    {
      title: "Team Retreats",
      description: "Regular company retreats to connect, collaborate, and celebrate with the team in person.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our <span className="gradient-text">Team</span>
              </h1>
              <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
                We're building the future of e-commerce personalization, and we're looking for passionate, creative people to join us on this journey.
              </p>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Why Work at RecoAI?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-recoai-gray">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Our Culture</h2>
              <div className="prose max-w-none text-recoai-gray">
                <p className="mb-4">
                  At RecoAI, we're building a culture based on trust, ownership, and impact. We believe in giving people the autonomy to do their best work, while providing the support and resources they need to succeed.
                </p>
                <p className="mb-4">
                  We're a diverse team united by a shared mission: to make powerful AI technology accessible to e-commerce businesses of all sizes. We value different perspectives and believe that the best ideas can come from anyone, regardless of their role or background.
                </p>
                <p>
                  If you're passionate about using technology to solve real problems, enjoy working in a fast-paced environment, and want to be part of a team that's transforming an industry, we'd love to hear from you.
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-semibold mb-4">No Current Openings</h3>
                <p className="text-recoai-gray mb-6">
                  There are currently no open positions. Please check back later.
                </p>
                <p className="text-sm text-recoai-gray">
                  We are always looking for exceptional talent. If you believe you would be a great fit for our team, feel free to reach out to us.
                </p>
              </div>
            </div>
            
            <div className="bg-recoai-lightGray p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Don't See the Right Fit?</h2>
              <p className="text-recoai-gray mb-6">
                We're always looking for talented people to join our team. If you don't see a position that matches your skills, send us your resume anyway!
              </p>
              <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Careers;
