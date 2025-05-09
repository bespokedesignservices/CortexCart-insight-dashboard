
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAI } from "@/hooks/useAI";
import { Loader2, BarChart3 } from "lucide-react";

export const AIDataAnalyzer: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [analysis, setAnalysis] = useState("");
  const { isLoading, analyzeCustomerData } = useAI();

  const handleAnalyze = async () => {
    if (!inputData.trim()) return;
    
    const result = await analyzeCustomerData(inputData);
    
    if (result?.response) {
      setAnalysis(result.response);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-recoai-blue" />
          AI Data Analysis
        </CardTitle>
        <CardDescription>
          Get AI-powered insights from your customer data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your customer data here (CSV, JSON, or plain text format)"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="min-h-[150px]"
        />
        
        <Button 
          onClick={handleAnalyze} 
          disabled={isLoading || !inputData.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analyze Data
            </>
          )}
        </Button>
        
        {analysis && (
          <div className="pt-4 space-y-2 border-t">
            <h3 className="text-lg font-medium">Analysis Results:</h3>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap text-sm">
              {analysis}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
