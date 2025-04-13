
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <p className="text-recoai-gray">Your account settings will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Notification settings will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Security settings will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Billing & Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Subscription and billing information will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
