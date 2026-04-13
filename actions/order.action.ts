"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieString } from "@/lib/auth-cookie";
import { env } from "@/env";

export const getAllOrdersAction = async (params: {
  cuisine?: string;
  dietaryPreferences?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const cookieString = await getAuthCookieString();

    const query = new URLSearchParams();
    if (params.cuisine) query.append("cuisine", params.cuisine);
    if (params.dietaryPreferences) query.append("dietaryPreferences", params.dietaryPreferences);
    if (params.status) query.append("status", params.status);
    query.append("page", (params.page || 1).toString());
    query.append("limit", (params.limit || 10).toString());

    const res = await fetch(`${env.BACKEND_URL}/admin/orders?${query.toString()}`, {
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
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/order/providers-order`, {
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
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/order/status/${orderId}`, {
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
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/order`, {
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
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/order/track/${orderId}`, {
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



// Place a new order
export const createOrderAction = async (payload: { 
  deliveryAddress: string; 
  items: { mealId: string; quantity: number }[] 
}) => {
  try {
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok && result.success) {
    
      revalidatePath("/dashboard/my-orders");
      revalidatePath("/provider-dashboard/orders");
      return { success: true, message: "Order placed successfully", data: result.data };
    }

    return { 
      success: false, 
      message: result.message || "Failed to finalize order" 
    };
  } catch (err) {
    console.error("CREATE_ORDER_ERROR:", err);
    return { success: false, message: "Network connection failed" };
  }
};