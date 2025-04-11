
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Download, Trash2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminMedia: React.FC = () => {
  // Sample media data
  const mediaItems = [
    { id: 1, name: "hero-image.jpg", type: "image", size: "1.2 MB", uploaded: "2025-04-10" },
    { id: 2, name: "product-demo.mp4", type: "video", size: "8.5 MB", uploaded: "2025-04-08" },
    { id: 3, name: "logo.png", type: "image", size: "0.4 MB", uploaded: "2025-04-05" },
    { id: 4, name: "brochure.pdf", type: "document", size: "2.3 MB", uploaded: "2025-04-01" },
    { id: 5, name: "team-photo.jpg", type: "image", size: "3.1 MB", uploaded: "2025-03-28" },
    { id: 6, name: "presentation.pptx", type: "document", size: "5.7 MB", uploaded: "2025-03-25" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Media Library</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>All Media</CardTitle>
            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search media..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-md border bg-background">
                    <div className="aspect-square p-2 flex items-center justify-center bg-muted/20">
                      {item.type === "image" ? (
                        <img 
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : item.type === "video" ? (
                        <video className="max-w-full max-h-full object-cover opacity-75" />
                      ) : (
                        <div className="text-4xl opacity-50">📄</div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                      <Button size="icon" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-sm">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Type</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Size</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Uploaded</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mediaItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3 capitalize">{item.type}</td>
                        <td className="px-4 py-3">{item.size}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.uploaded}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;
