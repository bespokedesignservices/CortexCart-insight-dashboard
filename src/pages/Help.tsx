
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Help: React.FC = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-recoai-gray mt-2">Get assistance with using RecoAI platform.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Knowledge Base</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Browse our knowledge base for answers to common questions.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Reach out to our support team for personalized assistance.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Video Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Watch tutorials on how to use various features of the platform.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-recoai-gray">Find answers to frequently asked questions about our services.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
