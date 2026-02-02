import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: allCookies,
        },
        cache: "no-store",
      });

      if (!res.ok) return null;

      const session = await res.json();
      return session;
    } catch (error) {
      console.error("Auth Session Error:", error);
      return null;
    }
  },
};