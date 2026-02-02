"use server";

import { userService } from "@/service/user.service";
import { cookies } from "next/headers";
import {parse} from "cookie"

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
  phoneNumber?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
export const signUpUserAction = async (values: RegisterInput) => {
  try {
    const { data, ok } = await userService.register(values);

    if (!ok) {
      return {
        success: false,
        message: data?.error?.message || data?.message || "Registration failed"
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: "Server connection failed" };
  }
};


export const signInUserAction = async (values: LoginInput) => {
  try {
    const res = await userService.login(values);
    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data?.message || "Login failed" };
    }

    const cookieStore = await cookies();
    const rawCookies = res.headers.getSetCookie();

  for (const c of rawCookies) {
      const parsed = parse(c); 
      const name = Object.keys(parsed)[0]; 
      const value = parsed[name];
      if (name && typeof value === 'string') {
        cookieStore.set(name, value, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
    }
    
    return { success: true };
  } catch (err) {
    console.error("Login Action Error:", err);
    return { success: false, message: "Login error" };
  }
}