import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Server-side variables. 
   * These are private and never exposed to the browser.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    BACKEND_URL: z.url(), 
  },

  /*
   * Client-side variables.
   * MUST be prefixed with NEXT_PUBLIC_ for the browser to see them.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
  },

  /*
   i will use them to insteed of using .env 
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
});