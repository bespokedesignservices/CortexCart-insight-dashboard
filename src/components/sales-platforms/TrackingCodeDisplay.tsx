
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlatformDetail } from "@/utils/platformDetails";

interface TrackingCodeDisplayProps {
  platform: PlatformDetail;
  storeId: string;
  selectedPlatformId: string;
}

const TrackingCodeDisplay = ({ platform, storeId, selectedPlatformId }: TrackingCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getTrackingCode = () => {
    const storeIdValue = storeId || "your-store-id";
    return `<script>
  (function(r,e,c,o,a,i){
    r.CortexCartTracker = { 
      storeId: "${storeIdValue}",
      endpoint: "${window.location.origin}/functions/v1/track",
      platform: "${selectedPlatformId}"
    };
    r.cctk = r.cctk || function() {
      (r.cctk.q = r.cctk.q || []).push(arguments);
      
      // Log the event to console for debugging
      console.log('CortexCart Event:', arguments);
      
      // Send data to tracking endpoint
      if (arguments[0] === 'event') {
        const payload = {
          storeId: r.CortexCartTracker.storeId,
          platform: r.CortexCartTracker.platform,
          event: arguments[1],
          data: arguments[2] || {},
          sessionId: r.CortexCartTracker.sessionId || generateSessionId()
        };
        
        fetch(r.CortexCartTracker.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(console.error);
      }
    };
    
    // Generate session ID
    function generateSessionId() {
      return 'sess_' + Math.random().toString(36).substring(2, 15) + 
             Math.random().toString(36).substring(2, 15);
    }
    
    r.CortexCartTracker.sessionId = generateSessionId();
    
    // Auto-track page views
    cctk('event', 'page_view', { 
      url: window.location.href,
      title: document.title,
      referrer: document.referrer
    });
    
    // Track product views
    document.addEventListener('DOMContentLoaded', function() {
      // Platform-specific selectors
      const productSelectors = {
        shopify: '.product-single__title, .product__title',
        woocommerce: '.product_title',
        magento: '.page-title',
        bigcommerce: '.productView-title',
        default: '.product-title, .product-name, [data-product-title]'
      };
      
      const selector = productSelectors[r.CortexCartTracker.platform] || productSelectors.default;
      const productElements = document.querySelectorAll(selector);
      
      if (productElements.length > 0) {
        cctk('event', 'product_view', {
          title: productElements[0].textContent.trim(),
          url: window.location.href
        });
      }
    });
    
    // Set up click tracking
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button') || e.target;
      if (target.tagName) {
        cctk('event', 'click', {
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
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTrackingCode());
    setCopied(true);
    
    toast({
      title: "Tracking code copied!",
      description: "You can now paste it into your website's head section.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Installation Instructions</h4>
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
      </div>
      
      <p className="text-sm mb-3">
        {platform.instructions || `Add this tracking code to your ${platform.name} website.`}
      </p>
      
      {platform.settingsUrl && (
        <p className="text-sm mb-3">
          Access your store settings at: <a href={platform.settingsUrl} target="_blank" rel="noopener noreferrer" className="text-recoai-purple underline">
            {platform.settingsUrl}
          </a>
        </p>
      )}
      
      <div className="bg-gray-900 text-gray-300 p-3 rounded-md overflow-x-auto text-xs">
        <pre className="whitespace-pre-wrap">
          {getTrackingCode()}
        </pre>
      </div>
    </div>
  );
};

export default TrackingCodeDisplay;
