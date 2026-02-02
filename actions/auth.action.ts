"use server";

import { userService } from "@/service/user.service";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
  phoneNumber?: string;
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