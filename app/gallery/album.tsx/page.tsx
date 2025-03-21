import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { getMockAlbumById, getMockPhotosByAlbumId } from "@/lib/mock-data";

interface AlbumPageProps {
  params: {
    albumId: string;
  };
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = params;

  // In a real app, we would fetch this data from an API
  const album = getMockAlbumById(albumId);
  const photos = getMockPhotosByAlbumId(albumId);

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold">Album not found</h1>
        <p className="text-muted-foreground mt-2">
          {` The album you're looking for doesn't exist or has been deleted.`}
        </p>
        <Link href="/gallery" className="mt-4">
          <Button>Back to Gallery</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/gallery">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{album.title}</h1>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {photos.length} photo{photos.length !== 1 && "s"}
        </p>
      </div>

      <PhotoGrid photos={photos} />
    </div>
  );
}
