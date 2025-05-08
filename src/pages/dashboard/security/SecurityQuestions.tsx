
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";

const securityQuestionsSchema = z.object({
  question1: z.string().min(1, "Security question is required"),
  answer1: z.string().min(3, "Answer must be at least 3 characters"),
  question2: z.string().min(1, "Security question is required"),
  answer2: z.string().min(3, "Answer must be at least 3 characters"),
  question3: z.string().min(1, "Security question is required"),
  answer3: z.string().min(3, "Answer must be at least 3 characters"),
});

type FormData = z.infer<typeof securityQuestionsSchema>;

const SecurityQuestions: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(securityQuestionsSchema),
    defaultValues: {
      question1: "",
      answer1: "",
      question2: "",
      answer2: "",
      question3: "",
      answer3: "",
    },
  });
  
  const { toast } = useToast();

  const onSubmit = (values: FormData) => {
    toast({
      title: "Security questions updated",
      description: "Your security questions have been successfully updated.",
    });
  };

  const securityQuestions = [
    "What was the name of your first pet?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "In what city were you born?",
    "What was your childhood nickname?",
    "What is the name of your favorite childhood friend?",
    "What street did you grow up on?",
    "What was the make of your first car?",
    "Where did you meet your spouse/significant other?",
  ];

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Security Questions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-recoai-purple" />
            Update Security Questions
          </CardTitle>
          <CardDescription>
            Set up security questions to help verify your identity if you forget your password or need to recover your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Question 1 */}
              <div className="space-y-4">
                <h3 className="font-medium">Question 1</h3>
                
                <FormField control={form.control} name="question1" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Question</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a security question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {securityQuestions.map((question, index) => (
                          <SelectItem key={index} value={question}>
                            {question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="answer1" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Question 2 */}
              <div className="space-y-4">
                <h3 className="font-medium">Question 2</h3>
                
                <FormField control={form.control} name="question2" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Question</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a security question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {securityQuestions.map((question, index) => (
                          <SelectItem key={index} value={question}>
                            {question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="answer2" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Question 3 */}
              <div className="space-y-4">
                <h3 className="font-medium">Question 3</h3>
                
                <FormField control={form.control} name="question3" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Question</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a security question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {securityQuestions.map((question, index) => (
                          <SelectItem key={index} value={question}>
                            {question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="answer3" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Your answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityQuestions;
