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
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

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
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div className={`flex flex-col h-screen bg-white border-r shadow-sm w-full ${collapsed ? 'w-16' : 'w-60'} transition-all duration-200`}>
      <div className="flex items-center justify-between py-3 px-4">
        <span className="font-bold text-xl">RecoAI</span>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      <Separator />

      <div className="flex-grow p-4 flex flex-col">
        <nav className="flex flex-col space-y-0.5">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            >
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
            </NavItem>
          ))}
        </nav>

        <Separator className="my-4" />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="account">
            <AccordionTrigger>Account</AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col space-y-2">
                <NavItem href="/dashboard/account/profile" label="Profile" />
                <NavItem href="/dashboard/account/username" label="Username" />
                <NavItem href="/dashboard/account/password" label="Password" />
              </nav>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notifications">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col space-y-2">
                <NavItem href="/dashboard/notifications/push" label="Push" />
                <NavItem href="/dashboard/notifications/email" label="Email" />
                <NavItem href="/dashboard/notifications/text" label="Text" />
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-4" />

        <div className="space-y-2">
          <NavItem href="/help" icon={HelpCircle} label="Help" />
        </div>

        <div className="mt-auto">
          <Separator className="mb-4" />
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
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
