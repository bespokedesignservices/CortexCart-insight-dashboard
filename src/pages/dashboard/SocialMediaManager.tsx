
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Users, Image as ImageIcon, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AccountsTab } from "@/components/social-media/AccountsTab";
import { PostDesignerTab } from "@/components/social-media/PostDesignerTab";
import { CustomerSupportTab } from "@/components/social-media/CustomerSupportTab";
import { AnalyticsTab } from "@/components/social-media/AnalyticsTab";
import { CustomerMessage, SocialPlatform } from "@/types/social-media";

// Define our social platform types
const socialPlatforms: SocialPlatform[] = [
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-600" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-sky-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-800" }
];

// Placeholder data for connected accounts
const mockConnectedAccounts = [
  { id: "1", platform: "facebook", username: "yourbrand", lastSync: "2023-05-01T12:00:00Z", status: "connected" },
  { id: "2", platform: "instagram", username: "yourbrand", lastSync: "2023-05-01T12:00:00Z", status: "connected" },
  { id: "3", platform: "twitter", username: "yourbrand", lastSync: null, status: "disconnected" }
];

// Placeholder data for customer messages
const mockCustomerMessages: CustomerMessage[] = [
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
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleSupportChat = (enabled: boolean) => {
    setSupportEnabled(enabled);
    toast({
      title: enabled ? "Support chat enabled" : "Support chat disabled",
      description: enabled 
        ? "You will now receive customer messages from social media platforms." 
        : "You will no longer receive customer messages from social media platforms.",
    });
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
          <AccountsTab 
            connectedAccounts={connectedAccounts}
            setConnectedAccounts={setConnectedAccounts}
            socialPlatforms={socialPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="design">
          <PostDesignerTab socialPlatforms={socialPlatforms} />
        </TabsContent>
        
        <TabsContent value="support">
          <CustomerSupportTab 
            customerMessages={customerMessages}
            setCustomerMessages={setCustomerMessages}
            selectedMessageId={selectedMessageId}
            setSelectedMessageId={setSelectedMessageId}
            socialPlatforms={socialPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaManager;
