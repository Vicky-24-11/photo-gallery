"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Camera, Upload, X, ImagePlus } from "lucide-react";
import { useCapacitorCamera } from "@/hooks/useCapacitorCamera";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { takePhoto } = useCapacitorCamera();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Create preview URLs
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveFile = (index: number) => {
    // Clean up the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);

    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleTakePhoto = async () => {
    try {
      const photo = await takePhoto();
      if (photo) {
        setFiles((prevFiles) => [...prevFiles, photo.file]);
        setPreviews((prevPreviews) => [...prevPreviews, photo.dataUrl]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      toast.error("Failed to take photo", {
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one photo to upload", {
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload the files to your server
      // For this example, we're simulating adding them to the gallery
      // by storing them in localStorage (this is just for demo purposes)
      const existingPhotos = JSON.parse(
        localStorage.getItem("galleryPhotos") || "[]"
      );

      const newPhotos = previews.map((preview, index) => ({
        id: Date.now() + index,
        url: preview,
        title: `Photo ${existingPhotos.length + index + 1}`,
        date: new Date().toISOString(),
      }));

      localStorage.setItem(
        "galleryPhotos",
        JSON.stringify([...existingPhotos, ...newPhotos])
      );

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `${files.length} photo${
          files.length > 1 ? "s" : ""
        } uploaded successfully`,
        {
          duration: 3000,
        }
      );

      // We're not revoking object URLs because we want to keep them for the gallery
      // In a real app with server storage, you would revoke them here

      // Reset form
      setFiles([]);
      setPreviews([]);

      // Redirect to gallery
      router.push("/gallery");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("There was an error uploading your photos", {
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="photos" className="text-lg font-medium">
                Your Photos
              </Label>
              <div className="text-sm text-muted-foreground">
                {files.length} selected
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-3">
              {previews.map((preview, index) => (
                <Card
                  key={index}
                  className="aspect-square relative overflow-hidden group"
                >
                  <CardContent className="p-0 h-full">
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundImage: `url(${preview})` }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-80 hover:opacity-100"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="aspect-square flex items-center justify-center cursor-pointer border-dashed bg-muted/40 hover:bg-muted/60 transition-colors">
                <CardContent className="p-0 flex flex-col items-center justify-center h-full w-full">
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photos"
                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                  >
                    <Upload className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs font-medium">Gallery</span>
                  </label>
                </CardContent>
              </Card>

              <Card className="aspect-square flex items-center justify-center cursor-pointer border-dashed bg-muted/40 hover:bg-muted/60 transition-colors">
                <CardContent className="p-0 flex flex-col items-center justify-center h-full w-full">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-full"
                    onClick={handleTakePhoto}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Camera className="h-6 w-6 text-primary mb-2" />
                      <span className="text-xs font-medium">Camera</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 font-medium"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                Uploading...
              </div>
            ) : (
              <div className="flex items-center">
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload {files.length > 0 ? `${files.length} Photos` : "Photos"}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
