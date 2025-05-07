
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerMessage, SocialPlatform } from "@/types/social-media";

interface ConversationViewProps {
  selectedMessageId: string | null;
  customerMessages: CustomerMessage[];
  setCustomerMessages: React.Dispatch<React.SetStateAction<CustomerMessage[]>>;
  setSelectedMessageId: (id: string | null) => void;
  socialPlatforms: SocialPlatform[];
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  selectedMessageId,
  customerMessages,
  setCustomerMessages,
  setSelectedMessageId,
  socialPlatforms
}) => {
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const selectedMessage = customerMessages.find(m => m.id === selectedMessageId);

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

  const handleSendReply = () => {
    if (!selectedMessageId) return;
    
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Sending reply to message:", selectedMessageId, "Text:", replyText);
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    });
    
    // Update the message as read
    setCustomerMessages(
      customerMessages.map(msg => 
        msg.id === selectedMessageId ? { ...msg, read: true } : msg
      )
    );
    
    setReplyText("");
    setSelectedMessageId(null);
  };

  if (!selectedMessageId) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 text-center">
        <MessageCircle className="h-10 w-10 mb-2" />
        <p>Select a message from the list to respond</p>
        <p className="text-sm mt-2">All customer messages from your connected social accounts will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className={`${getPlatformColor(selectedMessage?.platform || "")} p-1.5 rounded-full`}>
            {getPlatformIcon(selectedMessage?.platform || "")}
          </div>
          <span className="font-medium">{selectedMessage?.username}</span>
        </div>
        <p className="text-gray-700">{selectedMessage?.message}</p>
      </div>
      
      <div className="space-y-4">
        <Textarea 
          placeholder="Type your reply here..." 
          className="min-h-[120px]"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setSelectedMessageId(null)}>
            Cancel
          </Button>
          <Button onClick={handleSendReply}>
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
