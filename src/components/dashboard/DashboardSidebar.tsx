
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart2,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      path: "/dashboard/analytics",
    },
    {
      title: "Products",
      icon: ShoppingCart,
      path: "/dashboard/products",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/dashboard/customers",
    },
    {
      title: "Sales Platforms",
      icon: ShoppingCart,
      path: "/dashboard/sales-platforms",
      badgeName: "Growth Plan",
    },
    {
      title: "Social Media Manager",
      icon: Linkedin,
      path: "/dashboard/social-media-manager",
      badgeName: "Elite Plan",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">RecoAI</span>
        </Link>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                <Link to={item.path} className="flex items-center space-x-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badgeName && (
                    <Badge variant="secondary" className="ml-auto truncate max-w-[5rem]">
                      {item.badgeName}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-recoai-gray hover:text-recoai-darkGray">
              <Link to="/help" className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-recoai-gray hover:text-recoai-darkGray">
              <Link to="/login" className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

