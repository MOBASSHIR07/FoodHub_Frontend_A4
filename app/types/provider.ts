export interface Provider {
  id: string;
  businessName: string;
  address: string | null;
  description: string | null;
  coverImage: string | null;
  rating: number;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  _count?: {
    meals: number;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  cuisine: string | null;
  dietaryPreferences: string | null;
  category: { name: string };
  _count?: {
    reviews: number;
  };
}

export interface ProviderDetail {
  id: string;
  businessName: string;
  address: string | null;
  description: string | null;
  coverImage: string | null;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  meals: Meal[]; 
}