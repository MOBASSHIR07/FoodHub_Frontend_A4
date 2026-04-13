import { revalidatePath } from "next/cache";
import { getAuthCookieString } from "@/lib/auth-cookie";
import { env } from "@/env";

export const createCategoryAction = async (payload: { name: string; image: string }) => {
  try {
    const cookieString = await getAuthCookieString();

    if (!cookieString) {
      return { success: false, message: "Authentication cookie not found" };
    }
  

    const res = await fetch(`${env.BACKEND_URL}/admin/categories`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieString 
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData?.message || `Backend rejected (${res.status})` 
      };
    }

    revalidatePath("/admin-dashboard/post-categories"); 
    
    return { success: true, message: "Category created successfully!" };
  } catch (err) {
    console.error("Action Error:", err);
    return { success: false, message: "Connection to server failed" };
  }
};





export const getAllCategoriesAction = async () => {
  try {
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/admin/categories`, {
      method: "GET",
      headers: { 
     
        "Cookie": cookieString 
      },
      cache: "no-store", 
    });

    const result = await res.json();


    if (!res.ok) {
        console.log("Backend Error Status:", res.status);
    }

    if (res.ok && result.success) {
      return result.data; 
    }
    return [];
  } catch (err) {
    console.error("GET_CATEGORIES_ERROR:", err);
    return [];
  }
};

export const deleteCategoryAction = async (id: string) => {
  try {
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/admin/categories/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieString 
      },
    });

    if (!res.ok) {
      const errorResponse = await res.json().catch(() => ({}));
      console.error("DELETE_FAILED_STATUS:", res.status);
      console.error("BACKEND_RESPONSE:", errorResponse);
      return { success: false, message: errorResponse.message || "Unauthorized" };
    }

    revalidatePath("/admin-dashboard/category-list");
    return { success: true };
  } catch (err) {
    console.error("DELETE_ACTION_ERROR:", err);
    return { success: false, message: "Network connection error" };
  }
};




export const updateCategoryAction = async (id: string, payload: { name: string, image: string }) => {
  try {
    const cookieString = await getAuthCookieString();
    
    const res = await fetch(`${env.BACKEND_URL}/admin/categories/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieString 
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      revalidatePath("/admin-dashboard/category-list");
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    return { success: false };
  }
};