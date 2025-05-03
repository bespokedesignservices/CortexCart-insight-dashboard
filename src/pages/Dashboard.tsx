
import React, { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import WidgetCode from "@/components/dashboard/WidgetCode";
import ProductsTable from "@/components/dashboard/ProductsTable";
import WidgetSettings from "@/components/dashboard/WidgetSettings";
import TrackerAPI from "@/components/dashboard/TrackerAPI";
import { 
  Users,
  Eye,
  ShoppingCart,
  ArrowUpRight,
  Settings,
  LineChart as LineChartIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface TrackingEvent {
  storeId: string;
  event: string;
  data: any;
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  // State for tracked data
  const [visitorsCount, setVisitorsCount] = useState(24589);
  const [conversionRate, setConversionRate] = useState(3.2);
  const [salesCount, setSalesCount] = useState(12843);
  const [activeCustomers, setActiveCustomers] = useState(1432);
  const [recentEvents, setRecentEvents] = useState<TrackingEvent[]>([]);
  const { toast } = useToast();
  
  // Base chart data
  const [chartData, setChartData] = useState([
    { name: "Jan", visitors: 1200, sales: 48 },
    { name: "Feb", visitors: 1900, sales: 62 },
    { name: "Mar", visitors: 2400, sales: 75 },
    { name: "Apr", visitors: 2800, sales: 96 },
    { name: "May", visitors: 2600, sales: 92 },
    { name: "Jun", visitors: 3100, sales: 112 },
    { name: "Jul", visitors: 3600, sales: 126 },
  ]);

  // Update the visitors in real-time
  useEffect(() => {
    // Listen for tracking events
    const handleTrackingEvent = (e: any) => {
      const eventData = e.detail as TrackingEvent;
      console.log('Dashboard received event:', eventData);
      
      // Add to recent events
      setRecentEvents(prev => [eventData, ...prev].slice(0, 20));
      
      // Update stats based on event type
      switch(eventData.event) {
        case 'page_view':
          setVisitorsCount(prev => prev + 1);
          
          // Update chart data
          setChartData(prev => {
            const lastMonth = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMonth, visitors: lastMonth.visitors + 1 }
            ];
          });
          
          toast({
            title: "New Visitor",
            description: `Page view on ${eventData.data.title || 'unknown page'}`,
          });
          break;
          
        case 'click':
          setActiveCustomers(prev => prev + 1);
          break;
          
        case 'add_to_cart':
          setConversionRate(prev => +(prev + 0.01).toFixed(2));
          setSalesCount(prev => prev + Math.floor(Math.random() * 50) + 10);
          
          // Update chart data for sales
          setChartData(prev => {
            const lastMonth = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMonth, sales: lastMonth.sales + 1 }
            ];
          });
          
          toast({
            title: "Cart Updated",
            description: `${eventData.data.product} added to cart`,
          });
          break;
      }
    };
    
    window.addEventListener('recoai-event', handleTrackingEvent);
    
    return () => {
      window.removeEventListener('recoai-event', handleTrackingEvent);
    };
  }, [toast]);
  
  // Placeholder for user name - this would typically come from an auth context
  const userName = "John"; 

  return (
    <div className="space-y-6">
      {/* Include the TrackerAPI component to handle tracking requests */}
      <TrackerAPI />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-recoai-gray">
          Welcome back, {userName}! Here's an overview of your store's performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visitors"
          value={visitorsCount.toLocaleString()}
          icon={<Eye />}
          change={12}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<ArrowUpRight />}
          change={0.8}
        />
        <StatsCard
          title="Total Sales"
          value={`$${salesCount.toLocaleString()}`}
          icon={<ShoppingCart />}
          change={23}
        />
        <StatsCard
          title="Active Customers"
          value={activeCustomers.toLocaleString()}
          icon={<Users />}
          change={-5}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            <CardDescription>
              Monitor your store's traffic and sales trends
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <WidgetCode />
      </div>

      {/* Recent Tracking Events Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Tracking Events</CardTitle>
          <CardDescription>
            Live updates from your tracking widget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] overflow-y-auto space-y-2">
            {recentEvents.length > 0 ? (
              recentEvents.map((event, index) => (
                <div key={index} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.event}</span>
                    <span className="text-xs text-muted-foreground">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="text-xs bg-muted p-1 rounded-md mt-1 overflow-x-auto">
                    {JSON.stringify(event.data, null, 2)}
                  </pre>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No events recorded yet. Add the tracking widget to your site to see data.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductsTable />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <LineChartIcon className="mr-2 h-5 w-5 text-recoai-purple" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-recoai-purple/5 border border-recoai-purple/20 rounded-md p-4">
                <h3 className="font-medium text-recoai-darkGray mb-2">
                  Product Recommendation
                </h3>
                <p className="text-sm text-recoai-gray">
                  Customers who purchase "Premium Leather Wallet" also frequently buy "Minimalist Card Holder". Consider creating a bundle offer.
                </p>
              </div>
              <div className="bg-recoai-blue/5 border border-recoai-blue/20 rounded-md p-4">
                <h3 className="font-medium text-recoai-darkGray mb-2">
                  Traffic Insight
                </h3>
                <p className="text-sm text-recoai-gray">
                  Your mobile traffic increased by 28% this month, but your mobile conversion rate is 15% lower than desktop. Consider optimizing your mobile checkout experience.
                </p>
              </div>
              <div className="bg-recoai-teal/5 border border-recoai-teal/20 rounded-md p-4">
                <h3 className="font-medium text-recoai-darkGray mb-2">
                  Pricing Strategy
                </h3>
                <p className="text-sm text-recoai-gray">
                  Price sensitivity analysis shows that increasing the price of "Wireless Earbuds Pro" by 10% would likely not impact sales volume but would increase profit margins.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <WidgetSettings />
      </div>
    </div>
  );
};

export default Dashboard;
