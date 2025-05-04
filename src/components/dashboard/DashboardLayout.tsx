
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Generate a page title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") return "Dashboard";
    
    const segments = path.split('/');
    if (segments.length > 2) {
      // Capitalize the last segment for the title
      const lastSegment = segments[segments.length - 1];
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    
    return "Dashboard";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex w-full bg-recoai-lightGray p-8">
        <div className="w-full max-w-7xl mx-auto">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          <Skeleton className="h-64 mt-8" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Extract userName from user object using properties that exist on the User type
  const userName = user.email?.split('@')[0] || "User";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-recoai-lightGray">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader userName={userName} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">{getPageTitle()}</h1>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
