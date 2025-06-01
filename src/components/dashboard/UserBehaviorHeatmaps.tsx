
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MousePointer, Eye, Smartphone, Monitor, Tablet, TrendingUp } from "lucide-react";

const UserBehaviorHeatmaps: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('homepage');

  const heatmapData = {
    homepage: {
      clicks: [
        { x: 25, y: 15, intensity: 85, element: 'Hero CTA Button' },
        { x: 70, y: 30, intensity: 60, element: 'Navigation Menu' },
        { x: 50, y: 65, intensity: 40, element: 'Features Section' },
        { x: 45, y: 85, intensity: 70, element: 'Footer Links' }
      ],
      scrollDepth: { '25%': 92, '50%': 76, '75%': 45, '100%': 28 },
      timeOnPage: '2:34'
    },
    product: {
      clicks: [
        { x: 80, y: 20, intensity: 95, element: 'Add to Cart' },
        { x: 30, y: 40, intensity: 50, element: 'Product Images' },
        { x: 60, y: 70, intensity: 35, element: 'Reviews Section' },
        { x: 40, y: 90, intensity: 25, element: 'Related Products' }
      ],
      scrollDepth: { '25%': 88, '50%': 72, '75%': 55, '100%': 35 },
      timeOnPage: '3:12'
    },
    checkout: {
      clicks: [
        { x: 50, y: 30, intensity: 90, element: 'Payment Method' },
        { x: 50, y: 50, intensity: 75, element: 'Shipping Info' },
        { x: 65, y: 80, intensity: 85, element: 'Complete Order' },
        { x: 20, y: 85, intensity: 15, element: 'Back to Cart' }
      ],
      scrollDepth: { '25%': 95, '50%': 85, '75%': 78, '100%': 65 },
      timeOnPage: '4:45'
    }
  };

  const currentData = heatmapData[selectedPage as keyof typeof heatmapData];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Behavior Heatmaps</h2>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">Pro Feature</Badge>
      </div>

      <Tabs defaultValue="click-heatmap" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="click-heatmap">Click Heatmap</TabsTrigger>
          <TabsTrigger value="scroll-depth">Scroll Depth</TabsTrigger>
          <TabsTrigger value="device-usage">Device Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="click-heatmap" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={selectedPage === 'homepage' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setSelectedPage('homepage')}
            >
              Homepage
            </Button>
            <Button 
              variant={selectedPage === 'product' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setSelectedPage('product')}
            >
              Product Page
            </Button>
            <Button 
              variant={selectedPage === 'checkout' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setSelectedPage('checkout')}
            >
              Checkout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Click Heatmap - {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200 opacity-50"></div>
                  {currentData.clicks.map((click, index) => (
                    <div
                      key={index}
                      className="absolute rounded-full border-2 border-red-400 animate-pulse"
                      style={{
                        left: `${click.x}%`,
                        top: `${click.y}%`,
                        width: `${click.intensity / 5}px`,
                        height: `${click.intensity / 5}px`,
                        backgroundColor: `rgba(239, 68, 68, ${click.intensity / 100})`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`${click.element}: ${click.intensity}% engagement`}
                    />
                  ))}
                  <div className="absolute bottom-4 left-4 bg-white/90 rounded p-2 text-xs">
                    Avg. Time: {currentData.timeOnPage}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Click Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.clicks
                    .sort((a, b) => b.intensity - a.intensity)
                    .map((click, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{click.element}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500"
                              style={{ width: `${click.intensity}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{click.intensity}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scroll-depth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Scroll Depth Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {Object.entries(currentData.scrollDepth).map(([depth, percentage]) => (
                    <div key={depth} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{depth} Page Scroll</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Insights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Most users engage with above-the-fold content</li>
                    <li>• {Object.values(currentData.scrollDepth)[2]}% read most of the page</li>
                    <li>• Consider moving CTAs higher on the page</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="device-usage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <Monitor className="h-8 w-8 mx-auto text-blue-500" />
                <CardTitle>Desktop</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">65%</div>
                <div className="text-sm text-gray-600">Higher conversion rate</div>
                <div className="mt-2 text-xs">Avg. session: 4:32</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Smartphone className="h-8 w-8 mx-auto text-green-500" />
                <CardTitle>Mobile</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">28%</div>
                <div className="text-sm text-gray-600">Most traffic source</div>
                <div className="mt-2 text-xs">Avg. session: 2:15</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Tablet className="h-8 w-8 mx-auto text-purple-500" />
                <CardTitle>Tablet</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">7%</div>
                <div className="text-sm text-gray-600">Longest sessions</div>
                <div className="mt-2 text-xs">Avg. session: 5:48</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBehaviorHeatmaps;
