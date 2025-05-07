
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Link } from "lucide-react";
import { SocialPlatform } from "@/types/social-media";
import { MediaLibrary } from "./MediaLibrary";

// Form schema
const postDesignerSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
});

interface PostDesignerTabProps {
  socialPlatforms: SocialPlatform[];
}

export const PostDesignerTab: React.FC<PostDesignerTabProps> = ({ socialPlatforms }) => {
  const { toast } = useToast();
  const [mediaTab, setMediaTab] = useState<"editor" | "library">("editor");
  
  const postDesignerForm = useForm<z.infer<typeof postDesignerSchema>>({
    resolver: zodResolver(postDesignerSchema),
    defaultValues: {
      platform: "",
      content: "",
      imageUrl: "",
      linkUrl: "",
    },
  });

  const handleCreatePost = (data: z.infer<typeof postDesignerSchema>) => {
    console.log("Creating post:", data);
    toast({
      title: "Post created",
      description: `Your post has been created for ${data.platform}.`,
    });
    
    postDesignerForm.reset();
  };

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

  const handleSelectImage = (url: string) => {
    postDesignerForm.setValue("imageUrl", url);
    setMediaTab("editor");
    toast({
      title: "Image selected",
      description: "The image has been added to your post."
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Designer</CardTitle>
            <CardDescription>
              Create optimized posts for different platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mediaTab} onValueChange={(value) => setMediaTab(value as "editor" | "library")}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="editor" className="flex-1">Post Editor</TabsTrigger>
                <TabsTrigger value="library" className="flex-1">Media Library</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor">
                <Form {...postDesignerForm}>
                  <form onSubmit={postDesignerForm.handleSubmit(handleCreatePost)} className="space-y-4">
                    <FormField
                      control={postDesignerForm.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {socialPlatforms.map((platform) => (
                                <SelectItem key={platform.id} value={platform.id}>
                                  <div className="flex items-center gap-2">
                                    <platform.icon className="h-4 w-4" />
                                    <span>{platform.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={postDesignerForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your post content here..." 
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {postDesignerForm.watch("platform") === "twitter" && (
                              <span className="text-xs">Maximum 280 characters</span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={postDesignerForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setMediaTab("library")}
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormDescription>
                            {postDesignerForm.watch("platform") && (
                              <span className="text-xs">
                                Recommended image size for {
                                  socialPlatforms.find(p => p.id === postDesignerForm.watch("platform"))?.name
                                }: 
                                {postDesignerForm.watch("platform") === "instagram" ? " 1080x1080px" : 
                                  postDesignerForm.watch("platform") === "twitter" ? " 1200x675px" :
                                  postDesignerForm.watch("platform") === "facebook" ? " 1200x630px" :
                                  postDesignerForm.watch("platform") === "linkedin" ? " 1104x736px" : ""}
                              </span>
                            )}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={postDesignerForm.control}
                      name="linkUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com/page" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll automatically generate a short trackable link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Create Post</Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="library">
                <MediaLibrary onSelectImage={handleSelectImage} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Preview</CardTitle>
            <CardDescription>
              See how your post will look on different platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            {postDesignerForm.watch("platform") ? (
              <div className="border rounded-md p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`${getPlatformColor(postDesignerForm.watch("platform"))} p-2 rounded-full`}>
                    {getPlatformIcon(postDesignerForm.watch("platform"))}
                  </div>
                  <div>
                    <p className="font-medium">Your Brand</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm">{postDesignerForm.watch("content") || "Your post will appear here..."}</p>
                </div>
                
                {postDesignerForm.watch("imageUrl") && (
                  <div className="mt-2 rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={postDesignerForm.watch("imageUrl")} 
                      alt="Post image" 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5";
                      }}
                    />
                  </div>
                )}
                
                {postDesignerForm.watch("linkUrl") && (
                  <div className="mt-2 border rounded border-gray-200 p-2 text-sm">
                    <Link className="h-4 w-4 inline mr-1" />
                    {postDesignerForm.watch("linkUrl")}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500 text-center">
                <div>
                  <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                  <p>Select a platform and create your post to see a preview</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div>
              <h4 className="font-medium mb-1">Platform-specific optimization tips</h4>
              <div className="text-sm text-gray-500">
                {postDesignerForm.watch("platform") === "facebook" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Keep posts under 80 characters for higher engagement</li>
                    <li>Include a clear call to action</li>
                    <li>Posts with images get 2.3x more engagement</li>
                  </ul>
                )}
                {postDesignerForm.watch("platform") === "instagram" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use relevant hashtags (5-10 is optimal)</li>
                    <li>Square images perform best</li>
                    <li>Questions increase comment engagement</li>
                  </ul>
                )}
                {postDesignerForm.watch("platform") === "twitter" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Keep tweets between 71-100 characters for optimal engagement</li>
                    <li>Use no more than 1-2 hashtags</li>
                    <li>Tweets with images receive 150% more retweets</li>
                  </ul>
                )}
                {postDesignerForm.watch("platform") === "linkedin" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Posts under 150 characters get 50% higher engagement</li>
                    <li>Professional tone performs better</li>
                    <li>Industry-specific hashtags increase visibility</li>
                  </ul>
                )}
                {!postDesignerForm.watch("platform") && (
                  <p>Select a platform to see optimization tips</p>
                )}
              </div>
            </div>
            <Button variant="outline" disabled={!postDesignerForm.watch("platform")}>
              Schedule Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
