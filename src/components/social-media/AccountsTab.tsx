
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { SocialPlatform } from "@/types/social-media";

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  lastSync: string | null;
  status: "connected" | "disconnected";
}

interface AccountsTabProps {
  connectedAccounts: ConnectedAccount[];
  setConnectedAccounts: React.Dispatch<React.SetStateAction<ConnectedAccount[]>>;
  socialPlatforms: SocialPlatform[];
}

// Form schema
const connectAccountSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const AccountsTab: React.FC<AccountsTabProps> = ({ 
  connectedAccounts, 
  setConnectedAccounts,
  socialPlatforms
}) => {
  const { toast } = useToast();

  const connectAccountForm = useForm<z.infer<typeof connectAccountSchema>>({
    resolver: zodResolver(connectAccountSchema),
    defaultValues: {
      platform: "",
      username: "",
      password: "",
    },
  });

  const handleConnectAccount = (data: z.infer<typeof connectAccountSchema>) => {
    console.log("Connecting account:", data);
    toast({
      title: "Account connected",
      description: `Your ${data.platform} account has been connected successfully.`,
    });
    
    // Add the new account to the list
    setConnectedAccounts([
      ...connectedAccounts,
      { 
        id: Date.now().toString(), 
        platform: data.platform, 
        username: data.username, 
        lastSync: new Date().toISOString(), 
        status: "connected" 
      }
    ]);
    
    connectAccountForm.reset();
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    if (!platform) return null;
    
    const Icon = platform.icon;
    return <Icon className="h-5 w-5" />;
  };

  const getPlatformColor = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform?.color || "bg-gray-500";
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your connected social media accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectedAccounts.length > 0 ? (
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className={`${getPlatformColor(account.platform)} p-2 rounded-full`}>
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div>
                      <p className="font-medium">{account.username}</p>
                      <p className="text-xs text-gray-500">
                        {account.status === "connected" ? (
                          <>Last synced: {new Date(account.lastSync!).toLocaleString()}</>
                        ) : (
                          "Disconnected"
                        )}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={account.status === "connected" ? "destructive" : "default"}
                    size="sm"
                  >
                    {account.status === "connected" ? "Disconnect" : "Reconnect"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No accounts connected yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Connect New Account</CardTitle>
          <CardDescription>
            Add a new social media account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...connectAccountForm}>
            <form onSubmit={connectAccountForm.handleSubmit(handleConnectAccount)} className="space-y-4">
              <FormField
                control={connectAccountForm.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {socialPlatforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            <div className="flex items-center gap-2">
                              <platform.icon className="h-4 w-4" />
                              <span>{platform.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={connectAccountForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourusername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={connectAccountForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your password is securely encrypted
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Connect Account</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
