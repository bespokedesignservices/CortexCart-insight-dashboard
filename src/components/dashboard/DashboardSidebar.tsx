
import React from "react";
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Activity,
  ShoppingBag,
  MessageSquare,
  CreditCard,
  TrendingUp,
  LineChart,
  ListChecks,
  Bell,
  Mail,
  HelpCircle,
  LucideIcon,
  ChevronsLeft,
  ChevronsRight,
  BadgeCheck,
} from "lucide-react";
import { NavItem } from "@/components/ui/nav-item";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string;
}

const sidebarItems: SidebarItemProps[] = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/analytics", icon: LineChart, label: "Analytics" },
  { href: "/dashboard/products", icon: ShoppingBag, label: "Products" },
  { href: "/dashboard/customers", icon: Users, label: "Customers" },
  { href: "/dashboard/sales-platforms", icon: CreditCard, label: "Sales Platforms" },
  { href: "/dashboard/social-media-manager", icon: MessageSquare, label: "Social Media Manager", badge: "New" },
  { href: "/dashboard/investors", icon: TrendingUp, label: "Investors" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const DashboardSidebar: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`flex flex-col h-screen bg-white border-r shadow-sm ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-200 fixed left-0 z-30`}>
      <div className="flex items-center justify-between py-3 px-4">
        <span className={`font-bold text-xl ${isCollapsed ? 'hidden' : 'block'}`}>RecoAI</span>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </div>

      <Separator />

      <div className="flex-grow p-4 flex flex-col overflow-y-auto">
        <nav className="flex flex-col space-y-0.5">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              collapsed={isCollapsed}
            >
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
            </NavItem>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="space-y-2">
          <NavItem href="/help" icon={HelpCircle} label="Help" collapsed={isCollapsed} />
        </div>

        <div className="mt-auto">
          <Separator className="mb-4" />
          {!isCollapsed && (
            <div className="flex items-center justify-between">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">shadcn</span>
                <span className="text-xs text-gray-500">@shadcn</span>
              </div>
              <Switch id="airplane-mode" />
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
