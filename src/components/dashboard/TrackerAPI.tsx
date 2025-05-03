
import React from 'react';
import { supabase } from "@/integrations/supabase/client";

// This component doesn't render anything visible but sets up the tracking API endpoint
const TrackerAPI: React.FC = () => {
  React.useEffect(() => {
    // Create a custom route handler for tracking endpoints
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === 'string' ? input : input.url;
      
      if (url.endsWith('/api/track')) {
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
  
  // Handler for tracking requests
  const handleTrackingRequest = async (body: any) => {
    try {
      if (typeof body === 'string') {
        const data = JSON.parse(body);
        console.log('🔍 Received tracking data:', data);
        
        // Process tracking data
        const { storeId, event, data: eventData } = data;
        
        // Store event in app's state for real-time dashboard updates
        window.dispatchEvent(new CustomEvent('recoai-event', { 
          detail: { storeId, event, data: eventData, timestamp: new Date() }
        }));
        
        // In a real implementation, we'd save this to Supabase
        // For now, we'll simulate a successful response
        return Promise.resolve(new Response(JSON.stringify({ 
          success: true, 
          message: 'Event received' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
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
