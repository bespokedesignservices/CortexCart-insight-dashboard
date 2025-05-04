
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TrackingEvent {
  storeId: string;
  event: string;
  data: any;
  timestamp: Date;
}

interface RecentEventsProps {
  recentEvents: TrackingEvent[];
}

const RecentEvents: React.FC<RecentEventsProps> = ({ recentEvents }) => {
  return (
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
  );
};

export default RecentEvents;
