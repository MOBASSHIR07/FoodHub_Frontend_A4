import { env } from "@/env";
import { Meal } from "@/app/types/provider";

const API_URL = env.BACKEND_URL;

export const mealService = {
  getAllMeals: async function (
    params?: { 
      page?: number; 
      limit?: number; 
      cuisine?: string; 
      dietaryPreferences?: string 
    },
    revalidate = 1
  ) {
    try {
     
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.cuisine) queryParams.append("cuisine", params.cuisine);
      if (params?.dietaryPreferences) queryParams.append("dietaryPreferences", params.dietaryPreferences);

      const queryString = queryParams.toString();
      const url = `${API_URL}/meal/all-meal${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Origin": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000",
        },
        next: { 
          revalidate,
          tags: ["meals"] 
        }
      });

      if (!res.ok) throw new Error(`Failed to fetch meals: ${res.status}`);
      
      const result = await res.json();
     
      return { 
        data: result.data as Meal[], 
        meta: result.meta, 
        error: null 
      };
    } catch (err) {
      console.error("Meal Fetch Error:", err);
      return { data: null, meta: null, error: { message: "Could not load meals" } };
    }
  },


  getMealById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/meal/${id}`, {
        headers: {
          "Origin": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000",
        },
      });
      if (!res.ok) throw new Error("Meal not found");
      const result = await res.json();
      return { data: result.data as Meal, error: null };
    } catch (err) {
      return { data: null, error: { message: "Meal not found" } };
    }
  }
};