
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TicketStats } from "@/types/customer-support";
import { Clock, CheckCircle, AlertCircle, HelpCircle, Ticket } from "lucide-react";

interface TicketsSummaryProps {
  stats: TicketStats;
}

export const TicketsSummary: React.FC<TicketsSummaryProps> = ({ stats }) => {
  // Calculate percentage of resolved tickets
  const resolvedPercentage = stats.total > 0 
    ? Math.round((stats.resolved + stats.closed) / stats.total * 100) 
    : 0;
    
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Support requests received</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <HelpCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.open}</div>
          <p className="text-xs text-muted-foreground">Awaiting agent response</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <AlertCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
          <p className="text-xs text-muted-foreground">Being worked on</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resolved + stats.closed}</div>
          <p className="text-xs text-muted-foreground">Successfully handled</p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Resolution Rate</CardTitle>
          <CardDescription>
            {resolvedPercentage}% of tickets have been resolved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={resolvedPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <div>0%</div>
            <div>50%</div>
            <div>100%</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Average Resolution Time</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {stats.averageResolutionTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p>Trending 10% faster than last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
