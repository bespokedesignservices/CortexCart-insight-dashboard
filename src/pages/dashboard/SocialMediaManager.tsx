
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Users, 
  Image as ImageIcon, 
  Link, 
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define our social platform types
const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-600" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-sky-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-800" }
];

// Form schemas
const connectAccountSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const postDesignerSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
});

// Placeholder data for connected accounts
const mockConnectedAccounts = [
  { id: "1", platform: "facebook", username: "yourbrand", lastSync: "2023-05-01T12:00:00Z", status: "connected" },
  { id: "2", platform: "instagram", username: "yourbrand", lastSync: "2023-05-01T12:00:00Z", status: "connected" },
  { id: "3", platform: "twitter", username: "yourbrand", lastSync: null, status: "disconnected" }
];

// Placeholder data for customer messages
const mockCustomerMessages = [
  { 
    id: "1", 
    platform: "facebook", 
    username: "customer1", 
    message: "Hi there! I have a question about your product. Does it come in different colors?", 
    timestamp: "2023-05-01T10:30:00Z",
    read: true
  },
  { 
    id: "2", 
    platform: "instagram", 
    username: "customer2", 
    message: "When will you restock the large size?", 
    timestamp: "2023-05-01T11:45:00Z",
    read: false
  },
  { 
    id: "3", 
    platform: "twitter", 
    username: "customer3", 
    message: "Love your products! Do you ship internationally?", 
    timestamp: "2023-05-01T09:15:00Z",
    read: true
  }
];

