
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full py-4 bg-white/90 backdrop-blur-sm fixed top-0 z-50 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">RecoAI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              Pricing
            </button>
            <Link to="/login" className="text-recoai-darkGray hover:text-recoai-purple transition-colors">
              Log In
            </Link>
            <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-recoai-darkGray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 py-4 animate-fade-in">
            <button 
              onClick={() => scrollToSection("features")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
            >
              Pricing
            </button>
            <Link 
              to="/login" 
              className="text-recoai-darkGray hover:text-recoai-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Button asChild className="bg-recoai-purple hover:bg-recoai-purple/90 w-full">
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
