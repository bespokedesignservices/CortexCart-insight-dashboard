
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as LineChartIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  sales: number;
  views: number;
  image?: string;
}

interface AIInsightsProps {
  hasData: boolean;
  products: Product[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ hasData, products }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <LineChartIcon className="mr-2 h-5 w-5 text-recoai-purple" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData || products.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-recoai-purple/5 border border-recoai-purple/20 rounded-md p-4">
              <h3 className="font-medium text-recoai-darkGray mb-2">
                Product Recommendation
              </h3>
              <p className="text-sm text-recoai-gray">
                Customers who purchase "{products.length > 0 ? products[0].name : 'Premium Product'}" also frequently buy "{products.length > 1 ? products[1].name : 'Related Product'}". Consider creating a bundle offer to increase average order value.
              </p>
            </div>
            <div className="bg-recoai-blue/5 border border-recoai-blue/20 rounded-md p-4">
              <h3 className="font-medium text-recoai-darkGray mb-2">
                Traffic Insight
              </h3>
              <p className="text-sm text-recoai-gray">
                Your mobile traffic increased by 28% this month, but your mobile conversion rate is 15% lower than desktop. Consider optimizing your mobile checkout experience to improve conversion rates.
              </p>
            </div>
            <div className="bg-recoai-teal/5 border border-recoai-teal/20 rounded-md p-4">
              <h3 className="font-medium text-recoai-darkGray mb-2">
                Pricing Strategy
              </h3>
              <p className="text-sm text-recoai-gray">
                Price sensitivity analysis shows that increasing the price of "{products.length > 0 ? products[0].name : 'Your Best Seller'}" by 10% would likely not impact sales volume but would increase profit margins.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Not enough data to generate AI insights yet. Add the tracking widget to your site to start collecting data for personalized recommendations.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
