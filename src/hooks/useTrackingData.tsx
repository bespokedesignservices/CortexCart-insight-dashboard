
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

interface ChartData {
  name: string;
  visitors: number;
  sales: number;
}

export const useTrackingData = () => {
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
  const [chartData, setChartData] = useState<ChartData[]>([
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

  return {
    visitorsCount,
    visitorsDiff,
    conversionRate,
    conversionDiff,
    salesCount,
    salesDiff,
    activeCustomers,
    customersDiff,
    recentEvents,
    chartData,
    products,
    hasData,
    codeCopied,
    setCodeCopied
  };
};
