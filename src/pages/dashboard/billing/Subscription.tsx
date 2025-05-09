
import React, { useState, useEffect } from "react";
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
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthContext";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SubscriptionData {
  subscribed: boolean;
  subscription: {
    id: string;
    status: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    priceId: string;
    amount: number;
  } | null;
  plan: string | null;
}

const STRIPE_PRICE_IDS = {
  starter: "price_starter123",  // Replace with actual Stripe price IDs
  pro: "price_pro456",
  enterprise: "price_enterprise789"
};

const Subscription: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  useEffect(() => {
    // Check URL for success or canceled params
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to RecoAI.",
      });
    } else if (canceled) {
      toast({
        title: "Subscription canceled",
        description: "You can try again whenever you're ready.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const checkSubscription = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        throw error;
      }
      
      setSubscriptionData(data);
      console.log("Subscription data:", data);
    } catch (error) {
      console.error("Error checking subscription:", error);
      toast({
        title: "Error checking subscription",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCheckoutSession = async (planId: string) => {
    setCheckoutLoading(planId);
    try {
      const priceId = STRIPE_PRICE_IDS[planId as keyof typeof STRIPE_PRICE_IDS];
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, plan: planId },
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error creating checkout",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error managing subscription",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-recoai-purple" />
        <span className="ml-2">Loading subscription data...</span>
      </div>
    );
  }

  const currentPlan = subscriptionData?.plan || "none";
  const isSubscribed = subscriptionData?.subscribed || false;
  const subscription = subscriptionData?.subscription;

  // Format subscription end date if available
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Subscription</h1>
      
      {searchParams.get('success') && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertTitle>Subscription Successful!</AlertTitle>
          <AlertDescription>
            Thank you for subscribing to RecoAI. Your subscription is now active.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="h-5 w-5 text-recoai-purple" />
                Current Plan
              </span>
              {isSubscribed ? (
                <Badge className="bg-recoai-purple">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</Badge>
              ) : (
                <Badge variant="outline">No Active Plan</Badge>
              )}
            </CardTitle>
            {isSubscribed && subscription && (
              <CardDescription>
                Your subscription {subscription.cancel_at_period_end ? "will end" : "renews"} on {formatDate(subscription.current_period_end)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {isSubscribed ? (
              <>
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
                      {currentPlan === "starter" && (
                        <>
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
                        </>
                      )}
                      {currentPlan === "pro" && (
                        <>
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
                        </>
                      )}
                      {currentPlan === "enterprise" && (
                        <>
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
                        </>
                      )}
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
              </>
            ) : (
              <div className="text-center py-8">
                <p className="mb-4 text-recoai-gray">
                  You don't have an active subscription. Choose a plan below to get started.
                </p>
              </div>
            )}
          </CardContent>
          {isSubscribed && (
            <CardFooter className="flex justify-between flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1" 
                onClick={handleManageSubscription}
              >
                <Undo2 className="h-4 w-4" />
                {subscription?.cancel_at_period_end ? "Renew Subscription" : "Cancel Subscription"}
              </Button>
              <Button 
                className="bg-recoai-purple hover:bg-recoai-purple/90 flex items-center gap-1" 
                onClick={handleManageSubscription}
              >
                <TrendingUp className="h-4 w-4" />
                Manage Subscription
              </Button>
            </CardFooter>
          )}
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
              {currentPlan === "starter" ? (
                <Button disabled className="w-full">Current Plan</Button>
              ) : isSubscribed ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleManageSubscription}
                >
                  Switch Plan
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCreateCheckoutSession('starter')}
                  disabled={checkoutLoading === 'starter'}
                >
                  {checkoutLoading === 'starter' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className={currentPlan === "pro" ? "border-recoai-purple" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pro</CardTitle>
                {currentPlan === "pro" && (
                  <Badge className="bg-recoai-purple">Current</Badge>
                )}
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
              {currentPlan === "pro" ? (
                <Button disabled className="w-full bg-recoai-purple hover:bg-recoai-purple/90">Current Plan</Button>
              ) : isSubscribed ? (
                <Button 
                  className="w-full bg-recoai-purple hover:bg-recoai-purple/90"
                  onClick={handleManageSubscription}
                >
                  Switch Plan
                </Button>
              ) : (
                <Button 
                  className="w-full bg-recoai-purple hover:bg-recoai-purple/90"
                  onClick={() => handleCreateCheckoutSession('pro')}
                  disabled={checkoutLoading === 'pro'}
                >
                  {checkoutLoading === 'pro' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className={currentPlan === "enterprise" ? "border-recoai-purple" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Enterprise</CardTitle>
                {currentPlan === "enterprise" && (
                  <Badge className="bg-recoai-purple">Current</Badge>
                )}
              </div>
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
              {currentPlan === "enterprise" ? (
                <Button disabled className="w-full">Current Plan</Button>
              ) : isSubscribed ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleManageSubscription}
                >
                  Switch Plan
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => handleCreateCheckoutSession('enterprise')}
                  disabled={checkoutLoading === 'enterprise'}
                >
                  {checkoutLoading === 'enterprise' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
