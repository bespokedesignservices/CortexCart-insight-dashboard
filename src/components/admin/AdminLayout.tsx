
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-recoai-lightGray">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
