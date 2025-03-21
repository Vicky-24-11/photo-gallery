"use client";

import { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import { isPlatform } from "@/lib/platform";
import { Photo } from "@/lib/types/photos";

export function useOfflineStorage() {
  const [offlinePhotos, setOfflinePhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOfflinePhotos();
  }, []);

  const loadOfflinePhotos = async () => {
    if (!isPlatform("capacitor")) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { value } = await Storage.get({ key: "offlinePhotos" });
      if (value) {
        setOfflinePhotos(JSON.parse(value));
      }
    } catch (error) {
      console.error("Error loading offline photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePhotoOffline = async (photo: Photo) => {
    if (!isPlatform("capacitor")) {
      return false;
    }

    try {
      const updatedPhotos = [...offlinePhotos, { ...photo, isOffline: true }];
      await Storage.set({
        key: "offlinePhotos",
        value: JSON.stringify(updatedPhotos),
      });
      setOfflinePhotos(updatedPhotos);
      return true;
    } catch (error) {
      console.error("Error saving photo offline:", error);
      return false;
    }
  };

  const removePhotoOffline = async (photoId: string) => {
    if (!isPlatform("capacitor")) {
      return false;
    }

    try {
      const updatedPhotos = offlinePhotos.filter(photo => photo.id !== photoId);
      await Storage.set({
        key: "offlinePhotos",
        value: JSON.stringify(updatedPhotos),
      });
      setOfflinePhotos(updatedPhotos);
      return true;
    } catch (error) {
      console.error("Error removing offline photo:", error);
      return false;
    }
  };

  return {
    offlinePhotos,
    isLoading,
    savePhotoOffline,
    removePhotoOffline,
    loadOfflinePhotos,
  };
}