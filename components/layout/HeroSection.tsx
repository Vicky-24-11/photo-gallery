import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 max-sm:py-0 md:py-16 text-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Photos, Anywhere, Anytime
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Upload, organize, and share your memories with our easy-to-use
              photo gallery app. Access your photos from any device, even
              offline.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/gallery">
              <Button size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Explore Gallery
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant="outline" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