const SocialMediaManager: React.FC = () => {
  const [connectedAccounts, setConnectedAccounts] = useState(mockConnectedAccounts);
  const [customerMessages, setCustomerMessages] = useState(mockCustomerMessages);
  const [currentTab, setCurrentTab] = useState("accounts");
  const [supportEnabled, setSupportEnabled] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const connectAccountForm = useForm<z.infer<typeof connectAccountSchema>>({
    resolver: zodResolver(connectAccountSchema),
    defaultValues: {
      platform: "",
      username: "",
      password: "",
    },
  });

  const postDesignerForm = useForm<z.infer<typeof postDesignerSchema>>({
    resolver: zodResolver(postDesignerSchema),
    defaultValues: {
      platform: "",
      content: "",
      imageUrl: "",
      linkUrl: "",
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

  const handleCreatePost = (data: z.infer<typeof postDesignerSchema>) => {
    console.log("Creating post:", data);
    toast({
      title: "Post created",
      description: `Your post has been created for ${data.platform}.`,
    });
    
    postDesignerForm.reset();
  };

  const handleToggleSupportChat = (enabled: boolean) => {
    setSupportEnabled(enabled);
    toast({
      title: enabled ? "Support chat enabled" : "Support chat disabled",
      description: enabled 
        ? "You will now receive customer messages from social media platforms." 
        : "You will no longer receive customer messages from social media platforms.",
    });
  };

  const handleSendReply = (messageId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Sending reply to message:", messageId, "Text:", replyText);
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    });
    
    // Update the message as read
    setCustomerMessages(
      customerMessages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
    
    setReplyText("");
    setSelectedMessage(null);
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

  const unreadCount = customerMessages.filter(msg => !msg.read).length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Media Manager</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Customer Support</span>
          <Switch 
            checked={supportEnabled} 
            onCheckedChange={handleToggleSupportChat} 
          />
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Accounts</span>
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Post Designer</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2 relative">
            <MessageCircle className="h-4 w-4" />
            <span>Customer Support</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts">
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
        </TabsContent>
        
        <TabsContent value="design">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Post Designer</CardTitle>
                <CardDescription>
                  Create optimized posts for different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...postDesignerForm}>
                  <form onSubmit={postDesignerForm.handleSubmit(handleCreatePost)} className="space-y-4">
                    <FormField
                      control={postDesignerForm.control}
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
                      control={postDesignerForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your post content here..." 
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {postDesignerForm.watch("platform") === "twitter" && (
                              <span className="text-xs">Maximum 280 characters</span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={postDesignerForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            {postDesignerForm.watch("platform") && (
                              <span className="text-xs">
                                Recommended image size for {
                                  socialPlatforms.find(p => p.id === postDesignerForm.watch("platform"))?.name
                                }: 
                                {postDesignerForm.watch("platform") === "instagram" ? " 1080x1080px" : 
                                  postDesignerForm.watch("platform") === "twitter" ? " 1200x675px" :
                                  postDesignerForm.watch("platform") === "facebook" ? " 1200x630px" :
                                  postDesignerForm.watch("platform") === "linkedin" ? " 1104x736px" : ""}
                              </span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={postDesignerForm.control}
                      name="linkUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com/page" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll automatically generate a short trackable link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Create Post</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Post Preview</CardTitle>
                <CardDescription>
                  See how your post will look on different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {postDesignerForm.watch("platform") ? (
                  <div className="border rounded-md p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`${getPlatformColor(postDesignerForm.watch("platform"))} p-2 rounded-full`}>
                        {getPlatformIcon(postDesignerForm.watch("platform"))}
                      </div>
                      <div>
                        <p className="font-medium">Your Brand</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm">{postDesignerForm.watch("content") || "Your post will appear here..."}</p>
                    </div>
                    
                    {postDesignerForm.watch("imageUrl") && (
                      <div className="mt-2 rounded-md overflow-hidden bg-gray-100 h-40 flex items-center justify-center">
                        <div className="text-gray-500 flex flex-col items-center">
                          <ImageIcon className="h-8 w-8 mb-2" />
                          <span>Image Preview</span>
                        </div>
                      </div>
                    )}
                    
                    {postDesignerForm.watch("linkUrl") && (
                      <div className="mt-2 border rounded border-gray-200 p-2 text-sm">
                        <Link className="h-4 w-4 inline mr-1" />
                        {postDesignerForm.watch("linkUrl")}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500 text-center">
                    <div>
                      <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                      <p>Select a platform and create your post to see a preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Platform-specific optimization tips</h4>
                  <div className="text-sm text-gray-500">
                    {postDesignerForm.watch("platform") === "facebook" && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Keep posts under 80 characters for higher engagement</li>
                        <li>Include a clear call to action</li>
                        <li>Posts with images get 2.3x more engagement</li>
                      </ul>
                    )}
                    {postDesignerForm.watch("platform") === "instagram" && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use relevant hashtags (5-10 is optimal)</li>
                        <li>Square images perform best</li>
                        <li>Questions increase comment engagement</li>
                      </ul>
                    )}
                    {postDesignerForm.watch("platform") === "twitter" && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Keep tweets between 71-100 characters for optimal engagement</li>
                        <li>Use no more than 1-2 hashtags</li>
                        <li>Tweets with images receive 150% more retweets</li>
                      </ul>
                    )}
                    {postDesignerForm.watch("platform") === "linkedin" && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Posts under 150 characters get 50% higher engagement</li>
                        <li>Professional tone performs better</li>
                        <li>Industry-specific hashtags increase visibility</li>
                      </ul>
                    )}
                    {!postDesignerForm.watch("platform") && (
                      <p>Select a platform to see optimization tips</p>
                    )}
                  </div>
                </div>
                <Button variant="outline" disabled={!postDesignerForm.watch("platform")}>
                  Schedule Post
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="support">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Customer Messages</CardTitle>
                <CardDescription>
                  {customerMessages.length} messages from social platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {customerMessages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => setSelectedMessage(message.id)}
                      className={`flex items-start gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage === message.id ? 'bg-recoai-lightGray' : ''
                      } ${!message.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className={`${getPlatformColor(message.platform)} p-2 rounded-full`}>
                        {getPlatformIcon(message.platform)}
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-medium">{message.username}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm truncate max-w-[200px]">{message.message}</p>
                      </div>
                      {!message.read && (
                        <div className="ml-auto">
                          <Badge variant="destructive" className="h-2 w-2 rounded-full p-0" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>
                  {selectedMessage 
                    ? `Replying to ${customerMessages.find(m => m.id === selectedMessage)?.username}`
                    : "Select a message to reply"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedMessage ? (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`${
                          getPlatformColor(customerMessages.find(m => m.id === selectedMessage)?.platform || "")
                        } p-1.5 rounded-full`}>
                          {getPlatformIcon(customerMessages.find(m => m.id === selectedMessage)?.platform || "")}
                        </div>
                        <span className="font-medium">
                          {customerMessages.find(m => m.id === selectedMessage)?.username}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {customerMessages.find(m => m.id === selectedMessage)?.message}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Type your reply here..." 
                        className="min-h-[120px]"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleSendReply(selectedMessage)}>
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 text-center">
                    <MessageCircle className="h-10 w-10 mb-2" />
                    <p>Select a message from the list to respond</p>
                    <p className="text-sm mt-2">All customer messages from your connected social accounts will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Analytics</CardTitle>
                <CardDescription>
                  Insights and performance metrics for your social media accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-10 text-center text-gray-500">
                  <p>Analytics data will appear once you connect your accounts and gather more data.</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaManager;
