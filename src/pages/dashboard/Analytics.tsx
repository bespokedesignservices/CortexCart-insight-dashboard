
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-recoai-gray">Track and analyze your business performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Detailed traffic analysis will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Conversion and engagement metrics will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Revenue and sales reports will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Customer behavior insights will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
