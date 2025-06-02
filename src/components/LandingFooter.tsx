import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Facebook, Twitter, Instagram, LinkedIn } from "lucide-react";

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CortexCart</h3>
            <p className="text-recoai-gray">
              AI-powered e-commerce analytics platform helping businesses understand their customers and grow their sales.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-recoai-gray hover:text-recoai-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-recoai-gray hover:text-recoai-purple">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-recoai-gray hover:text-recoai-purple">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-recoai-gray hover:text-recoai-purple">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-recoai-gray hover:text-recoai-purple">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-recoai-gray hover:text-recoai-purple">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-recoai-gray hover:text-recoai-purple">
                  Guides
                </Link>
              </li>
              <li>
                <a href="/api" className="text-recoai-gray hover:text-recoai-purple">
                  API Documentation
                </a>
              </li>
              <li>
                <Link to="/terms" className="text-recoai-gray hover:text-recoai-purple">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-recoai-gray hover:text-recoai-purple">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-recoai-gray mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className="mr-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-recoai-gray text-sm">
            © 2024 CortexCart. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a href="#" className="text-gray-400 hover:text-recoai-purple">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-recoai-purple">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-recoai-purple">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-recoai-purple">
                <LinkedIn className="h-5 w-5" />
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

import { Input } from "@/components/ui/input";
