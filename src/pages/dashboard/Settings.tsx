
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Lock, 
  ShieldCheck, 
  UserCheck,
  Bell,
  Mail,
  MessageSquare,
  Shield,
  Key,
  CreditCard,
  FileText,
  Package,
  PackageOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-recoai-gray">Configure your dashboard preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard/account/username" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <User className="h-5 w-5 text-recoai-purple" />
                  <span>Change Username</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/account/password" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Lock className="h-5 w-5 text-recoai-purple" />
                  <span>Change Password</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/account/profile" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <UserCheck className="h-5 w-5 text-recoai-purple" />
                  <span>Complete Profile</span>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard/notifications/push" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Bell className="h-5 w-5 text-recoai-purple" />
                  <span>Push Notifications</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/notifications/email" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Mail className="h-5 w-5 text-recoai-purple" />
                  <span>Email Notifications</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/notifications/text" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <MessageSquare className="h-5 w-5 text-recoai-purple" />
                  <span>Text Notifications</span>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard/security/2fa" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <ShieldCheck className="h-5 w-5 text-recoai-purple" />
                  <span>Setup Two Factor Login</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/security/password" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Key className="h-5 w-5 text-recoai-purple" />
                  <span>Change Security Questions</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/security/sessions" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Shield className="h-5 w-5 text-recoai-purple" />
                  <span>Manage Active Sessions</span>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Billing &amp; Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard/billing/subscription" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <Package className="h-5 w-5 text-recoai-purple" />
                  <span>Manage Subscription</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/billing/payment-methods" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <CreditCard className="h-5 w-5 text-recoai-purple" />
                  <span>Payment Methods</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/billing/invoices" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <FileText className="h-5 w-5 text-recoai-purple" />
                  <span>Billing History</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/billing/receipts" className="flex items-center space-x-3 hover:text-recoai-purple no-underline">
                  <PackageOpen className="h-5 w-5 text-recoai-purple" />
                  <span>Receipts &amp; Downloads</span>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
