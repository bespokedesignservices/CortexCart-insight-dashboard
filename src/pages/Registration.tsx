import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PlanOption {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const plans: PlanOption[] = [
    {
      id: "starter",
      title: "Starter",
      price: 19,
      description: "Perfect for new stores getting started with analytics",
      features: [
        "Up to 1,000 monthly visitors",
        "Basic customer behavior analytics",
        "Product performance tracking",
        "Email support"
      ]
    },
    {
      id: "growth",
      title: "Growth",
      price: 49,
      description: "For businesses ready to leverage advanced analytics",
      features: [
        "Up to 10,000 monthly visitors",
        "Advanced customer behavior analytics",
        "Product performance tracking",
        "Priority email support",
        "AI-powered recommendations"
      ]
    },
    {
      id: "pro",
      title: "Pro",
      price: 99,
      description: "Complete solution for established e-commerce stores",
      features: [
        "Up to 50,000 monthly visitors",
        "Advanced customer behavior analytics",
        "Product performance tracking",
        "24/7 priority support",
        "AI-powered recommendations",
        "Advanced customer segmentation",
        "Custom reports"
      ]
    }
  ];

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      website: "",
      plan: "growth"
    }
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("Registration data:", data);
      
      // Create user in Supabase auth
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            company_name: data.companyName,
            website: data.website,
            plan: data.plan
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Registration successful! Please check your email to confirm your account.");
      // Redirect to dashboard after successful registration
      // If email confirmation is required, you might want to redirect to a different page
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPlan = plans.find(plan => plan.id === form.watch("plan")) || plans[1];

  return (
    <div className="min-h-screen bg-cortexcart-lightGray flex flex-col">
      <header className="w-full py-4 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">CortexCart</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your <span className="gradient-text">14-Day Free Trial</span>
            </h1>
            <p className="text-lg text-cortexcart-gray">
              No credit card required. Cancel anytime.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Account Information</h2>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      rules={{ required: "Company name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourstore.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Choose Your Plan</h2>
                    <p className="text-sm text-cortexcart-gray mb-4">
                      All plans include a 14-day free trial. No credit card required.
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              {plans.map((plan) => (
                                <div
                                  key={plan.id}
                                  className={`flex items-start p-4 rounded-lg border ${
                                    field.value === plan.id
                                      ? "border-cortexcart-purple bg-cortexcart-purple/5"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={plan.id}
                                    id={plan.id}
                                    className="mt-1"
                                  />
                                  <div className="ml-3 flex-1">
                                    <Label
                                      htmlFor={plan.id}
                                      className="text-base font-medium flex items-center"
                                    >
                                      {plan.title}
                                      {plan.id === "growth" && (
                                        <span className="ml-2 text-xs bg-cortexcart-purple text-white px-2 py-0.5 rounded-full">
                                          Popular
                                        </span>
                                      )}
                                    </Label>
                                    <p className="text-sm text-cortexcart-gray mb-1">
                                      ${plan.price}/month after trial
                                    </p>
                                    <p className="text-xs text-cortexcart-gray mb-2">
                                      {plan.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">
                        {selectedPlan.title} Plan Includes:
                      </h3>
                      <ul className="space-y-2">
                        {selectedPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cortexcart-purple hover:bg-cortexcart-purple/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating your account..." : "Start Your Free Trial"}
                </Button>
                
                <p className="text-xs text-center text-cortexcart-gray mt-4">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                  Your 14-day free trial starts today. No credit card required.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
