"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieString } from "@/lib/auth-cookie";
import { env } from "@/env";

export const updateUserStatusAction = async (userId: string, newStatus: string) => {
  try {
    const cookieString = await getAuthCookieString();

    if (!cookieString) {
      return { success: false, message: "Authentication cookie not found" };
    }
  
    const res = await fetch(`${env.BACKEND_URL}/admin/users/${userId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieString 
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData?.message || `Backend rejected the update (${res.status})` 
      };
    }

    revalidatePath("/admin-dashboard/users"); 
    
    return { success: true, message: `User status updated to ${newStatus}` };
  } catch (err) {
    console.error("Action Error:", err);
    return { success: false, message: "Connection to server failed" };
  }
};