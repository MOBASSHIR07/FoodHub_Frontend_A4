import { cookies } from "next/headers";

/**
 * 🛠️ Standardized helper to retrieve the correct session token
 * Handles both development and production cookie names used by better-auth.
 * Falls back to 'auth_session' for backwards compatibility during transition.
 */
export async function getAuthCookieString(): Promise<string> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";
  
  const cookieName = isProduction
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";

  const token =
    cookieStore.get(cookieName)?.value ||
    cookieStore.get("auth_session")?.value;

  // If no token is found, return an empty string to avoid "undefined" in headers
  if (!token) return "";

  return `${cookieName}=${token}`;
}
