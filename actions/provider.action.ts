"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateProviderProfileAction = async (formData: {
  businessName?: string;
  location?: string;
  contactNumber?: string;
  description?: string;
  profileImage?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch("https://foodhub-backend-a4-2.onrender.com/provider/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath("provider-dashboard/kitchen-profile");
      return { success: true, message: result.message };
    }

    return { success: false, message: result.message || "Failed to update profile" };
  } catch (err) {
    console.error("UPDATE_PROFILE_ERROR:", err);
    return { success: false, message: "Internal Server Error" };
  }
};