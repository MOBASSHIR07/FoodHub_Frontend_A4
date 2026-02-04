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

    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, message: errorData?.message || "Login failed" };
    }

    return { success: true };
  } catch (err) {
    console.error("Login Action Error:", err);
    return { success: false, message: "Something went wrong during login" };
  }
}