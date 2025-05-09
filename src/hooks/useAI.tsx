
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface UseAIOptions {
  model?: "gpt-4o-mini" | "gpt-4o";
  maxTokens?: number;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateCompletion = async (prompt: string, messages: Message[] = []) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("ai-completion", {
        body: {
          prompt,
          messages,
          model: options.model || "gpt-4o-mini",
          max_tokens: options.maxTokens || 500
        }
      });

      if (error) {
        console.error("Error calling AI completion function:", error);
        setError(error.message);
        toast({
          title: "AI Error",
          description: "Failed to generate AI response. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      return data;
    } catch (err: any) {
      console.error("Error in useAI hook:", err);
      setError(err.message);
      toast({
        title: "AI Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateProductDescription = async (productName: string, keywords: string[]) => {
    const prompt = `Generate a compelling product description for an e-commerce product called "${productName}". 
      Focus on these keywords: ${keywords.join(", ")}. 
      The description should be around 100 words, highlight benefits, and include persuasive language.`;
      
    return generateCompletion(prompt);
  };

  const generateSocialMediaPost = async (product: string, platform: string) => {
    const prompt = `Create a social media post for ${platform} promoting a product called "${product}". 
      The post should be engaging, include relevant hashtags, and a call to action.
      Keep it within the character limits for ${platform}.`;
      
    return generateCompletion(prompt);
  };

  const analyzeCustomerData = async (data: string) => {
    const prompt = `Analyze this customer data and provide 3-5 actionable insights:
      ${data}
      Focus on purchasing patterns, customer segments, and potential opportunities.`;
      
    return generateCompletion(prompt);
  };

  return {
    isLoading,
    error,
    generateCompletion,
    generateProductDescription,
    generateSocialMediaPost,
    analyzeCustomerData,
  };
}
