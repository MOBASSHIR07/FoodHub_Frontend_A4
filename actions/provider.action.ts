"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieString } from "@/lib/auth-cookie";
import { env } from "@/env";

export const updateProviderProfileAction = async (formData: {
  businessName?: string;
  location?: string;
  contactNumber?: string;
  description?: string;
  profileImage?: string;
}) => {
  try {
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/provider/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath("/provider-dashboard/kitchen-profile");
      return { success: true, message: result.message };
    }

    return { success: false, message: result.message || "Failed to update profile" };
  } catch (err) {
    console.error("UPDATE_PROFILE_ERROR:", err);
    return { success: false, message: "Internal Server Error" };
  }
};