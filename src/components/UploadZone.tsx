import { useState, useCallback } from "react";
import { Upload, Image, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface UploadedFile {
  file: File;
  preview: string;
  status: "pending" | "uploading" | "complete" | "error";
}

const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));

    if (newFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload image files only (JPG, PNG, GIF, WebP)",
        variant: "destructive",
      });
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const simulateUpload = useCallback(() => {
    setFiles((prev) =>
      prev.map((f) => ({ ...f, status: "uploading" as const }))
    );

    // Simulate upload progress
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: "complete" as const }))
      );
      toast({
        title: "Upload complete!",
        description: `${files.length} image(s) uploaded successfully to S3.`,
      });
    }, 2000);
  }, [files.length]);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
          "hover:border-accent hover:bg-accent/5",
          isDragging
            ? "border-accent bg-accent/10 scale-[1.02]"
            : "border-border"
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300",
              isDragging ? "bg-accent text-accent-foreground scale-110" : "bg-muted"
            )}
          >
            <Upload className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {isDragging ? "Drop your images here" : "Drag & drop images"}
            </h3>
            <p className="text-muted-foreground mt-1">
              or click to browse • JPG, PNG, GIF, WebP up to 10MB
            </p>
          </div>
        </div>
      </div>

      {/* File Preview List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              {files.length} file(s) selected
            </h3>
            <Button variant="accent" onClick={simulateUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload to S3
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className={cn(
                  "relative group rounded-xl overflow-hidden bg-card shadow-md",
                  "animate-scale-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Status Overlay */}
                {file.status === "uploading" && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <div className="h-8 w-8 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {file.status === "complete" && (
                  <div className="absolute inset-0 bg-accent/80 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-accent-foreground" />
                  </div>
                )}

                {/* Remove Button */}
                {file.status === "pending" && (
                  <button
                    onClick={() => removeFile(index)}
                    className={cn(
                      "absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground",
                      "flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    )}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* File name */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-foreground/80 to-transparent">
                  <p className="text-xs text-primary-foreground truncate">
                    {file.file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
