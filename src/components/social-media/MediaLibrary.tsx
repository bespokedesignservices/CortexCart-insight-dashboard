
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Folder, X } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image";
  createdAt: string;
}

interface MediaLibraryProps {
  onSelectImage: (url: string) => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectImage }) => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<MediaItem[]>([
    {
      id: "1",
      name: "Product showcase",
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      type: "image",
      createdAt: "2023-04-15T10:30:00Z"
    },
    {
      id: "2",
      name: "Team meeting",
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      type: "image",
      createdAt: "2023-04-10T14:20:00Z"
    },
    {
      id: "3",
      name: "Mountain landscape",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      type: "image",
      createdAt: "2023-03-22T09:15:00Z"
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // In a real implementation, we would upload the file to a server here
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const newFile: MediaItem = {
          id: `${Date.now()}`,
          name: file.name.split('.')[0],
          url: URL.createObjectURL(file),
          type: "image",
          createdAt: new Date().toISOString()
        };
        
        setUploadedFiles([newFile, ...uploadedFiles]);
        setIsUploading(false);
        
        toast({
          title: "Image uploaded",
          description: `${file.name} has been added to your library.`
        });
      }, 1000);
    }
  };

  const handleDeleteImage = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    toast({
      title: "Image deleted",
      description: "The image has been removed from your library."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Media Library</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input 
            type="file" 
            accept="image/*" 
            className="flex-1" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button disabled={isUploading} variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          {uploadedFiles.length === 0 ? (
            <div className="col-span-3 py-8 text-center text-gray-500">
              <Folder className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No images yet. Upload your first image!</p>
            </div>
          ) : (
            uploadedFiles.map((file) => (
              <div key={file.id} className="relative group border rounded overflow-hidden">
                <img 
                  src={file.url} 
                  alt={file.name} 
                  className="w-full h-24 object-cover cursor-pointer"
                  onClick={() => onSelectImage(file.url)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white"
                    onClick={() => onSelectImage(file.url)}
                  >
                    Use
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white"
                    onClick={() => handleDeleteImage(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                  <p className="text-white text-xs truncate">{file.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
