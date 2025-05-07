
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MediaItem } from "@/types/social-media";
import { FileUploader } from "./FileUploader";
import { MediaGrid } from "./MediaGrid";

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

  const handleFileUpload = (file: File) => {
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
        <FileUploader 
          onFileUpload={handleFileUpload}
          isUploading={isUploading}
        />
        
        <MediaGrid 
          mediaItems={uploadedFiles}
          onSelectImage={onSelectImage}
          onDeleteImage={handleDeleteImage}
        />
      </CardContent>
    </Card>
  );
};
