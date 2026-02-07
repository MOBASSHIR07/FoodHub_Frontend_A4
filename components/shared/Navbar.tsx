"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { UtensilsCrossed, Menu, ShoppingBag, Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCart } from "@/helpers/cart.helper";
import { authClient } from "@/lib/auth-client";
import { getServerSessionAction, logoutUserAction } from "@/actions/auth.action";


interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "CUSTOMER" | "PROVIDER";
    phoneNumber?: string;
  };
  session: {
    id: string;
    expiresAt: string | Date;
    token: string;
  };
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meal", href: "/meals" },
  { name: "Providers", href: "/providers" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

 
  const [session, setSession] = useState<UserSession | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);


  const refreshSession = useCallback(async () => {
    const serverSession = await getServerSessionAction();
    setSession(serverSession as UserSession | null);
  }, []);

  useEffect(() => {
    const initNavbar = async () => {
      // 1. Initial truth from Server Action
      await refreshSession();

      // 2. Initial Cart Sync
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

      // 3. Prevent Hydration Mismatch
      setMounted(true);
    };

    initNavbar();

    // 4. Listen for tab focus/back-forward to clear "ghost" sessions
    window.addEventListener("focus", refreshSession);

    // 5. Cart Listener
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener("cart-updated", updateCartCount);
    
    return () => {
      window.removeEventListener("focus", refreshSession);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, [refreshSession]);

  const handleCartClick = () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard/my-cart");
    }
  };

  const handleSignOut = async () => {
  
    await authClient.signOut();
 
    await logoutUserAction();
    
    setSession(null);
    
   
    window.location.href = "/";
  };

 
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md h-20">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-orange-600 rounded-xl" />
            <span className="text-xl font-black text-gray-900">Food<span className="text-orange-600">Hub</span></span>
          </div>
          <div className="h-9 w-24 bg-slate-50 animate-pulse rounded-full" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-200">
            <UtensilsCrossed className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            Food<span className="text-orange-600">Hub</span>
          </span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all hover:text-orange-600",
                pathname === link.href ? "text-orange-600 underline underline-offset-8 decoration-2" : "text-gray-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-gray-600">
            <Search className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full text-gray-600"
            onClick={handleCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Button>

          <div className="hidden md:block h-8 w-[1px] bg-gray-200 mx-1" />

          {session ? (
            <div className="flex items-center gap-3">
               <span className="hidden xl:block text-[10px] font-black uppercase text-slate-400 tracking-widest">
                 Hi, {session.user.name.split(" ")[0]}
               </span>
               <Button 
                onClick={handleSignOut}
                variant="outline"
                className="hidden md:flex rounded-full px-6 font-bold border-orange-600 text-orange-600 hover:bg-orange-50 transition-all active:scale-95"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="hidden md:flex rounded-full bg-orange-600 px-6 font-bold text-white hover:bg-orange-700 transition-all active:scale-95 shadow-md shadow-orange-100">
                Sign In
              </Button>
            </Link>
          )}

          {/* --- MOBILE MENU --- */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 text-2xl font-black">
                    <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                    Food<span className="text-orange-600">Hub</span>
                  </SheetTitle>
                  <SheetDescription>Freshness on demand.</SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn("text-lg font-bold transition-colors", pathname === link.href ? "text-orange-600" : "text-gray-800 hover:text-orange-600")}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="my-2 border-orange-50" />
                  {session ? (
                    <Button onClick={handleSignOut} variant="destructive" className="w-full rounded-xl h-12 text-lg">Logout</Button>
                  ) : (
                    <Link href="/sign-in"><Button className="w-full bg-orange-600 rounded-xl h-12 text-lg text-white">Sign In</Button></Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}