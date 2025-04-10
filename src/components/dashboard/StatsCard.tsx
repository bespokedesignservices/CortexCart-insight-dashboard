
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-recoai-gray">{title}</CardTitle>
        <div className="h-8 w-8 rounded bg-recoai-purple/10 p-1.5 text-recoai-purple">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center mt-1">
            {change > 0 ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <p
              className={cn(
                "text-sm font-medium",
                change > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {Math.abs(change)}% from last month
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
