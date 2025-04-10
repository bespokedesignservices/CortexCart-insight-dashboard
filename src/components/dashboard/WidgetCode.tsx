
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const WidgetCode: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const widgetCode = `<script>
  (function(r,e,c,o,a,i){
    r.RecoAITracker = { userID: "[YOUR_STORE_ID]" };
    r.rctk = r.rctk || function() {
      (r.rctk.q = r.rctk.q || []).push(arguments);
    };
    a = e.createElement(c);
    a.async = 1;
    a.src = o;
    i = e.getElementsByTagName(c)[0];
    i.parentNode.insertBefore(a, i);
  })(window, document, "script", "https://cdn.recoai.com/tracker.js");
  
  rctk("init", "YOUR_TRACKING_ID");
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
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
            Need help? <a href="#" className="text-recoai-purple underline">Check our installation guide</a> or <a href="#" className="text-recoai-purple underline">contact support</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetCode;
