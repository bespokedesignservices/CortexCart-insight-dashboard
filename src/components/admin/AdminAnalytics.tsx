
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Eye, 
  MousePointer, 
  Clock, 
  RefreshCw,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import { useAdminAnalytics } from '@/hooks/useAdminAnalytics';

const AdminAnalytics: React.FC = () => {
  const {
    pageViewSummary,
    topPages,
    clickSummary,
    recentEvents,
    isLoading,
    refetch
  } = useAdminAnalytics();

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return <Eye className="h-4 w-4" />;
      case 'click':
      case 'user_interaction':
        return <MousePointer className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time tracking data and insights</p>
        </div>
        <Button onClick={refetch} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pageViewSummary?.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              All time page views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clickSummary?.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              All user interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentEvents.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Latest 50 events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Page Views (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageViewSummary?.dailyViews || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#6C47FF" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Clicked Elements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clickSummary?.byElement || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="element" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6C47FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Most Visited Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topPages.slice(0, 10).map((page, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium truncate">{page.url}</p>
                </div>
                <Badge variant="secondary">{page.count} views</Badge>
              </div>
            ))}
            {topPages.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No page view data available yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(event.event_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{event.event_type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {event.store_id}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {JSON.stringify(event.event_data)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(event.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {recentEvents.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No recent events available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
