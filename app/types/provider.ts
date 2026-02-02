
export interface Category {
  id: string;
  name: string;
  image?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}


export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  customerId: string;
  mealId: string;
  createdAt: string | Date;
}


export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  isAvailable: boolean;
  cuisine?: string | null;
  dietaryPreferences?: string | null;
  categoryId: string;
  providerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
 
  category: Category;
  provider: {
    businessName: string;
    address?: string | null;
  };
  reviews: Review[];
  _count?: {
    reviews: number;
  };
}


export interface Provider {
  id: string;
  businessName: string;
  address?: string | null;
  description?: string | null;
  coverImage?: string | null;
  rating: number;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  _count?: {
    meals: number;
  };
}

export interface ProviderDetail extends Provider {
  meals: Meal[];
}

export interface DashboardLayoutProps {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}

export type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";