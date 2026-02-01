import { env } from "@/env";
import { Meal } from "@/app/types/provider";

const API_URL = env.BACKEND_URL;

export const mealService = {
  getAllMeals: async function (revalidate = 3600) {
    try {
      const res = await fetch(`${API_URL}/meal/all-meal`, {
        method: "GET",
        headers: {
          "Origin": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000",
        },
        next: { 
          revalidate,
          tags: ["meals"] 
        }
      });

      if (!res.ok) throw new Error("Failed to fetch meals");
      
      const result = await res.json();
     
      return { data: result.data as Meal[], error: null };
    } catch (err) {
      console.error("Meal Fetch Error:", err);
      return { data: null, error: { message: "Could not load featured meals" } };
    }
  }
};