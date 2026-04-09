"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
    
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      
      console.log("URL params:", window.location.search);
      console.log("Token from URL:", token);

      if (!token) {
        console.error("No token in URL");
        router.push("/sign-in");
        return;
      }

      const res = await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        router.push("/sign-in");
        return;
      }

     
      const sessionRes = await fetch("/api/auth/get-session");
      const session = await sessionRes.json();
      
      const role = session?.user?.role;
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