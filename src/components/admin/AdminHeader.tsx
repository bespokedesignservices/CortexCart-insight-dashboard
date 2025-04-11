
import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminHeader: React.FC = () => {
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-recoai-darkGray hidden md:block">Admin Dashboard</h1>
        
        <div className="flex-1 mx-4 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-recoai-purple" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
