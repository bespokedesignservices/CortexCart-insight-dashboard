
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  Package,
  Check,
  TrendingUp,
  Users,
  Undo2,
  BarChart3,
} from "lucide-react";

const Subscription: React.FC = () => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to the upgrade page.",
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription cancellation initiated",
      description: "Please confirm your cancellation in the modal dialog.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Subscription</h1>
      
      <div className="grid gap-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="h-5 w-5 text-recoai-purple" />
                Current Plan
              </span>
              <Badge className="bg-recoai-purple">Pro</Badge>
            </CardTitle>
            <CardDescription>
              Your subscription renews on July 15, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly API usage</span>
                <span className="text-sm font-medium">75% (1,500/2,000)</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Plan Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    2,000 API calls per month
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Custom integrations
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Billing Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Visa ending in 4242</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>5 team members</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Detailed reports</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-1" onClick={handleCancelSubscription}>
              <Undo2 className="h-4 w-4" />
              Cancel Subscription
            </Button>
            <Button className="bg-recoai-purple hover:bg-recoai-purple/90 flex items-center gap-1" onClick={handleUpgrade}>
              <TrendingUp className="h-4 w-4" />
              Upgrade Plan
            </Button>
          </CardFooter>
        </Card>
        
        {/* Available Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>
                For individual users just getting started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$9<span className="text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  500 API calls per month
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Basic analytics
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Email support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Downgrade</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-recoai-purple">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pro</CardTitle>
                <Badge className="bg-recoai-purple">Current</Badge>
              </div>
              <CardDescription>
                For professionals and small teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  2,000 API calls per month
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Priority support
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Custom integrations
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full bg-recoai-purple hover:bg-recoai-purple/90">Current Plan</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>
                For larger teams with advanced needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  10,000 API calls per month
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Premium analytics
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  24/7 priority support
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Custom solutions
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Dedicated account manager
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleUpgrade}>Upgrade</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
