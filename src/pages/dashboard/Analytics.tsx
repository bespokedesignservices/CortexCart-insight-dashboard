
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart, ArrowUp, ArrowDown, TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
import { useTrackingData } from "@/hooks/useTrackingData";

const Analytics: React.FC = () => {
  const { visitorsCount, visitorsDiff, chartData, hasData } = useTrackingData();

  // Generic no data content for reuse
  const NoDataContent = ({ title, description }: { title: string, description: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <TrendingUp className="h-12 w-12 text-recoai-gray mb-2" />
      <p className="text-recoai-gray font-medium">{title}</p>
      <p className="text-sm text-recoai-gray">{description}</p>
    </div>
  );

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
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  <span className="font-medium">AI Insight:</span> Your site has seen a {visitorsDiff >= 0 ? 'positive' : 'negative'} trend in visitors over the past week.
                  {visitorsDiff >= 0 
                    ? ' Keep enhancing your content and outreach for continued growth.' 
                    : ' Consider reviewing your marketing strategies to attract more visitors.'}
                </p>
              </div>
            ) : (
              <NoDataContent 
                title="No traffic data available" 
                description="Once you've installed the tracking widget, personalized traffic insights will appear here." 
              />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Conversion Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Conversion Rate</p>
                  <span className="font-bold text-2xl">3.2%</span>
                </div>
                <div className="h-[200px] w-full">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  <span className="font-medium">AI Insight:</span> Your conversion rate is performing well compared to industry standards. Continue optimizing your checkout process for better results.
                </p>
              </div>
            ) : (
              <NoDataContent 
                title="No conversion data available" 
                description="Check back soon for insights on your conversion metrics." 
              />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Revenue</p>
                  <span className="font-bold text-2xl">$12,540</span>
                </div>
                <div className="h-[200px] w-full">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  <span className="font-medium">AI Insight:</span> Your revenue has increased by 8% compared to last month. Best selling products are making a significant contribution.
                </p>
              </div>
            ) : (
              <NoDataContent 
                title="No revenue data available" 
                description="Check back soon for revenue insights once your tracking widget collects sales data." 
              />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Repeat Customers</p>
                  <span className="font-bold text-2xl">42%</span>
                </div>
                <div className="h-[200px] w-full">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-recoai-gray">
                  <span className="font-medium">AI Insight:</span> Your loyal customer base is growing. Consider implementing a loyalty program to further encourage repeat purchases.
                </p>
              </div>
            ) : (
              <NoDataContent 
                title="No customer data available" 
                description="Check back soon for customer behavior insights once your tracking widget collects more data." 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
