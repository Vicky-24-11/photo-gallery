"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadForm } from "@/components/gallery/UploadForm";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function UploadPage() {
  const router = useRouter();

  return (
    <Layout title="Upload Photos" backBtnOff={false}>
      <div className="space-y-6 p-4 flex flex-col items-center max-sm:pt-8">
        <p className="text-muted-foreground text-center max-w-md">
          Select photos from your device or capture new ones with your camera.
        </p>
        <UploadForm />
      </div>
    </Layout>
  );
}
