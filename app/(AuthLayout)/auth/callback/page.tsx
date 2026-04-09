"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const session = await authClient.getSession();
      console.log("Session response:", session);
      
      if (!session?.data?.user) {
        console.error("No session found after callback");
        router.push("/sign-in");
        return;
      }

      const res = await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: session.data.session.token }),
      });

      if (!res.ok) {
        router.push("/sign-in");
        return;
      }

      const role = session.data.user.role;
      if (role === "ADMIN") router.push("/admin-dashboard");
      else if (role === "PROVIDER") router.push("/provider-dashboard");
      else router.push("/dashboard");
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      <p className="mt-4 text-muted-foreground font-bold font-black uppercase tracking-widest italic animate-pulse">Authenticating...</p>
    </div>
  );
}