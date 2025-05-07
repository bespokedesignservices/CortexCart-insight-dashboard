
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CompletedView: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Platform Overview</CardTitle>
          <CardDescription>Track your sales performance across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="py-10 text-center text-gray-500">
            Your sales platform data is now configured. Real-time data will appear here as it becomes available.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              No data available yet. Performance metrics will be displayed as sales data is collected.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sales by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              Waiting for sales data across your platforms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletedView;
