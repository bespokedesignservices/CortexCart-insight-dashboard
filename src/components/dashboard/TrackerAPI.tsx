
import React from 'react';

// This component doesn't render anything visible but sets up the tracking API endpoint
const TrackerAPI: React.FC = () => {
  React.useEffect(() => {
    // Create a custom route handler for tracking endpoints
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      const inputUrl = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
      
      if (inputUrl.endsWith('/api/track')) {
        return handleTrackingRequest(init?.body);
      }
      
      // Pass through all other requests to original fetch
      return originalFetch.apply(this, [input, init]);
    };
    
    // Clean up the override when component unmounts
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
  
  // Handler for tracking requests - now forwards to Supabase Edge Function
  const handleTrackingRequest = async (body: any) => {
    try {
      if (typeof body === 'string') {
        const data = JSON.parse(body);
        console.log('🔍 Received tracking data:', data);
        
        // Forward to Supabase Edge Function
        const response = await fetch(`${window.location.origin}/functions/v1/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Also trigger local event for real-time dashboard updates
        const { storeId, event, data: eventData } = data;
        window.dispatchEvent(new CustomEvent('cortexcart-event', { 
          detail: { storeId, event, data: eventData, timestamp: new Date() }
        }));
        
        if (response.ok) {
          const result = await response.json();
          return new Response(JSON.stringify(result), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          const error = await response.json();
          return new Response(JSON.stringify(error), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } catch (error) {
      console.error('Error processing tracking request:', error);
    }
    
    return Promise.resolve(new Response(JSON.stringify({ 
      success: false, 
      message: 'Invalid request' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));
  };
  
  return null;
};

export default TrackerAPI;
