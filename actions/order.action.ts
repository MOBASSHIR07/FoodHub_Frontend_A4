"use server";

import { revalidatePath } from "next/cache";
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


// Fetch provider-specific orders
export const getProviderOrdersAction = async () => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch("https://foodhub-backend-a4-2.onrender.com/order/providers-order", {
      method: "GET",
      headers: { "Cookie": cookieString },
      cache: "no-store",
    });

    const result = await res.json();
    return res.ok && result.success ? result.data : [];
  } catch (err) {
    console.error("GET_ORDERS_ERROR:", err);
    return [];
  }
};

// Update order status
export const updateOrderStatusAction = async (orderId: string, status: string) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/order/status/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/provider-dashboard/orders");
      return { success: true, message: "Status updated" };
    }
    return { success: false, message: result.message };
  } catch (err) {
    return { success: false, message: "Network failure" };
  }
};

export const getMyOrdersAction = async () => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch("https://foodhub-backend-a4-2.onrender.com/order", {
      method: "GET",
      headers: { "Cookie": cookieString },
      cache: "no-store",
    });

    const result = await res.json();
    return res.ok && result.success ? result.data : [];
  } catch (err) {
    return [];
  }
};

export const trackOrderAction = async (orderId: string) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/order/track/${orderId}`, {
      method: "GET",
      headers: { "Cookie": cookieString },
      cache: "no-store"
    });

    const result = await res.json();
   
    return res.ok && result.success ? result.data : null;
  } catch (err) {
    console.error("TRACKING_ERROR:", err);
    return null;
  }
};