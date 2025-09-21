export interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  date?: string;
  location?: string;
  camera?: string;
  lens?: string;
  settings?: string;
}

export interface Photographer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
  priceRange: string;
  bio: string;
  portfolio: Photo[];
  featured: boolean;
  gender: 'male' | 'female';
}

export interface AvailabilitySlot {
  date: string;
  timeSlots: string[];
}