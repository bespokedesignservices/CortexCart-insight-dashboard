
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
}

export const NavItem = ({ 
  href, 
  label, 
  icon: Icon, 
  active, 
  disabled, 
  children,
  collapsed 
}: NavItemProps) => {
  const isActive = active || window.location.pathname === href || window.location.pathname.startsWith(`${href}/`);

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
    >
      {Icon && collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Icon className="h-5 w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5" />}
          <span className={cn("grow", collapsed && "hidden")}>{label}</span>
          {children}
        </>
      )}
    </Link>
  );
};
