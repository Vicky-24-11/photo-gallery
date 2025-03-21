
import { Album, Photo } from "@/lib/types/photos";
import { v4 as uuidv4 } from "uuid";

// Mock photos data
const mockPhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Mountain Landscape",
    description: "Beautiful mountain landscape with a lake",
    tags: ["nature", "landscape", "mountains"],
    albumId: "1",
    createdAt: "2023-10-15T10:30:00Z",
    date: "2023-10-15T10:30:00Z",
    size: 2500000,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    title: "Forest Path",
    description: "A winding path through a dense forest",
    tags: ["nature", "forest", "path"],
    albumId: "1",
    createdAt: "2023-10-16T08:45:00Z",
    date: "2023-10-16T08:45:00Z",
    size: 1800000,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Sunset Beach",
    description: "Golden sunset over a tropical beach",
    tags: ["beach", "sunset", "ocean"],
    albumId: "2",
    createdAt: "2023-10-17T18:20:00Z",
    date: "2023-10-17T18:20:00Z",
    size: 3100000,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    title: "Forest Sunlight",
    description: "Sunlight filtering through forest trees",
    tags: ["nature", "forest", "sunlight"],
    albumId: "1",
    createdAt: "2023-10-18T14:10:00Z",
    date: "2023-10-18T14:10:00Z",
    size: 2200000,
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Tropical Beach",
    description: "White sand beach with palm trees",
    tags: ["beach", "tropical", "vacation"],
    albumId: "2",
    createdAt: "2023-10-19T09:55:00Z",
    date: "2023-10-19T09:55:00Z",
    size: 2700000,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33",
    title: "Urban Skyline",
    description: "City skyline at night with lights",
    tags: ["city", "urban", "night"],
    albumId: "3",
    createdAt: "2023-10-20T22:30:00Z",
    date: "2023-10-20T22:30:00Z",
    size: 3500000,
  },
];

// Mock albums data
const mockAlbums: Album[] = [
    {
      id: "1",
      title: "Nature",
      description: "Beautiful natural landscapes",
      coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      photoCount: 3,
      createdAt: "2023-10-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Beaches",
      description: "Beach vacations and ocean views",
      coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      photoCount: 2,
      createdAt: "2023-10-17T18:00:00Z",
    },
    {
      id: "3",
      title: "Urban",
      description: "City life and architecture",
      coverUrl: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33",
      photoCount: 1,
      createdAt: "2023-10-20T22:00:00Z",
    },
  ];
  
  // Helper functions to simulate API calls
  export const getMockPhotos = (): Photo[] => {
    return mockPhotos;
  };
  
  export const getMockPhotoById = (id: string): Photo | undefined => {
    return mockPhotos.find(photo => photo.id === id);
  };
  
  export const getMockPhotosByAlbumId = (albumId: string): Photo[] => {
    return mockPhotos.filter(photo => photo.albumId === albumId);
  };
  
  export const getMockAlbums = (): Album[] => {
    return mockAlbums;
  };
  
  export const getMockAlbumById = (id: string): Album | undefined => {
    return mockAlbums.find(album => album.id === id);
  };
  
  export const createMockPhoto = (photoData: Partial<Photo>): Photo => {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      url: photoData.url || "https://via.placeholder.com/400",
      title: photoData.title || "Untitled",
      description: photoData.description,
      tags: photoData.tags || [],
      albumId: photoData.albumId,
      createdAt: now,
      lastModified: now,
      isOffline: false,
      size: photoData.size || 1000000,
    };
  };
  
  export const createMockAlbum = (albumData: Partial<Album>): Album => {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      title: albumData.title || "New Album",
      description: albumData.description,
      coverUrl: albumData.coverUrl,
      photoCount: albumData.photoCount || 0,
      createdAt: now,
      lastModified: now,
    };
  };
  