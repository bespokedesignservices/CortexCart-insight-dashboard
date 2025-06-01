
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Target, BarChart } from "lucide-react";

const CampaignROICalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    platform: '',
    adSpend: '',
    revenue: '',
    conversions: '',
    impressions: '',
    clicks: ''
  });

  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    const spend = parseFloat(formData.adSpend) || 0;
    const rev = parseFloat(formData.revenue) || 0;
    const conv = parseInt(formData.conversions) || 0;
    const impr = parseInt(formData.impressions) || 0;
    const clicks = parseInt(formData.clicks) || 0;

    const roi = spend > 0 ? ((rev - spend) / spend) * 100 : 0;
    const roas = spend > 0 ? rev / spend : 0;
    const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
    const conversionRate = clicks > 0 ? (conv / clicks) * 100 : 0;
    const costPerConversion = conv > 0 ? spend / conv : 0;
    const costPerClick = clicks > 0 ? spend / clicks : 0;

    setResults({
      roi: roi.toFixed(2),
      roas: roas.toFixed(2),
      ctr: ctr.toFixed(2),
      conversionRate: conversionRate.toFixed(2),
      costPerConversion: costPerConversion.toFixed(2),
      costPerClick: costPerClick.toFixed(2),
      profit: (rev - spend).toFixed(2)
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Campaign ROI Calculator</h2>
        <Calculator className="h-6 w-6 text-blue-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                placeholder="e.g., Holiday Sale 2024"
                value={formData.campaignName}
                onChange={(e) => handleInputChange('campaignName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta-ads">Meta Ads</SelectItem>
                  <SelectItem value="google-ads">Google Ads</SelectItem>
                  <SelectItem value="tiktok-ads">TikTok Ads</SelectItem>
                  <SelectItem value="linkedin-ads">LinkedIn Ads</SelectItem>
                  <SelectItem value="mailchimp">Mailchimp</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adSpend">Ad Spend ($)</Label>
                <Input
                  id="adSpend"
                  type="number"
                  placeholder="1000"
                  value={formData.adSpend}
                  onChange={(e) => handleInputChange('adSpend', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="revenue">Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="3200"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="impressions">Impressions</Label>
                <Input
                  id="impressions"
                  type="number"
                  placeholder="50000"
                  value={formData.impressions}
                  onChange={(e) => handleInputChange('impressions', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="clicks">Clicks</Label>
                <Input
                  id="clicks"
                  type="number"
                  placeholder="1500"
                  value={formData.clicks}
                  onChange={(e) => handleInputChange('clicks', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="conversions">Conversions</Label>
                <Input
                  id="conversions"
                  type="number"
                  placeholder="48"
                  value={formData.conversions}
                  onChange={(e) => handleInputChange('conversions', e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateROI} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate ROI
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">{results.roi}%</div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">ROAS</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{results.roas}x</div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">CTR</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">{results.ctr}%</div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Conv. Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">{results.conversionRate}%</div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profit:</span>
                    <span className={`font-medium ${parseFloat(results.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.profit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cost per Conversion:</span>
                    <span className="font-medium">${results.costPerConversion}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cost per Click:</span>
                    <span className="font-medium">${results.costPerClick}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Performance Insights</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {parseFloat(results.roi) > 100 && <li>✅ Excellent ROI - Campaign is highly profitable</li>}
                    {parseFloat(results.roi) > 0 && parseFloat(results.roi) <= 100 && <li>📈 Positive ROI - Campaign is profitable</li>}
                    {parseFloat(results.roi) <= 0 && <li>❌ Negative ROI - Consider optimizing or pausing</li>}
                    {parseFloat(results.ctr) > 2 && <li>✅ Great CTR - Your ads are engaging</li>}
                    {parseFloat(results.ctr) <= 1 && <li>⚠️ Low CTR - Consider improving ad creative</li>}
                    {parseFloat(results.conversionRate) > 3 && <li>✅ Strong conversion rate</li>}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Enter campaign data to calculate ROI</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignROICalculator;
