
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, TrendingUp, DollarSign, Users, Eye } from "lucide-react";

const MarketingPlatforms: React.FC = () => {
  const platforms = [
    {
      name: 'Meta Ads',
      icon: '📘',
      connected: true,
      spend: 2450.30,
      impressions: 125000,
      clicks: 3250,
      conversions: 89,
      roas: 3.2,
      ctr: 2.6
    },
    {
      name: 'Google Ads',
      icon: '🔍',
      connected: true,
      spend: 1890.75,
      impressions: 89000,
      clicks: 2890,
      conversions: 76,
      roas: 4.1,
      ctr: 3.2
    },
    {
      name: 'TikTok Ads',
      icon: '🎵',
      connected: false,
      spend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roas: 0,
      ctr: 0
    },
    {
      name: 'LinkedIn Ads',
      icon: '💼',
      connected: true,
      spend: 675.20,
      impressions: 45000,
      clicks: 890,
      conversions: 23,
      roas: 2.8,
      ctr: 2.0
    },
    {
      name: 'Mailchimp',
      icon: '📧',
      connected: true,
      spend: 89.99,
      impressions: 15000,
      clicks: 1250,
      conversions: 45,
      roas: 5.2,
      ctr: 8.3
    }
  ];

  const totalSpend = platforms.reduce((sum, platform) => sum + platform.spend, 0);
  const totalConversions = platforms.reduce((sum, platform) => sum + platform.conversions, 0);
  const averageRoas = platforms.filter(p => p.connected).reduce((sum, platform) => sum + platform.roas, 0) / platforms.filter(p => p.connected).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Marketing Platforms</h2>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Connect New Platform
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions}</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRoas.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">Return on ad spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.filter(p => p.connected).length}</div>
            <p className="text-xs text-muted-foreground">of {platforms.length} platforms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {platforms.map((platform, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    {platform.connected ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>
                    ) : (
                      <Badge variant="outline">Not Connected</Badge>
                    )}
                  </div>
                </div>
                {!platform.connected && (
                  <Button size="sm">Connect</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {platform.connected ? (
                <div className="grid gap-4 md:grid-cols-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Spend</div>
                    <div className="font-bold">${platform.spend.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Impressions</div>
                    <div className="font-bold">{platform.impressions.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Clicks</div>
                    <div className="font-bold">{platform.clicks.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Conversions</div>
                    <div className="font-bold">{platform.conversions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">ROAS</div>
                    <div className="font-bold">{platform.roas}x</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">CTR</div>
                    <div className="font-bold">{platform.ctr}%</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Connect this platform to see analytics and performance data.</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.filter(p => p.connected).map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{platform.icon}</span>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <span>ROAS: {platform.roas}x</span>
                    <span>CTR: {platform.ctr}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>ROAS Performance</span>
                      <span>{platform.roas}x</span>
                    </div>
                    <Progress value={(platform.roas / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>CTR Performance</span>
                      <span>{platform.ctr}%</span>
                    </div>
                    <Progress value={(platform.ctr / 10) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPlatforms;
