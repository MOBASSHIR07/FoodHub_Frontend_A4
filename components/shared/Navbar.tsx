"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { UtensilsCrossed, Menu, ShoppingBag, Search } from "lucide-react";
import { cn } from "@/lib/utils"; 

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meal", href: "/meals" },
    { name: "Providers", href: "/providers" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname(); 

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
                    {navLinks.map((link) => {
                        // 4. Check if the link is active
                        const isActive = pathname === link.href;
                        
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-bold transition-all hover:text-orange-600",
                                    isActive 
                                        ? "text-orange-600 underline underline-offset-8 decoration-2" 
                                        : "text-gray-600"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* --- ACTION ICONS & BUTTONS --- */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-gray-600">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className="relative rounded-full text-gray-600">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                            0
                        </span>
                    </Button>

                    <div className="hidden md:block h-8 w-[1px] bg-gray-200 mx-1" />

                    <Link href="/login">
                        <Button className="hidden md:flex rounded-full bg-orange-600 px-6 font-bold hover:bg-orange-700 transition-all active:scale-95 shadow-md shadow-orange-100">
                            Sign In
                        </Button>
                    </Link>

                    {/* --- RESPONSIVE MOBILE MENU --- */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px]">
                                <SheetHeader className="text-left">
                                    <SheetTitle className="flex items-center gap-2 text-2xl font-black">
                                        <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                                        Food<span className="text-orange-600">Hub</span>
                                    </SheetTitle>
                                    <SheetDescription>
                                        Delicious meals delivered to your door.
                                    </SheetDescription>
                                </SheetHeader>

                                <nav className="flex flex-col gap-6 mt-10">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={cn(
                                                    "text-lg font-bold transition-colors",
                                                    isActive ? "text-orange-600" : "text-gray-800 hover:text-orange-600"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <hr className="my-2 border-orange-50" />

                                    <Link href="/login">
                                        <Button className="w-full bg-orange-600 rounded-xl h-12 text-lg font-bold shadow-lg shadow-orange-100">
                                            Sign In
                                        </Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}