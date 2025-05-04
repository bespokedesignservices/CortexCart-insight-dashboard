
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { useTrackingData } from "@/hooks/useTrackingData";

const Analytics: React.FC = () => {
  const { visitorsCount, visitorsDiff, chartData, hasData } = useTrackingData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-recoai-gray">Track and analyze your business performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Traffic Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Visitors</p>
                  <div className="flex items-center">
                    <span className="font-bold text-2xl">{visitorsCount}</span>
                    <span className={`ml-2 flex items-center text-xs ${visitorsDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {visitorsDiff >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(visitorsDiff)}%
                    </span>
                  </div>
                </div>
                <div className="h-[200px] w-full">
                  {/* This is a placeholder for the traffic chart that would be implemented with data */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  Your site has seen a {visitorsDiff >= 0 ? 'positive' : 'negative'} trend in visitors over the past week.
                  {visitorsDiff >= 0 
                    ? ' Keep enhancing your content and outreach for continued growth.' 
                    : ' Consider reviewing your marketing strategies to attract more visitors.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TrendingUp className="h-12 w-12 text-recoai-gray mb-2" />
                <p className="text-recoai-gray font-medium">No data available</p>
                <p className="text-sm text-recoai-gray">Come back soon to get personalized traffic insights.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Conversion Rate</p>
                  <span className="font-bold text-2xl">3.2%</span>
                </div>
                <div className="h-[200px] w-full">
                  {/* This is a placeholder for the conversion chart */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  Your conversion rate is performing well compared to industry standards. Continue optimizing your checkout process for better results.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TrendingUp className="h-12 w-12 text-recoai-gray mb-2" />
                <p className="text-recoai-gray font-medium">No data available</p>
                <p className="text-sm text-recoai-gray">Check back soon for insights on your conversion metrics.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Revenue</p>
                  <span className="font-bold text-2xl">$12,540</span>
                </div>
                <div className="h-[200px] w-full">
                  {/* This is a placeholder for the revenue chart */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  Your revenue has increased by 8% compared to last month. Best selling products are making a significant contribution.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TrendingUp className="h-12 w-12 text-recoai-gray mb-2" />
                <p className="text-recoai-gray font-medium">No data available</p>
                <p className="text-sm text-recoai-gray">Check back soon for revenue insights.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Repeat Customers</p>
                  <span className="font-bold text-2xl">42%</span>
                </div>
                <div className="h-[200px] w-full">
                  {/* This is a placeholder for the customer insights chart */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  Your loyal customer base is growing. Consider implementing a loyalty program to further encourage repeat purchases.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TrendingUp className="h-12 w-12 text-recoai-gray mb-2" />
                <p className="text-recoai-gray font-medium">No data available</p>
                <p className="text-sm text-recoai-gray">Check back soon for customer behavior insights.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
