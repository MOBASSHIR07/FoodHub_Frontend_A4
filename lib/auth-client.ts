// import { createAuthClient } from "better-auth/react"
// import { env } from "@/env"

// export const authClient = createAuthClient({
//     baseURL: "https://foodhub-backend-a4-2.onrender.com",
//      fetchOptions: {
//         credentials: "include",
//     },

// })

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000",
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        inferAdditionalFields({
            user: {
                role: { type: "string" },
                phoneNumber: { type: "string" },
                isActive: { type: "boolean" },
                status: { type: "string" },
            }
        })
    ]
});

export const { signIn, signOut, useSession } = authClient;