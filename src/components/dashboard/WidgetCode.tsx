
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WidgetCode: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Get current user's store ID - this would come from authentication
  // For now we'll use a placeholder
  const storeId = "demo-store-123";
  
  const widgetCode = `<script>
  (function(r,e,c,o,a,i){
    r.RecoAITracker = { 
      storeId: "${storeId}",
      endpoint: "${window.location.origin}/api/track"
    };
    r.rctk = r.rctk || function() {
      (r.rctk.q = r.rctk.q || []).push(arguments);
      
      // Log the event to console for debugging
      console.log('RecoAI Event:', arguments);
      
      // Send data to tracking endpoint
      if (arguments[0] === 'event') {
        const payload = {
          storeId: r.RecoAITracker.storeId,
          event: arguments[1],
          data: arguments[2] || {}
        };
        
        fetch(r.RecoAITracker.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(console.error);
      }
    };
    
    // Auto-track page views
    rctk('event', 'page_view', { 
      url: window.location.href,
      title: document.title,
      referrer: document.referrer
    });
    
    // Set up click tracking
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button') || e.target;
      if (target.tagName) {
        rctk('event', 'click', {
          element: target.tagName.toLowerCase(),
          text: target.innerText,
          path: target.getAttribute('href') || '',
          classes: target.className
        });
      }
    });
    
    // Load the actual tracker script
    a = e.createElement(c);
    a.async = 1;
    a.src = o;
    i = e.getElementsByTagName(c)[0];
    i.parentNode.insertBefore(a, i);
  })(window, document, "script", "${window.location.origin}/tracker.js");
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    
    toast({
      title: "Widget code copied!",
      description: "You can now paste it into your website's head section.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Your RecoAI Tracking Widget</span>
          <Button
            variant="outline"
            size="sm"
            className={
              copied
                ? "bg-green-500 text-white hover:bg-green-600 border-green-500"
                : "border-recoai-purple text-recoai-purple hover:bg-recoai-purple/10"
            }
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Code
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {widgetCode}
          </pre>
        </div>
        <div className="mt-4 text-sm text-recoai-gray">
          <p>
            Copy this code and paste it between the <code>&lt;head&gt;</code> tags of your website to start tracking customer behavior.
          </p>
          <p className="mt-2">
            For testing, you can view the <a href="/test-page.html" target="_blank" className="text-recoai-purple hover:underline">test page</a> and open the browser console to see tracking events in action.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetCode;
