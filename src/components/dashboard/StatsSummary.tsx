
import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Users, Eye, ShoppingCart, ArrowUpRight } from "lucide-react";

interface StatsSummaryProps {
  visitorsCount: number;
  visitorsDiff: number | null;
  conversionRate: number;
  conversionDiff: number | null;
  salesCount: number;
  salesDiff: number | null;
  activeCustomers: number;
  customersDiff: number | null;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({
  visitorsCount,
  visitorsDiff,
  conversionRate,
  conversionDiff,
  salesCount,
  salesDiff,
  activeCustomers,
  customersDiff
}) => {
  return (
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
  );
};

export default StatsSummary;
