
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageList } from "./MessageList";
import { ConversationView } from "./ConversationView";
import { CustomerMessage, SocialPlatform } from "@/types/social-media";

interface CustomerSupportTabProps {
  customerMessages: CustomerMessage[];
  setCustomerMessages: React.Dispatch<React.SetStateAction<CustomerMessage[]>>;
  selectedMessageId: string | null;
  setSelectedMessageId: (id: string | null) => void;
  socialPlatforms: SocialPlatform[];
}

export const CustomerSupportTab: React.FC<CustomerSupportTabProps> = ({
  customerMessages,
  setCustomerMessages,
  selectedMessageId,
  setSelectedMessageId,
  socialPlatforms
}) => {
  const unreadCount = customerMessages.filter(msg => !msg.read).length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>
            {customerMessages.length} messages from social platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <MessageList 
            messages={customerMessages}
            selectedMessageId={selectedMessageId}
            setSelectedMessageId={setSelectedMessageId}
            socialPlatforms={socialPlatforms}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>
            {selectedMessageId 
              ? `Replying to ${customerMessages.find(m => m.id === selectedMessageId)?.username}`
              : "Select a message to reply"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConversationView 
            selectedMessageId={selectedMessageId}
            customerMessages={customerMessages}
            setCustomerMessages={setCustomerMessages}
            setSelectedMessageId={setSelectedMessageId}
            socialPlatforms={socialPlatforms}
          />
        </CardContent>
      </Card>
    </div>
  );
};
