
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, DollarSign, Calendar, Target, Star } from "lucide-react";

const CLVPrediction: React.FC = () => {
  // Mock data - in a real app, this would come from your API
  const clvData = {
    averageCLV: 890.50,
    predictedCLV: 1250.30,
    clvGrowth: 15.2,
    totalCustomers: 2847,
    highValueCustomers: 342,
    riskOfChurn: 23
  };

  const customerSegments = [
    { segment: 'High Value', count: 342, avgCLV: 1890.50, color: 'bg-green-500' },
    { segment: 'Medium Value', count: 1205, avgCLV: 750.30, color: 'bg-yellow-500' },
    { segment: 'Low Value', count: 1300, avgCLV: 290.20, color: 'bg-red-500' }
  ];

  const clvPredictions = [
    { customerId: 'CUST-2024-001', name: 'Sarah Johnson', currentCLV: 1250, predictedCLV: 1890, risk: 'Low', segment: 'High Value' },
    { customerId: 'CUST-2024-002', name: 'Mike Chen', currentCLV: 680, predictedCLV: 920, risk: 'Medium', segment: 'Medium Value' },
    { customerId: 'CUST-2024-003', name: 'Emily Rodriguez', currentCLV: 1450, predictedCLV: 2100, risk: 'Low', segment: 'High Value' },
    { customerId: 'CUST-2024-004', name: 'David Thompson', currentCLV: 320, predictedCLV: 480, risk: 'High', segment: 'Low Value' },
    { customerId: 'CUST-2024-005', name: 'Lisa Wang', currentCLV: 890, predictedCLV: 1200, risk: 'Medium', segment: 'Medium Value' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CLV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${clvData.averageCLV.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current customer base</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted CLV</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${clvData.predictedCLV.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{clvData.clvGrowth}% projected growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Value Customers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clvData.highValueCustomers}</div>
            <p className="text-xs text-muted-foreground">Top tier customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Risk</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clvData.riskOfChurn}%</div>
            <Progress value={clvData.riskOfChurn} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments by CLV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{segment.count} customers</div>
                      <div className="text-xs text-muted-foreground">${segment.avgCLV} avg CLV</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${segment.color}`}></div>
                    <Progress value={(segment.count / clvData.totalCustomers) * 100} className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {((segment.count / clvData.totalCustomers) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CLV Growth Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Purchase Frequency</span>
                <div className="flex items-center space-x-2">
                  <Progress value={75} className="w-20" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Order Value</span>
                <div className="flex items-center space-x-2">
                  <Progress value={68} className="w-20" />
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Retention</span>
                <div className="flex items-center space-x-2">
                  <Progress value={82} className="w-20" />
                  <span className="text-sm font-medium">82%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Product Engagement</span>
                <div className="flex items-center space-x-2">
                  <Progress value={71} className="w-20" />
                  <span className="text-sm font-medium">71%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Individual CLV Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clvPredictions.map((customer) => (
              <div key={customer.customerId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.customerId}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Current CLV</div>
                    <div className="font-medium">${customer.currentCLV}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Predicted CLV</div>
                    <div className="font-medium">${customer.predictedCLV}</div>
                  </div>
                  <Badge className={getRiskColor(customer.risk)}>{customer.risk} Risk</Badge>
                  <Badge variant="secondary">{customer.segment}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CLVPrediction;
