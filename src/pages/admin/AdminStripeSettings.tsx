
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check, Plus, Pencil, Loader2 } from "lucide-react";

interface StripePlan {
  id: string;
  name: string;
  priceId: string;
  amount: number;
  currency: string;
  interval: string;
  isActive: boolean;
}

const AdminStripeSettings: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(true);
  const [publishableKey, setPublishableKey] = useState<string>("");
  
  const [plans, setPlans] = useState<StripePlan[]>([
    {
      id: "starter",
      name: "Starter",
      priceId: "price_starter123",
      amount: 9,
      currency: "USD",
      interval: "month",
      isActive: true
    },
    {
      id: "pro",
      name: "Pro",
      priceId: "price_pro456",
      amount: 29,
      currency: "USD",
      interval: "month",
      isActive: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceId: "price_enterprise789",
      amount: 99,
      currency: "USD",
      interval: "month",
      isActive: true
    }
  ]);

  useEffect(() => {
    // For demo purposes, load from localStorage
    const savedPublishableKey = localStorage.getItem('stripe_publishable_key');
    if (savedPublishableKey) {
      setPublishableKey(savedPublishableKey);
    }

    const savedPlans = localStorage.getItem('stripe_plans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }

    const savedTestMode = localStorage.getItem('stripe_test_mode');
    if (savedTestMode) {
      setTestMode(savedTestMode === 'true');
    }
  }, []);

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // For demo purposes, save to localStorage
    localStorage.setItem('stripe_publishable_key', publishableKey);
    localStorage.setItem('stripe_plans', JSON.stringify(plans));
    localStorage.setItem('stripe_test_mode', testMode.toString());
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Stripe settings have been updated successfully.",
      });
    }, 1000);
  };

  const togglePlanStatus = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
    ));
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Stripe Settings</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Configure your Stripe API keys for payment processing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="test-mode"
              checked={testMode}
              onCheckedChange={setTestMode}
            />
            <Label htmlFor="test-mode">Test Mode</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="publishable-key">
              {testMode ? "Test Publishable Key" : "Live Publishable Key"}
            </Label>
            <Input
              id="publishable-key"
              placeholder="pk_test_..."
              value={publishableKey}
              onChange={(e) => setPublishableKey(e.target.value)}
            />
            <p className="text-sm text-recoai-gray">
              {testMode
                ? "This is your test publishable key which can be found in your Stripe dashboard."
                : "This is your live publishable key which can be found in your Stripe dashboard."}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-key">
              {testMode ? "Test Secret Key" : "Live Secret Key"}
            </Label>
            <Input
              id="secret-key"
              placeholder="sk_test_..."
              type="password"
              value="•••••••••••••••••••••••••••••••"
              disabled
            />
            <p className="text-sm text-recoai-gray">
              The secret key is stored securely in Supabase and not displayed here.
              Update it in the Supabase Edge Functions secrets settings.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>
            Configure the subscription plans available to customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Interval</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.priceId}</TableCell>
                  <TableCell>{formatCurrency(plan.amount, plan.currency)}</TableCell>
                  <TableCell className="capitalize">{plan.interval}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      plan.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePlanStatus(plan.id)}
                      >
                        {plan.isActive ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({
                          title: "Edit Plan",
                          description: "This would open a modal to edit the plan (not implemented in demo)."
                        })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => toast({
              title: "Add Plan",
              description: "This would open a modal to add a new plan (not implemented in demo)."
            })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminStripeSettings;
