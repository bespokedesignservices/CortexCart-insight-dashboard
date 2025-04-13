
import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const DashboardHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4 md:hidden" />
          <div className="relative hidden md:block max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-recoai-gray" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-gray-50 border-gray-200 w-[280px]"
              onClick={() => setOpen(true)}
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 border-gray-200 text-recoai-purple hover:text-recoai-purple hover:bg-recoai-purple/5"
            asChild
          >
            <Link to="/dashboard/investors">
              <TrendingUp className="h-4 w-4" />
              <span>Investors</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative border-gray-200 text-recoai-gray"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-recoai-purple text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" />
                  <AvatarFallback className="bg-recoai-purple text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/logout">
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across your dashboard..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard";
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard/analytics";
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard/products";
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Products</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard/customers";
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Customers</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard/settings";
            }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setOpen(false);
              window.location.href = "/dashboard/investors";
            }}>
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Investors</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default DashboardHeader;
