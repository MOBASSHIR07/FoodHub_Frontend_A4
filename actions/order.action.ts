"use server";

import { cookies } from "next/headers";

export const getAllOrdersAction = async (params: {
  cuisine?: string;
  dietaryPreferences?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    
   
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const query = new URLSearchParams();
    if (params.cuisine) query.append("cuisine", params.cuisine);
    if (params.dietaryPreferences) query.append("dietaryPreferences", params.dietaryPreferences);
    if (params.status) query.append("status", params.status);
    query.append("page", (params.page || 1).toString());
    query.append("limit", (params.limit || 10).toString());

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/admin/orders?${query.toString()}`, {
      method: "GET",
      headers: { 
        "Cookie": cookieString 
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return result.data; 
    }
    return [];
  } catch (err) {
    console.error("GET_ORDERS_ERROR:", err);
    return [];
  }
};