export interface Photo {
    id: string | number;
    url: string;
    title?: string;
    description?: string;
    tags?: string[];
    albumId?: string;
    createdAt: string;
    lastModified?: string;
    isOffline?: boolean;
    size?: number;
    date?: string;
  }
  
  export interface Album {
    id: string;
    title: string;
    description?: string;
    coverUrl?: string;
    photoCount: number;
    createdAt: string;
    lastModified?: string;
    date?: string;
  }
  