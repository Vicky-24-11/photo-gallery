"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { AlbumGrid } from "@/components/gallery/AlbumGrid";
import { getMockPhotos } from "@/lib/mock-data";

// Ensure the Photo interface is imported or defined globally
interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
}
import { getMockAlbums } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import Layout from "@/components/Layout";

// Define proper photo type
interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const albums = getMockAlbums();
  const router = useRouter();

  // Improved photo loading function to ensure data persistence
  const loadPhotos = () => {
    try {
      // Get mock photos
      const mockPhotos = getMockPhotos();

      // Retrieve stored photos with proper error handling
      let storedPhotos: Photo[] = [];
      const storedData = localStorage.getItem("galleryPhotos");

      if (storedData) {
        storedPhotos = JSON.parse(storedData);

        // Validate that stored photos have the required properties
        storedPhotos = storedPhotos.filter(
          (photo) =>
            photo &&
            typeof photo === "object" &&
            "id" in photo &&
            "url" in photo &&
            "title" in photo &&
            "date" in photo
        );
      }

      // Create a Map to deduplicate photos by ID
      const photoMap = new Map();

      // Add stored photos first (they take precedence)
      storedPhotos.forEach((photo) => {
        photoMap.set(photo.id, photo);
      });

      // Add mock photos only if their ID doesn't exist in stored photos
      mockPhotos.forEach((photo) => {
        if (!photoMap.has(photo.id)) {
          photoMap.set(photo.id, photo);
        }
      });

      // Convert Map back to array
      const mergedPhotos = Array.from(photoMap.values());

      // Sort by date (newest first)
      mergedPhotos.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setPhotos(mergedPhotos);
    } catch (error) {
      console.error("Error loading photos:", error);
      // Fall back to mock photos if there's an error
      setPhotos(getMockPhotos());
    }
  };

  // Add listener for storage events to update photos when localStorage changes
  useEffect(() => {
    // Load photos on component mount
    loadPhotos();

    // Setup event listener for storage changes (if user has multiple tabs open)
    const handleStorageChange = (e) => {
      if (e.key === "galleryPhotos") {
        loadPhotos();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle photo deletion
  const handleDeletePhoto = (photoId: number) => {
    // Remove photo from state
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(updatedPhotos);

    // Update localStorage
    // Only store user-uploaded photos (not mock photos)
    const mockPhotoIds = getMockPhotos().map((p) => p.id);
    const userPhotos = updatedPhotos.filter(
      (p) => !mockPhotoIds.includes(p.id.toString())
    );

    localStorage.setItem("galleryPhotos", JSON.stringify(userPhotos));
  };

  return (
    <Layout
      title="Gallery"
      rightContainer={
        <Button
          size="sm"
          onClick={() => router.push("/upload")}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      }
    >
      <div className="space-y-6 p-4 pb-20 pt-8">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="photos" className="text-sm font-medium">
              Photos
            </TabsTrigger>
            <TabsTrigger value="albums" className="text-sm font-medium">
              Albums
            </TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="pt-4">
            {photos.length > 0 ? (
              <PhotoGrid photos={photos} onDelete={handleDeletePhoto} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted rounded-full p-6 mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 9H9.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 9H15.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 14H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No photos yet</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-4">
                  Upload photos to see them here
                </p>
                <Button onClick={() => router.push("/upload")}>
                  Upload Photos
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="albums" className="pt-4">
            <AlbumGrid albums={albums} />
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Button
            onClick={() => router.push("/upload")}
            size="lg"
            className="rounded-full shadow-lg px-8"
          >
            <Plus className="h-5 w-5 mr-2" />
            Upload New Photos
          </Button>
        </div>
      </div>
    </Layout>
  );
}
