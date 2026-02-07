"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100 text-center space-y-8">
        
        {/* Animated Icon Container */}
        <div className="relative mx-auto h-24 w-24 bg-orange-50 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl">
          <SearchX className="h-12 w-12 text-orange-500 animate-bounce" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Route <span className="text-orange-500">Not Found.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            This manifest does not exist in our registry
          </p>
          <p className="text-[12px] font-bold text-slate-500 leading-relaxed max-w-xs mx-auto">
            The link you followed might be broken, or the page may have been relocated.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1 h-14 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] text-slate-600 hover:bg-slate-50 transition-all active:scale-95 gap-2"
          >
            <ArrowLeft size={14} /> Go Back
          </Button>
          
          <Link href="/" className="flex-1">
            <Button
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-100 gap-2"
            >
              <Home size={14} /> Return Base
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}