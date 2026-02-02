import { createAuthClient } from "better-auth/react"
import { env } from "@/env"

export const authClient = createAuthClient({
    // This MUST point to your Express/Node.js Backend on Render
    baseURL: "https://foodhub-backend-a4-2.onrender.com", 
})