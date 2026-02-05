"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createCategoryAction = async (payload: { name: string; image: string }) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;

    if (!myAuthCookie) {
      return { success: false, message: "Authentication cookie not found" };
    }
  

    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/admin/categories`, {
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
    // 1. Grab the auth cookie from the browser
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch("https://foodhub-backend-a4-2.onrender.com/admin/categories", {
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
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    
   
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/admin/categories/${id}`, {
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
  const cookieStore = await cookies();
  const myAuthCookie = cookieStore.get("auth_session")?.value;
  const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

  const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/admin/categories/${id}`, {
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
};