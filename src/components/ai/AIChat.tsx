
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAI } from "@/hooks/useAI";
import { Loader2, Bot, User, Send, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIChatProps {
  title?: string;
  description?: string;
  placeholder?: string;
  initialMessages?: Message[];
  systemPrompt?: string;
}

export const AIChat: React.FC<AIChatProps> = ({
  title = "AI Assistant",
  description = "Ask me anything about your e-commerce store",
  placeholder = "Type your question here...",
  initialMessages = [],
  systemPrompt = "You are an AI assistant for an e-commerce platform called RecoAI. You help users with product recommendations, answer questions about the platform, and provide insights about their store data. Keep responses concise and helpful.",
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { isLoading, generateCompletion } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on message change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with system message if not provided
  useEffect(() => {
    if (initialMessages.length === 0 && systemPrompt) {
      setMessages([{ role: "system", content: systemPrompt }]);
    }
  }, [initialMessages.length, systemPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Get all messages except system ones for display
    const displayMessages = messages.filter(m => m.role !== "system");

    // Create full history of messages for API
    const fullMessages = [
      // Include system message if it exists
      ...messages.filter(m => m.role === "system"),
      // Include display messages
      ...displayMessages,
      // Include new user message
      userMessage
    ];

    // Call OpenAI API
    const result = await generateCompletion("", fullMessages);
    
    if (result?.response) {
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: result.response }
      ]);
    }
  };

  const handleReset = () => {
    setMessages(initialMessages.length > 0 
      ? initialMessages 
      : [{ role: "system", content: systemPrompt }]);
  };

  // Filter out system messages for display
  const displayMessages = messages.filter(m => m.role !== "system");

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-recoai-purple" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {displayMessages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="w-12 h-12 mx-auto mb-2 text-recoai-purple opacity-50" />
              <p>Start a conversation with the AI assistant.</p>
            </div>
          ) : (
            displayMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-lg p-3 
                    ${msg.role === "user" 
                      ? "bg-recoai-purple text-white" 
                      : "bg-muted border border-border"
                    }
                  `}
                >
                  <div className="flex items-center mb-1">
                    {msg.role === "user" ? (
                      <>
                        <Badge variant="outline" className="bg-white text-recoai-purple">You</Badge>
                        <User className="h-3 w-3 ml-1 text-white" />
                      </>
                    ) : (
                      <>
                        <Badge variant="outline">AI</Badge>
                        <Bot className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-grow resize-none"
              rows={2}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={handleReset}
                disabled={isLoading || displayMessages.length === 0}
                title="Reset conversation"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
