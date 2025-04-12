
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-recoai-gray mb-12">
              Have questions or want to learn more about RecoAI? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company
                    </label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div>
                <div className="bg-recoai-lightGray p-6 rounded-xl mb-8">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Email</h3>
                      <p className="text-recoai-gray">hello@recoai.com</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Phone</h3>
                      <p className="text-recoai-gray">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Address</h3>
                      <p className="text-recoai-gray">
                        123 AI Street<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-recoai-lightGray p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-4">Sales Inquiries</h2>
                  <p className="text-recoai-gray mb-4">
                    Interested in RecoAI for your business? Our sales team is ready to answer your questions and help you find the right plan.
                  </p>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-recoai-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-recoai-gray">sales@recoai.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-recoai-lightGray p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Looking for Support?</h2>
              <p className="text-recoai-gray mb-6">
                If you're a current customer with technical questions or need assistance with your account, please visit our Help Center.
              </p>
              <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                <a href="/support">Visit Help Center</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Contact;
