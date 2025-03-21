import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Album } from "@/lib/types/photos";

interface AlbumGridProps {
  albums: Album[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {albums.map((album) => (
        <Link key={album.id} href={`/gallery/${album.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <CardContent className="p-0 relative aspect-square">
              {album.coverUrl ? (
                <Image
                  src={album.coverUrl}
                  alt={album.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="../../assets/images/placeHolderImage.jpeg"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No cover</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm font-medium truncate">
                  {album.title}
                </p>
                <p className="text-white/70 text-xs">
                  {album.photoCount} photos
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
