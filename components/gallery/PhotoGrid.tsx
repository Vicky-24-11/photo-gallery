"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Trash2, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onDelete?: (photoId: number) => void;
}

export function PhotoGrid({ photos, onDelete }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  const handleDelete = (e: React.MouseEvent, photoId: number) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(photoId);
    }
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "photo"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (photo: Photo) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: photo.title,
          text: `Check out this photo: ${photo.title}`,
          url: photo.url,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(photo.url);
        alert("Photo URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing photo:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedPhoto(photo)}
          >
            <CardContent className="p-0 aspect-square relative">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${photo.url})` }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                <h3 className="text-sm font-medium truncate">{photo.title}</h3>
                <p className="text-xs text-gray-300">
                  {formatDate(photo.date)}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={(e) => handleDelete(e, photo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="absolute top-2 right-2 z-10">
            <DialogTitle>
              <VisuallyHidden>
                {selectedPhoto?.title || "Photo details"}
              </VisuallyHidden>
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/20 text-white hover:bg-black/40 h-8 w-8"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          {selectedPhoto && (
            <div className="flex flex-col">
              <div className="relative aspect-square w-full">
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${selectedPhoto.url})` }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{selectedPhoto.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {formatDate(selectedPhoto.date)}
                </p>

                <DialogFooter className="flex sm:flex-row gap-2 justify-start sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDownload(selectedPhoto.url, selectedPhoto.title)
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(selectedPhoto)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDelete(e, selectedPhoto.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
