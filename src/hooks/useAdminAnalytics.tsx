
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PageViewSummary {
  total: number;
  dailyViews: { date: string; count: number }[];
}

interface TopPage {
  url: string;
  count: number;
}

interface ClickSummary {
  total: number;
  byElement: { element: string; count: number }[];
}

interface TrackingEvent {
  id: string;
  store_id: string;
  event_type: string;
  event_data: any;
  timestamp: string;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
}

export const useAdminAnalytics = () => {
  const [pageViewSummary, setPageViewSummary] = useState<PageViewSummary | null>(null);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [clickSummary, setClickSummary] = useState<ClickSummary | null>(null);
  const [recentEvents, setRecentEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const baseUrl = `${window.location.origin}/functions/v1/admin-stats`;
      
      // Fetch all analytics data in parallel
      const [pageViewsRes, topPagesRes, clicksRes, recentRes] = await Promise.all([
        fetch(`${baseUrl}/page-views-summary`),
        fetch(`${baseUrl}/top-pages`),
        fetch(`${baseUrl}/click-event-summary`),
        fetch(`${baseUrl}/recent`)
      ]);

      if (pageViewsRes.ok) {
        const data = await pageViewsRes.json();
        setPageViewSummary(data);
      }

      if (topPagesRes.ok) {
        const data = await topPagesRes.json();
        setTopPages(data);
      }

      if (clicksRes.ok) {
        const data = await clicksRes.json();
        setClickSummary(data);
      }

      if (recentRes.ok) {
        const data = await recentRes.json();
        setRecentEvents(data);
      }

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    pageViewSummary,
    topPages,
    clickSummary,
    recentEvents,
    isLoading,
    refetch: fetchAnalytics
  };
};
