
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your RecoAI assistant. I can help you with setting up tracking, understanding your analytics, troubleshooting issues, and more. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "How do I install the tracking widget?",
    "Why aren't my analytics showing data?",
    "How do I set up abandoned cart recovery?",
    "What's the difference between ROI and ROAS?",
    "How do I connect my marketing platforms?",
    "How to interpret my conversion funnel?"
  ];

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tracking') || lowerMessage.includes('widget') || lowerMessage.includes('install')) {
      return "To install the tracking widget:\n\n1. Go to your Dashboard > Widget Code section\n2. Copy the provided JavaScript code\n3. Paste it before the </head> tag in your website\n4. Save and publish your site\n\nThe widget will start collecting data within 24 hours. Need help with a specific platform?";
    }
    
    if (lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('showing')) {
      return "If your analytics aren't showing data, check:\n\n✅ Widget code is properly installed\n✅ Your site has recent visitor traffic\n✅ Ad blockers aren't interfering\n✅ You've waited 24-48 hours for data collection\n\nStill having issues? I can help troubleshoot further!";
    }
    
    if (lowerMessage.includes('abandoned cart') || lowerMessage.includes('cart recovery')) {
      return "Abandoned Cart Recovery helps win back customers who left items in their cart:\n\n1. Enable it in Dashboard > Cart Recovery\n2. Set up email templates for follow-ups\n3. Configure timing (1 hour, 24 hours, 3 days)\n4. Add discount incentives\n\nThis typically recovers 10-15% of abandoned carts!";
    }
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('roas')) {
      return "Great question! Here's the difference:\n\n📊 **ROI (Return on Investment):**\n- Formula: (Revenue - Cost) / Cost × 100\n- Shows profit percentage\n\n📈 **ROAS (Return on Ad Spend):**\n- Formula: Revenue / Ad Spend\n- Shows revenue per dollar spent\n\nExample: $1000 ad spend, $3000 revenue\n- ROI: 200% (you doubled your money)\n- ROAS: 3:1 (every $1 spent returned $3)";
    }
    
    if (lowerMessage.includes('connect') || lowerMessage.includes('platform') || lowerMessage.includes('integration')) {
      return "To connect marketing platforms:\n\n1. Go to Dashboard > Marketing tab\n2. Click 'Connect' on your desired platform\n3. Authorize RecoAI to access your account\n4. Select which campaigns to track\n\nSupported platforms:\n🔵 Meta Ads\n🟢 Google Ads\n⚫ TikTok Ads\n🔷 LinkedIn Ads\n🟡 Mailchimp";
    }
    
    if (lowerMessage.includes('conversion') || lowerMessage.includes('funnel')) {
      return "Your conversion funnel shows the customer journey:\n\n1. **Visitors** - People who visit your site\n2. **Engaged** - Users who interact (click, scroll)\n3. **Cart Adds** - Products added to cart\n4. **Checkout** - Users who start checkout\n5. **Purchase** - Completed transactions\n\nLook for the biggest drop-offs and optimize those steps first!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! I can assist with:\n\n🔧 Technical setup and troubleshooting\n📊 Understanding your analytics\n💰 ROI and performance optimization\n🔗 Platform integrations\n📧 Email and cart recovery\n📱 Mobile analytics\n\nWhat specific area would you like help with?";
    }
    
    return "I understand you're asking about " + userMessage + ". Let me help you with that!\n\nFor specific technical issues, I recommend:\n1. Checking our Guides section for step-by-step tutorials\n2. Reviewing your dashboard settings\n3. Contacting our support team for personalized help\n\nIs there a specific feature or setup you need help with?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          AI Support Assistant
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-auto">Online</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white ml-auto'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm">{message.text}</div>
                  <div className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {!message.isBot && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {messages.length === 1 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Popular Questions:</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left text-xs p-2 bg-white border rounded hover:bg-gray-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about RecoAI..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
