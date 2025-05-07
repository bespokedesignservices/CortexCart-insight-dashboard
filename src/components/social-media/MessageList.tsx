
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CustomerMessage, SocialPlatform } from "@/types/social-media";

interface MessageListProps {
  messages: CustomerMessage[];
  selectedMessageId: string | null;
  setSelectedMessageId: (id: string) => void;
  socialPlatforms: SocialPlatform[];
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  selectedMessageId, 
  setSelectedMessageId,
  socialPlatforms
}) => {
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
    <div className="max-h-[500px] overflow-y-auto">
      {messages.map((message) => (
        <div 
          key={message.id}
          onClick={() => setSelectedMessageId(message.id)}
          className={`flex items-start gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMessageId === message.id ? 'bg-recoai-lightGray' : ''
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
  );
};
