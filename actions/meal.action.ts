"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieString } from "@/lib/auth-cookie";
import { env } from "@/env";

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
    const cookieString = await getAuthCookieString();

    const res = await fetch(`${env.BACKEND_URL}/meal/add-meal`, {
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