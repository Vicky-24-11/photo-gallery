"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Photo } from "@/lib/types/photos";

interface PhotoLightboxProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoLightbox({ photo, isOpen, onClose }: PhotoLightboxProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = photo.title || "photo";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading photo:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur">
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:h-96 aspect-square md:aspect-auto">
            <Image
              src={photo.url}
              alt={photo.title || "Photo"}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="../../assets/images/placeHolderImage.jpeg"
            />
          </div>
          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium">
                {photo.title || "Untitled"}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {formatDistanceToNow(new Date(photo.createdAt), {
                  addSuffix: true,
                })}
              </p>
              {photo.description && (
                <p className="mt-4 text-sm">{photo.description}</p>
              )}
              {photo.tags && photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
