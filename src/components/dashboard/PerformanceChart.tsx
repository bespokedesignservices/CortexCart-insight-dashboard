
import React from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartData {
  name: string;
  visitors: number;
  sales: number;
}

interface PerformanceChartProps {
  chartData: ChartData[];
  hasData: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ chartData, hasData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
        <CardDescription>
          Monitor your store's traffic and sales trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData || chartData.some(d => d.visitors > 0) ? (
          <Tabs defaultValue="traffic">
            <TabsList className="mb-4">
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>
            <TabsContent value="traffic" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#6C47FF" 
                    fill="#6C47FF20"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="sales" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#0FDDAF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-center">
            <div>
              <p className="text-muted-foreground mb-4">No performance data available yet</p>
              <p className="text-sm max-w-md mx-auto">
                Add the tracking widget to your website to start collecting data. 
                Real-time charts will be displayed once data is available.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
