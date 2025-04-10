
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, EyeIcon, EyeOffIcon } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in a real app, this would call an API
    setTimeout(() => {
      // Fake successful login
      toast({
        title: "Login successful",
        description: "Welcome back to RecoAI Dashboard!",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  const handleTestLogin = () => {
    setEmail("demo@recoai.com");
    setPassword("demopassword");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-recoai-purple/5 to-recoai-teal/5">
      {/* Left side - CTA */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center md:text-left">
        <div className="max-w-md mx-auto md:mx-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Unlock Powerful E-commerce Insights with RecoAI
          </h1>
          <p className="text-lg mb-6 text-gray-700">
            Start your <span className="font-bold">14-day free trial</span> today and transform your online store with AI-powered analytics.
          </p>
          <div className="relative mb-8 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Person analyzing e-commerce data on laptop"
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-sm">RecoAI dashboard in action, helping store owners increase sales by 32% on average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login to RecoAI</CardTitle>
            <CardDescription>
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-recoai-purple hover:text-recoai-purple/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-700">
                  <span className="font-semibold">Test Account:</span> demo@recoai.com / demopassword
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-700 underline" 
                    onClick={handleTestLogin}
                  >
                    Use test account
                  </Button>
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full bg-recoai-purple hover:bg-recoai-purple/90"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-recoai-purple hover:text-recoai-purple/80">
                Sign up for a 14-day free trial
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
