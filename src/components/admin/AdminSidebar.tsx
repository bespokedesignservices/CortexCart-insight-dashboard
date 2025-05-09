
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
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Pages",
      icon: FileText,
      path: "/admin/pages",
    },
    {
      title: "Media",
      icon: Image,
      path: "/admin/media",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Stripe Settings",
      icon: CreditCard,
      path: "/admin/stripe-settings",
    },
    {
      title: "AI Settings",
      icon: Sparkles,
      path: "/admin/ai-settings",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">RecoAI Admin</span>
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
            <SidebarMenuButton 
              asChild 
              className="text-recoai-gray hover:text-recoai-darkGray"
              onClick={onLogout}
            >
              <button className="flex items-center space-x-2 w-full text-left">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
