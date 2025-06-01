
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Tablet, Monitor, TrendingUp, Users, Clock } from "lucide-react";

const MobileAnalytics: React.FC = () => {
  // Mock data for mobile analytics
  const deviceData = {
    mobile: { users: 15847, percentage: 62.3, conversion: 2.8, engagement: 4.2 },
    tablet: { users: 4521, percentage: 17.8, conversion: 3.4, engagement: 5.1 },
    desktop: { users: 5032, percentage: 19.9, conversion: 4.2, engagement: 6.8 }
  };

  const retentionHeatmap = [
    { day: 'Day 1', retention: 85, color: 'bg-green-500' },
    { day: 'Day 3', retention: 62, color: 'bg-yellow-500' },
    { day: 'Day 7', retention: 48, color: 'bg-yellow-400' },
    { day: 'Day 14', retention: 35, color: 'bg-orange-500' },
    { day: 'Day 30', retention: 28, color: 'bg-red-500' },
  ];

  const conversionFunnel = [
    { stage: 'Visits', mobile: 15847, desktop: 5032, mobileConversion: 100, desktopConversion: 100 },
    { stage: 'Product Views', mobile: 12678, desktop: 4526, mobileConversion: 80, desktopConversion: 90 },
    { stage: 'Add to Cart', mobile: 3169, desktop: 1810, mobileConversion: 20, desktopConversion: 36 },
    { stage: 'Checkout', mobile: 1585, desktop: 1258, mobileConversion: 10, desktopConversion: 25 },
    { stage: 'Purchase', mobile: 444, desktop: 211, mobileConversion: 2.8, desktopConversion: 4.2 }
  ];

  const getRetentionColor = (retention: number) => {
    if (retention >= 70) return 'bg-green-500';
    if (retention >= 50) return 'bg-yellow-500';
    if (retention >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Enhanced Mobile Analytics</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pro Feature</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceData.mobile.users.toLocaleString()}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={deviceData.mobile.percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground">{deviceData.mobile.percentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {deviceData.mobile.conversion}% conversion • {deviceData.mobile.engagement}min avg session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tablet Users</CardTitle>
            <Tablet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceData.tablet.users.toLocaleString()}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={deviceData.tablet.percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground">{deviceData.tablet.percentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {deviceData.tablet.conversion}% conversion • {deviceData.tablet.engagement}min avg session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktop Users</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceData.desktop.users.toLocaleString()}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={deviceData.desktop.percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground">{deviceData.desktop.percentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {deviceData.desktop.conversion}% conversion • {deviceData.desktop.engagement}min avg session
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Retention Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {retentionHeatmap.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.day}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className={`h-2 rounded-full ${getRetentionColor(item.retention)}`}
                        style={{ width: `${item.retention}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-10">{item.retention}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile vs Desktop Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Session Duration</span>
                <div className="flex space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Mobile</div>
                    <div className="font-medium">{deviceData.mobile.engagement}min</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Desktop</div>
                    <div className="font-medium">{deviceData.desktop.engagement}min</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bounce Rate</span>
                <div className="flex space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Mobile</div>
                    <div className="font-medium">45%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Desktop</div>
                    <div className="font-medium">32%</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pages per Session</span>
                <div className="flex space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Mobile</div>
                    <div className="font-medium">2.8</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Desktop</div>
                    <div className="font-medium">4.2</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex space-x-6">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Mobile</div>
                      <div className="font-medium">{stage.mobile.toLocaleString()} ({stage.mobileConversion}%)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Desktop</div>
                      <div className="font-medium">{stage.desktop.toLocaleString()} ({stage.desktopConversion}%)</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Progress value={stage.mobileConversion} className="h-2" />
                  <Progress value={stage.desktopConversion} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAnalytics;
