import { createAuthClient } from "better-auth/react"
import { env } from "@/env"

export const authClient = createAuthClient({
    baseURL: "https://foodhub-backend-a4-2.onrender.com",
   
})