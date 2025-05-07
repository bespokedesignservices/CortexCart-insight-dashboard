
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, isUploading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input 
        type="file" 
        accept="image/*" 
        className="flex-1" 
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button disabled={isUploading} variant="outline" className="gap-2">
        <Upload className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};
