"use client";

import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { isPlatform } from "@/lib/platform";

interface PhotoResult {
  dataUrl: string;
  file: File;
}

export function useCapacitorCamera() {
  const [isLoading, setIsLoading] = useState(false);

  const takePhoto = async (): Promise<PhotoResult | null> => {
    if (!isPlatform("capacitor")) {
      // Web fallback
      return null;
    }

    setIsLoading(true);

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (!image.dataUrl) {
        return null;
      }

      // Convert the dataUrl to a File object
      const response = await fetch(image.dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      return {
        dataUrl: image.dataUrl,
        file,
      };
    } catch (error) {
      console.error("Error taking photo:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { takePhoto, isLoading };
}
