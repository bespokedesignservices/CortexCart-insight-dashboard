
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Analytics</CardTitle>
          <CardDescription>
            Insights and performance metrics for your social media accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-10 text-center text-gray-500">
            <p>Analytics data will appear once you connect your accounts and gather more data.</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
