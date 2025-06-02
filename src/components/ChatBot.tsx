
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ContactFormData {
  name: string;
  email: string;
  preferredTime: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! I'm Charlie, your friendly assistant here at CortexCart 👋 I'm here to help — ask me anything about our services, or I can help you book a call with us!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    preferredTime: ""
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("pricing") || message.includes("price") || message.includes("cost")) {
      return "Great question! CortexCart offers flexible pricing plans starting with a free trial. We have Starter, Professional, and Enterprise plans to suit different business needs. Would you like me to schedule a call where we can discuss which plan would work best for your specific requirements?";
    }
    
    if (message.includes("features") || message.includes("what do") || message.includes("capabilities")) {
      return "CortexCart is an AI-powered e-commerce analytics platform! Our key features include real-time customer insights, AI product recommendations, customer segmentation, social media post management, and seamless integrations with platforms like Shopify, WooCommerce, and more. What specific feature interests you most?";
    }
    
    if (message.includes("integration") || message.includes("platform") || message.includes("shopify") || message.includes("woocommerce")) {
      return "We integrate with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, PrestaShop, OpenCart, and custom platforms. Plus we connect with marketing tools like Google Analytics, Klaviyo, Mailchimp, and social media platforms. Which platform are you currently using?";
    }
    
    if (message.includes("demo") || message.includes("trial") || message.includes("test")) {
      return "Absolutely! We offer a free trial so you can experience CortexCart's power firsthand. Would you like me to help you book a personalized demo call where we can show you exactly how CortexCart can boost your store's performance?";
    }
    
    if (message.includes("call") || message.includes("consultation") || message.includes("talk") || message.includes("meeting")) {
      setShowContactForm(true);
      return "I'd love to help you book a call! Please fill out the quick form below and we'll get you connected with our team for a free consultation.";
    }
    
    if (message.includes("help") || message.includes("support")) {
      return "I'm here to help! You can ask me about our features, pricing, integrations, or I can help you schedule a call with our team. We also have a comprehensive Help Center for existing customers. What would you like to know more about?";
    }
    
    return "That's a great question! I'd love to give you a detailed answer. Would you like to schedule a quick call where one of our experts can dive deep into your specific needs and show you exactly how CortexCart can help your business grow?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue);
    const userMessage = inputValue;
    setInputValue("");
    
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      addMessage(botResponse, true);
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Consultation Booked!",
      description: "Thanks! We'll reach out soon to schedule your free consultation."
    });
    setShowContactForm(false);
    addMessage("Perfect! We've received your details and will be in touch within 24 hours to schedule your consultation. Looking forward to chatting!", true);
    setContactForm({ name: "", email: "", preferredTime: "" });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-cortexcart-purple hover:bg-cortexcart-purple/90 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-cortexcart-purple text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold">Charlie - CortexCart Assistant</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-[440px] p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? "bg-gray-100 text-gray-900"
                    : "bg-cortexcart-purple text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {showContactForm && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Book Your Free Consultation
              </h4>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Preferred time (e.g., Tomorrow 2pm)"
                  value={contactForm.preferredTime}
                  onChange={(e) => setContactForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                  required
                />
                <Button type="submit" className="w-full bg-cortexcart-purple hover:bg-cortexcart-purple/90">
                  Book Consultation
                </Button>
              </form>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-cortexcart-purple hover:bg-cortexcart-purple/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
