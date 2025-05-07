
import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, X } from "lucide-react";
import { MediaItem } from "@/types/social-media";

interface MediaGridProps {
  mediaItems: MediaItem[];
  onSelectImage: (url: string) => void;
  onDeleteImage: (id: string) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ 
  mediaItems, 
  onSelectImage, 
  onDeleteImage 
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {mediaItems.length === 0 ? (
        <div className="col-span-3 py-8 text-center text-gray-500">
          <Folder className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>No images yet. Upload your first image!</p>
        </div>
      ) : (
        mediaItems.map((file) => (
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
                onClick={() => onDeleteImage(file.id)}
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
  );
};
