
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-recoai-gray">Manage your customer relationships.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customer Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Your customer list will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Customer segmentation tools will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Customer engagement data will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Customer support management will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customers;
