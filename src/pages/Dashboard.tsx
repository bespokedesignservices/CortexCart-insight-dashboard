
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackerAPI from "@/components/dashboard/TrackerAPI";
import WidgetCode from "@/components/dashboard/WidgetCode";
import WidgetSettings from "@/components/dashboard/WidgetSettings";
import StatsSummary from "@/components/dashboard/StatsSummary";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentEvents from "@/components/dashboard/RecentEvents";
import ProductsListing from "@/components/dashboard/ProductsListing";
import AIInsights from "@/components/dashboard/AIInsights";
import AbandonedCartRecovery from "@/components/dashboard/AbandonedCartRecovery";
import CLVPrediction from "@/components/dashboard/CLVPrediction";
import MobileAnalytics from "@/components/dashboard/MobileAnalytics";
import MarketingPlatforms from "@/components/dashboard/MarketingPlatforms";
import { useTrackingData } from "@/hooks/useTrackingData";
import { useLanguage } from "@/context/LanguageContext";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const {
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
    hasData
  } = useTrackingData();

  return (
    <div className="space-y-6">
      {/* Include the TrackerAPI component to handle tracking requests */}
      <TrackerAPI />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.welcome')}</h1>
        <p className="text-muted-foreground">{t('dashboard.overview')}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="cart-recovery">Cart Recovery</TabsTrigger>
          <TabsTrigger value="clv">Customer LTV</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Analytics</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats Summary */}
          <StatsSummary
            visitorsCount={visitorsCount}
            visitorsDiff={visitorsDiff}
            conversionRate={conversionRate}
            conversionDiff={conversionDiff}
            salesCount={salesCount}
            salesDiff={salesDiff}
            activeCustomers={activeCustomers}
            customersDiff={customersDiff}
          />

          {/* Performance Chart and Widget Code */}
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceChart chartData={chartData} hasData={hasData} />
            <WidgetCode />
          </div>

          {/* Recent Events */}
          <RecentEvents recentEvents={recentEvents} />

          {/* AI Insights and Widget Settings */}
          <div className="grid gap-6 md:grid-cols-2">
            <AIInsights hasData={hasData} products={products} />
            <WidgetSettings />
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="mt-6">
          <MarketingPlatforms />
        </TabsContent>

        <TabsContent value="cart-recovery" className="mt-6">
          <AbandonedCartRecovery />
        </TabsContent>

        <TabsContent value="clv" className="mt-6">
          <CLVPrediction />
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <MobileAnalytics />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductsListing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
