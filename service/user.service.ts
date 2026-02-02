import { RegisterInput } from "@/actions/auth.action";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL;

export const userService = {

  register: async (values: RegisterInput) => {
    const res = await fetch(`${AUTH_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "origin": env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.fullName,
        role: values.role,
        phoneNumber: values.phoneNumber || "",
      }),
    });

    const data = await res.json();
    return { data, ok: res.ok };
  },

  // Session Check (For your layouts/middleware)
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: { cookie: allCookies },
        cache: "no-store",
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  },
};