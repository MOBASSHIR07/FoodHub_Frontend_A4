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