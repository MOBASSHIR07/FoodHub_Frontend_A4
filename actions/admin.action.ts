"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (userId: string, newStatus: string) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;

    if (!myAuthCookie) {
      return { success: false, message: "Authentication cookie not found" };
    }
  
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch(`https://foodhub-backend-a4-2.onrender.com/admin/users/${userId}`, {
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