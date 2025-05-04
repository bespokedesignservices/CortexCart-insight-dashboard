
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
  LineChart as LineChartIcon,
  Check
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
import { Button } from "@/components/ui/button";

interface TrackingEvent {
  storeId: string;
  event: string;
  data: any;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  price: string;
  sales: number;
  views: number;
  image?: string;
}

const Dashboard: React.FC = () => {
  // State for tracked data
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [prevMonthVisitors, setPrevMonthVisitors] = useState<number | null>(null);
  const [visitorsDiff, setVisitorsDiff] = useState<number | null>(null);
  const [conversionRate, setConversionRate] = useState(0);
  const [prevMonthConversion, setPrevMonthConversion] = useState<number | null>(null);
  const [conversionDiff, setConversionDiff] = useState<number | null>(null);
  const [salesCount, setSalesCount] = useState(0);
  const [prevMonthSales, setPrevMonthSales] = useState<number | null>(null);
  const [salesDiff, setSalesDiff] = useState<number | null>(null);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [prevMonthCustomers, setPrevMonthCustomers] = useState<number | null>(null);
  const [customersDiff, setCustomersDiff] = useState<number | null>(null);
  const [recentEvents, setRecentEvents] = useState<TrackingEvent[]>([]);
  const [chartData, setChartData] = useState([
    { name: "Jan", visitors: 0, sales: 0 },
    { name: "Feb", visitors: 0, sales: 0 },
    { name: "Mar", visitors: 0, sales: 0 },
    { name: "Apr", visitors: 0, sales: 0 },
    { name: "May", visitors: 0, sales: 0 },
    { name: "Jun", visitors: 0, sales: 0 },
    { name: "Jul", visitors: 0, sales: 0 },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();
  
  // Track if widget code has been copied
  const [codeCopied, setCodeCopied] = useState(false);

  // Handler for copying widget code
  const handleCopyCode = () => {
    // We'll implement this in the WidgetCode component
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 3000);
  };

  // Setup initial mock data if no real data
  useEffect(() => {
    if (!hasData) {
      // Simulate some initial data
      const initialChartData = [
        { name: "Jan", visitors: Math.floor(Math.random() * 500) + 500, sales: Math.floor(Math.random() * 20) + 10 },
        { name: "Feb", visitors: Math.floor(Math.random() * 500) + 600, sales: Math.floor(Math.random() * 20) + 15 },
        { name: "Mar", visitors: Math.floor(Math.random() * 500) + 700, sales: Math.floor(Math.random() * 20) + 20 },
        { name: "Apr", visitors: Math.floor(Math.random() * 500) + 800, sales: Math.floor(Math.random() * 20) + 25 },
        { name: "May", visitors: Math.floor(Math.random() * 500) + 900, sales: Math.floor(Math.random() * 20) + 30 },
        { name: "Jun", visitors: Math.floor(Math.random() * 500) + 1000, sales: Math.floor(Math.random() * 20) + 35 },
        { name: "Jul", visitors: Math.floor(Math.random() * 500) + 1100, sales: Math.floor(Math.random() * 20) + 40 },
      ];
      setChartData(initialChartData);
      
      // Set initial counters
      const totalVisitors = initialChartData.reduce((sum, month) => sum + month.visitors, 0);
      const totalSales = initialChartData.reduce((sum, month) => sum + month.sales, 0);
      
      setVisitorsCount(totalVisitors);
      setSalesCount(totalSales);
      setActiveCustomers(Math.floor(totalVisitors * 0.1)); // Assume 10% become active customers
      setConversionRate(parseFloat((totalSales / totalVisitors * 100).toFixed(2)));
      
      // Set previous month metrics for comparisons
      setPrevMonthVisitors(initialChartData[5].visitors);
      setPrevMonthSales(initialChartData[5].sales);
      setPrevMonthCustomers(Math.floor(initialChartData[5].visitors * 0.1));
      setPrevMonthConversion(parseFloat((initialChartData[5].sales / initialChartData[5].visitors * 100).toFixed(2)));
      
      // Calculate differences
      const currentMonth = initialChartData[6];
      const prevMonth = initialChartData[5];
      
      setVisitorsDiff(parseFloat(((currentMonth.visitors - prevMonth.visitors) / prevMonth.visitors * 100).toFixed(1)));
      setSalesDiff(parseFloat(((currentMonth.sales - prevMonth.sales) / prevMonth.sales * 100).toFixed(1)));
      setCustomersDiff(parseFloat(((Math.floor(currentMonth.visitors * 0.1) - Math.floor(prevMonth.visitors * 0.1)) / Math.floor(prevMonth.visitors * 0.1) * 100).toFixed(1)));
      
      const currConv = currentMonth.sales / currentMonth.visitors * 100;
      const prevConv = prevMonth.sales / prevMonth.visitors * 100;
      setConversionDiff(parseFloat(((currConv - prevConv) / prevConv * 100).toFixed(1)));
      
      // Set initial example products
      setProducts([
        { id: 'prod_001', name: 'Premium Watch', price: '$249.99', sales: 42, views: 360, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60' },
        { id: 'prod_002', name: 'Designer Sunglasses', price: '$129.99', sales: 38, views: 410, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop&q=60' },
        { id: 'prod_003', name: 'Minimalist Lamp', price: '$89.99', sales: 27, views: 290, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&auto=format&fit=crop&q=60' },
        { id: 'prod_004', name: 'Sports Sneakers', price: '$159.99', sales: 34, views: 325, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60' },
      ]);
    }
  }, [hasData]);

  // Update the visitors in real-time
  useEffect(() => {
    // Listen for tracking events
    const handleTrackingEvent = (e: any) => {
      const eventData = e.detail as TrackingEvent;
      console.log('Dashboard received event:', eventData);
      
      // Set hasData to true once we get real data
      if (!hasData) setHasData(true);
      
      // Add to recent events
      setRecentEvents(prev => [eventData, ...prev].slice(0, 20));
      
      // Update stats based on event type
      switch(eventData.event) {
        case 'visitor_info':
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
            description: `Page view on ${eventData.data?.title || eventData.data?.url || 'unknown page'}`,
          });
          break;
          
        case 'user_interaction':
        case 'click':
          setActiveCustomers(prev => prev + 1);
          
          toast({
            title: "User Interaction",
            description: `Click on ${eventData.data?.element || 'element'}: ${eventData.data?.text?.substring(0, 20) || ''}`,
          });
          break;
          
        case 'add_to_cart':
          setConversionRate(prev => +(prev + 0.01).toFixed(2));
          
          // Update products data if we have a matching product
          if (eventData.data?.product_id) {
            setProducts(prev => 
              prev.map(product => 
                product.id === eventData.data.product_id
                  ? { ...product, sales: product.sales + 1 }
                  : product
              )
            );
          }
          
          toast({
            title: "Cart Updated",
            description: `${eventData.data?.product || 'Item'} added to cart`,
          });
          break;
          
        case 'purchase':
        case 'begin_checkout':
          setSalesCount(prev => prev + 1);
          
          // Update chart data for sales
          setChartData(prev => {
            const lastMonth = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMonth, sales: lastMonth.sales + 1 }
            ];
          });
          
          toast({
            title: "Purchase",
            description: `New purchase completed`,
          });
          break;
          
        case 'product_impressions':
          // Update view counts for products
          if (eventData.data?.products) {
            const productViews = eventData.data.products;
            setProducts(prev => 
              prev.map(product => {
                const matchingView = productViews.find(
                  (p: any) => p.product_id === product.id
                );
                return matchingView
                  ? { ...product, views: product.views + 1 }
                  : product;
              })
            );
          }
          break;
      }
    };
    
    window.addEventListener('recoai-event', handleTrackingEvent);
    
    return () => {
      window.removeEventListener('recoai-event', handleTrackingEvent);
    };
  }, [toast, hasData]);
  
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
          value={visitorsCount > 0 ? visitorsCount.toLocaleString() : "No data"}
          icon={<Eye />}
          change={visitorsDiff}
        />
        <StatsCard
          title="Conversion Rate"
          value={conversionRate > 0 ? `${conversionRate}%` : "No data"}
          icon={<ArrowUpRight />}
          change={conversionDiff}
        />
        <StatsCard
          title="Total Sales"
          value={salesCount > 0 ? `$${(salesCount * 100).toLocaleString()}` : "No data"}
          icon={<ShoppingCart />}
          change={salesDiff}
        />
        <StatsCard
          title="Active Customers"
          value={activeCustomers > 0 ? activeCustomers.toLocaleString() : "No data"}
          icon={<Users />}
          change={customersDiff}
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

      {/* Products Table Component */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
          <CardDescription>
            Your best selling products based on tracking data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2 pl-0">Product</th>
                    <th className="text-left font-medium p-2">Price</th>
                    <th className="text-left font-medium p-2">Views</th>
                    <th className="text-left font-medium p-2">Sales</th>
                    <th className="text-left font-medium p-2">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const convRate = product.views > 0 
                      ? ((product.sales / product.views) * 100).toFixed(1) 
                      : "0.0";
                      
                    return (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 pl-0">
                          <div className="flex items-center">
                            {product.image && (
                              <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.views}</td>
                        <td>{product.sales}</td>
                        <td>{convRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No product data available yet. Add the tracking widget to collect product performance data.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <LineChartIcon className="mr-2 h-5 w-5 text-recoai-purple" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasData || products.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-recoai-purple/5 border border-recoai-purple/20 rounded-md p-4">
                  <h3 className="font-medium text-recoai-darkGray mb-2">
                    Product Recommendation
                  </h3>
                  <p className="text-sm text-recoai-gray">
                    Customers who purchase "{products.length > 0 ? products[0].name : 'Premium Product'}" also frequently buy "{products.length > 1 ? products[1].name : 'Related Product'}". Consider creating a bundle offer to increase average order value.
                  </p>
                </div>
                <div className="bg-recoai-blue/5 border border-recoai-blue/20 rounded-md p-4">
                  <h3 className="font-medium text-recoai-darkGray mb-2">
                    Traffic Insight
                  </h3>
                  <p className="text-sm text-recoai-gray">
                    Your mobile traffic increased by 28% this month, but your mobile conversion rate is 15% lower than desktop. Consider optimizing your mobile checkout experience to improve conversion rates.
                  </p>
                </div>
                <div className="bg-recoai-teal/5 border border-recoai-teal/20 rounded-md p-4">
                  <h3 className="font-medium text-recoai-darkGray mb-2">
                    Pricing Strategy
                  </h3>
                  <p className="text-sm text-recoai-gray">
                    Price sensitivity analysis shows that increasing the price of "{products.length > 0 ? products[0].name : 'Your Best Seller'}" by 10% would likely not impact sales volume but would increase profit margins.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Not enough data to generate AI insights yet. Add the tracking widget to your site to start collecting data for personalized recommendations.
              </div>
            )}
          </CardContent>
        </Card>

        <WidgetSettings />
      </div>
    </div>
  );
};

export default Dashboard;
