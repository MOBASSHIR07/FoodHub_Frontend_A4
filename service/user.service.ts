import { RegisterInput } from "@/actions/auth.action";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL;
export interface LoginInput {
  email: string;
  password: string;
}

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

  login: async (values: LoginInput) => {
    const res = await fetch(`${env.BACKEND_URL}/api/auth/sign-in/email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "origin": env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000"
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (res.ok) {
      const setCookieHeader = res.headers.get("set-cookie");

      if (setCookieHeader) {
        const cookieStore = await cookies();


        const isProduction = process.env.NODE_ENV === "production";
        const cookieName = isProduction
          ? "__Secure-better-auth.session_token"
          : "better-auth.session_token";

        const regex = new RegExp(`${cookieName.replace(/\./g, '\\.')}=([^;]+)`);
        const tokenMatch = setCookieHeader.match(regex);
        const token = tokenMatch ? tokenMatch[1] : null;

        if (token) {
          // 🛡️ Standardizing on official better-auth cookie name
          // 🛠️ decodeURIComponent prevents double-encoding issue (e.g. + becoming %252B)
          cookieStore.set(cookieName, decodeURIComponent(token), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 604800,
          });
        }
      }
    }

    return res;
  },

  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const isProduction = process.env.NODE_ENV === "production";
      const officialCookieName = isProduction
        ? "__Secure-better-auth.session_token"
        : "better-auth.session_token";

      let allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

      // 🔗 Alias fallback: if native cookie missing but auth_session exists, map it in the header
      const authSession = cookieStore.get("auth_session")?.value;
      if (authSession && !allCookies.includes(officialCookieName)) {
        allCookies += `; ${officialCookieName}=${authSession}`;
      }

      if (!allCookies) return null;

      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        method: "GET",
        headers: { 
          "Cookie": allCookies,
        },
        cache: "no-store",
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  },





  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const myAuthCookie = cookieStore.get("auth_session")?.value;

      if (!myAuthCookie) {
        console.error("No auth cookie found");
        return { data: [], ok: false };
      }

      const cookieString = `__Secure-better-auth.session_token=${myAuthCookie}`;

      const res = await fetch(`${AUTH_URL}/admin/users`, {
        method: "GET",
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(`Failed to fetch users: ${res.status}`);
        return { data: [], ok: false };
      }

      const data = await res.json();
      return { data, ok: true };
    } catch (error) {
      console.error("Get all users error:", error);
      return { data: [], ok: false };
    }
  },










};