
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Briefcase 
} from "lucide-react";

const Investors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Investor Relations</h1>
        <p className="text-recoai-gray">View and manage investor information and reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-recoai-purple" />
              Financial Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Key financial metrics and quarterly reports will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-recoai-teal" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Year-over-year growth data and projections will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-recoai-blue" />
              Investor Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Breakdown of investor types and geographic distribution will be shown here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-recoai-orange" />
              Investor Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Access to shareholder documents and regulatory filings will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Investors;
