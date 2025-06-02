import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const LandingNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">CortexCart</span>
        </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/features" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          Features
        </Link>
        <Link to="/pricing" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          Pricing
        </Link>
        <Link to="/integrations" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          Integrations
        </Link>
        <Link to="/roadmap" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          Roadmap
        </Link>
        <Link to="/about" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-recoai-gray hover:text-recoai-purple transition-colors">
          Contact
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <Link to="/login">
          <Button variant="ghost" className="text-recoai-gray hover:text-recoai-purple">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-recoai-purple hover:bg-recoai-purple/90 text-white">
            Start Free Trial
          </Button>
        </Link>
      </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-2/3 md:w-1/2">
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through CortexCart
              </SheetDescription>
            </SheetHeader>
          <div className="flex flex-col space-y-4">
            <Link to="/features" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              Pricing
            </Link>
            <Link to="/integrations" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              Integrations
            </Link>
            <Link to="/roadmap" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              Roadmap
            </Link>
            <Link to="/about" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-recoai-gray hover:text-recoai-purple transition-colors">
              Contact
            </Link>
            <div className="border-t pt-4">
              <LanguageSwitcher />
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-recoai-gray hover:text-recoai-purple">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-recoai-purple hover:bg-recoai-purple/90 text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default LandingNavbar;
