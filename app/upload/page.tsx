"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadForm } from "@/components/gallery/UploadForm";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 p-4 flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Upload Photos</h1>
        <div className="w-10"></div>
      </div>
      <p className="text-muted-foreground text-center max-w-md">
        Select photos from your device or capture new ones with your camera.
      </p>
      <UploadForm />
    </div>
  );
}
