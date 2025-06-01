
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, TrendingUp, Mail, DollarSign, Users, Clock } from "lucide-react";

const AbandonedCartRecovery: React.FC = () => {
  // Mock data - in a real app, this would come from your API
  const recoveryStats = {
    totalAbandoned: 1247,
    recovered: 387,
    recoveryRate: 31.2,
    revenueRecovered: 15420,
    avgTimeToRecover: '4.2 hours',
    topProducts: [
      { name: 'Wireless Headphones', abandons: 89, recoveries: 28 },
      { name: 'Smart Watch', abandons: 67, recoveries: 21 },
      { name: 'Laptop Stand', abandons: 54, recoveries: 18 },
    ]
  };

  const recentRecoveries = [
    {
      id: 1,
      email: 'jane@example.com',
      value: 129.99,
      product: 'Wireless Headphones',
      method: 'Email Campaign',
      recoveredAt: '2 hours ago'
    },
    {
      id: 2,
      email: 'mike@example.com',
      value: 89.50,
      product: 'Smart Watch',
      method: 'Push Notification',
      recoveredAt: '5 hours ago'
    },
    {
      id: 3,
      email: 'sarah@example.com',
      value: 245.00,
      product: 'Laptop Stand',
      method: 'SMS Reminder',
      recoveredAt: '1 day ago'
    }
  ];

  const campaignPerformance = [
    { type: 'Email Campaign', sent: 1247, opened: 523, clicked: 156, recovered: 87, rate: 7.0 },
    { type: 'Push Notification', sent: 890, opened: 445, clicked: 134, recovered: 67, rate: 7.5 },
    { type: 'SMS Reminder', sent: 654, opened: 398, clicked: 89, recovered: 45, rate: 6.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Abandoned</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recoveryStats.totalAbandoned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recoveryStats.recoveryRate}%</div>
            <Progress value={recoveryStats.recoveryRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Recovered</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${recoveryStats.revenueRecovered.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Recovery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recoveryStats.avgTimeToRecover}</div>
            <p className="text-xs text-muted-foreground">Median time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{campaign.type}</span>
                    <Badge variant="secondary">{campaign.rate}% recovery</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                    <div>Sent: {campaign.sent}</div>
                    <div>Opened: {campaign.opened}</div>
                    <div>Clicked: {campaign.clicked}</div>
                    <div>Recovered: {campaign.recovered}</div>
                  </div>
                  <Progress value={campaign.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Abandoned Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recoveryStats.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.abandons} abandons
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.recoveries} recovered</div>
                    <div className="text-sm text-muted-foreground">
                      {((product.recoveries / product.abandons) * 100).toFixed(1)}% rate
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Recoveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRecoveries.map((recovery) => (
              <div key={recovery.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{recovery.email}</div>
                    <div className="text-sm text-muted-foreground">{recovery.product}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${recovery.value}</div>
                  <div className="text-sm text-muted-foreground">{recovery.method}</div>
                  <div className="text-xs text-muted-foreground">{recovery.recoveredAt}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AbandonedCartRecovery;
