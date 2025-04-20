
// We add routes for the new pages under /dashboard/account and /dashboard/notifications, also for the new sales platforms and social media manager paths.

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Integrations from "./pages/Integrations";
import Roadmap from "./pages/Roadmap";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Analytics from "./pages/dashboard/Analytics";
import Products from "./pages/dashboard/Products";
import Customers from "./pages/dashboard/Customers";
import Settings from "./pages/dashboard/Settings";
import Investors from "./pages/dashboard/Investors";
import Help from "./pages/Help";

import SalesPlatforms from "./pages/dashboard/SalesPlatforms";
import SocialMediaManager from "./pages/dashboard/SocialMediaManager";

import AccountSettings from "./pages/dashboard/account";
import Username from "./pages/dashboard/account/Username";
import Password from "./pages/dashboard/account/Password";
import Profile from "./pages/dashboard/account/Profile";

import NotificationSettings from "./pages/dashboard/notifications";
import PushNotifications from "./pages/dashboard/notifications/Push";
import EmailNotifications from "./pages/dashboard/notifications/Email";
import TextNotifications from "./pages/dashboard/notifications/Text";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="sales-platforms" element={<SalesPlatforms />} />
            <Route path="social-media-manager" element={<SocialMediaManager />} />
            <Route path="settings" element={<Settings />} />
            
            {/* Account settings nested */}
            <Route path="account" element={<AccountSettings />}>
              <Route path="username" element={<Username />} />
              <Route path="password" element={<Password />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Notifications nested */}
            <Route path="notifications" element={<NotificationSettings />}>
              <Route path="push" element={<PushNotifications />} />
              <Route path="email" element={<EmailNotifications />} />
              <Route path="text" element={<TextNotifications />} />
            </Route>

            <Route path="investors" element={<Investors />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
