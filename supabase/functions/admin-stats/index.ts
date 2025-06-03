
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const endpoint = url.pathname.split('/').pop()

    switch (endpoint) {
      case 'page-views-summary':
        const { data: pageViews } = await supabaseClient
          .from('tracking_events')
          .select('timestamp, event_data')
          .eq('event_type', 'page_view')
          .order('timestamp', { ascending: false })
          .limit(1000)

        // Group by day for the last 7 days
        const dailyViews = {}
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return date.toISOString().split('T')[0]
        }).reverse()

        last7Days.forEach(day => dailyViews[day] = 0)
        
        pageViews?.forEach(view => {
          const day = view.timestamp.split('T')[0]
          if (dailyViews.hasOwnProperty(day)) {
            dailyViews[day]++
          }
        })

        return new Response(
          JSON.stringify({
            total: pageViews?.length || 0,
            dailyViews: Object.entries(dailyViews).map(([date, count]) => ({ date, count }))
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'top-pages':
        const { data: allPageViews } = await supabaseClient
          .from('tracking_events')
          .select('event_data')
          .eq('event_type', 'page_view')

        const pageCounts = {}
        allPageViews?.forEach(view => {
          const url = view.event_data?.url || 'Unknown'
          pageCounts[url] = (pageCounts[url] || 0) + 1
        })

        const topPages = Object.entries(pageCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([url, count]) => ({ url, count }))

        return new Response(
          JSON.stringify(topPages),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'click-event-summary':
        const { data: clicks } = await supabaseClient
          .from('tracking_events')
          .select('event_data')
          .in('event_type', ['click', 'user_interaction'])

        const elementCounts = {}
        clicks?.forEach(click => {
          const element = click.event_data?.element || 'unknown'
          elementCounts[element] = (elementCounts[element] || 0) + 1
        })

        return new Response(
          JSON.stringify({
            total: clicks?.length || 0,
            byElement: Object.entries(elementCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([element, count]) => ({ element, count }))
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'recent':
        const { data: recentEvents } = await supabaseClient
          .from('tracking_events')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(50)

        return new Response(
          JSON.stringify(recentEvents || []),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid endpoint' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }

  } catch (error) {
    console.error('Error processing admin stats request:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
