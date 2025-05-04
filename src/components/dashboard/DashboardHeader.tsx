
import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { NavItem } from "@/components/ui/nav-item";
import { Bell, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-recoai-gray">
          Welcome back, {userName}! Here's an overview of your store's performance.
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-1">
            <NavigationMenuItem>
              <NavItem href="/dashboard/notifications" label="Notifications" icon={Bell} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/dashboard/settings" label="Settings" icon={Settings} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/dashboard/account" label="Profile" icon={User} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
