
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Palette, Globe } from "lucide-react";
import ThemeCustomization from "@/components/dashboard/ThemeCustomization";
import { useLanguage } from "@/context/LanguageContext";

const Settings: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="cet">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Automatically update data every 5 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Welcome Message</Label>
                    <p className="text-sm text-muted-foreground">Display welcome message on dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/account/profile" className="flex items-center gap-2 hover:text-blue-600">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your personal information and profile picture.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/account/username" className="flex items-center gap-2 hover:text-blue-600">
                    <User className="h-4 w-4" />
                    Username
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Change your username and display name.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/account/password" className="flex items-center gap-2 hover:text-blue-600">
                    <Shield className="h-4 w-4" />
                    Password
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your account password and security settings.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/notifications/push" className="flex items-center gap-2 hover:text-blue-600">
                    <Bell className="h-4 w-4" />
                    Push Notifications
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configure browser push notifications.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/notifications/email" className="flex items-center gap-2 hover:text-blue-600">
                    <Bell className="h-4 w-4" />
                    Email Notifications
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage email notification preferences.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/notifications/text" className="flex items-center gap-2 hover:text-blue-600">
                    <Bell className="h-4 w-4" />
                    Text Notifications
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Set up SMS notifications for important events.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/security/2fa" className="flex items-center gap-2 hover:text-blue-600">
                    <Shield className="h-4 w-4" />
                    Two-Factor Auth
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Enable two-factor authentication for enhanced security.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/security/password" className="flex items-center gap-2 hover:text-blue-600">
                    <Shield className="h-4 w-4" />
                    Security Questions
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Set up security questions for account recovery.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/security/sessions" className="flex items-center gap-2 hover:text-blue-600">
                    <Shield className="h-4 w-4" />
                    Active Sessions
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View and manage your active login sessions.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/billing/subscription" className="flex items-center gap-2 hover:text-blue-600">
                    <CreditCard className="h-4 w-4" />
                    Subscription
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage your subscription plan and billing cycle.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/billing/payment-methods" className="flex items-center gap-2 hover:text-blue-600">
                    <CreditCard className="h-4 w-4" />
                    Payment Methods
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Add and manage your payment methods.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/billing/invoices" className="flex items-center gap-2 hover:text-blue-600">
                    <CreditCard className="h-4 w-4" />
                    Billing History
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View your billing history and download invoices.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Link to="/dashboard/billing/receipts" className="flex items-center gap-2 hover:text-blue-600">
                    <CreditCard className="h-4 w-4" />
                    Receipts
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Access and download your payment receipts.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <ThemeCustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
