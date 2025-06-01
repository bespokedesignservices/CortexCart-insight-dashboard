
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
import Guides from "./pages/Guides";

import SalesPlatforms from "./pages/dashboard/SalesPlatforms";
import SocialMediaManager from "./pages/dashboard/SocialMediaManager";
import AITools from "./pages/dashboard/AITools";

import AccountSettings from "./pages/dashboard/account";
import Username from "./pages/dashboard/account/Username";
import Password from "./pages/dashboard/account/Password";
import Profile from "./pages/dashboard/account/Profile";

import NotificationSettings from "./pages/dashboard/notifications";
import PushNotifications from "./pages/dashboard/notifications/Push";
import EmailNotifications from "./pages/dashboard/notifications/Email";
import TextNotifications from "./pages/dashboard/notifications/Text";

// Security settings 
import SecuritySettings from "./pages/dashboard/security";
import TwoFactor from "./pages/dashboard/security/TwoFactor";
import SecurityQuestions from "./pages/dashboard/security/SecurityQuestions";
import ActiveSessions from "./pages/dashboard/security/ActiveSessions";

// Billing settings 
import BillingSettings from "./pages/dashboard/billing";
import Subscription from "./pages/dashboard/billing/Subscription";
import PaymentMethods from "./pages/dashboard/billing/PaymentMethods";
import BillingHistory from "./pages/dashboard/billing/BillingHistory";
import Receipts from "./pages/dashboard/billing/Receipts";

// Add the route for the Stripe settings in the admin area
import AdminStripeSettings from "./pages/admin/AdminStripeSettings";
import AdminAISettings from "./pages/admin/AdminAISettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
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
              <Route path="/guides" element={<Guides />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="products" element={<Products />} />
                <Route path="customers" element={<Customers />} />
                <Route path="sales-platforms" element={<SalesPlatforms />} />
                <Route path="social-media-manager" element={<SocialMediaManager />} />
                <Route path="ai-tools" element={<AITools />} />
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

                {/* Security nested */}
                <Route path="security" element={<SecuritySettings />}>
                  <Route path="2fa" element={<TwoFactor />} />
                  <Route path="password" element={<SecurityQuestions />} />
                  <Route path="sessions" element={<ActiveSessions />} />
                </Route>

                {/* Billing nested */}
                <Route path="billing" element={<BillingSettings />}>
                  <Route path="subscription" element={<Subscription />} />
                  <Route path="payment-methods" element={<PaymentMethods />} />
                  <Route path="invoices" element={<BillingHistory />} />
                  <Route path="receipts" element={<Receipts />} />
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
                <Route path="stripe-settings" element={<AdminStripeSettings />} />
                <Route path="ai-settings" element={<AdminAISettings />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
