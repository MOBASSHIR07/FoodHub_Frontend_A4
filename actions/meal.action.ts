"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createMealAction = async (data: {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  cuisine?: string;
  dietaryPreferences?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const myAuthCookie = cookieStore.get("auth_session")?.value;
    const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

    const res = await fetch("https://foodhub-backend-a4-2.onrender.com/meal/add-meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/provider-dashboard/menu-management");
      return { success: true, message: "Meal added to kitchen registry." };
    }
    return { success: false, message: result.message || "Failed to create meal." };
  } catch (err) {
    return { success: false, message: "Connection to central server failed." };
  }
};