"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home, Utensils } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics service or console for debugging
    console.error("Critical System Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100 text-center space-y-8 relative overflow-hidden">
        
        {/* Decorative Background Icon */}
        <Utensils className="absolute -top-10 -right-10 text-slate-50 h-40 w-40 -rotate-12" />

        {/* Error Icon */}
        <div className="relative mx-auto h-24 w-24 bg-rose-50 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
          <AlertCircle className="h-12 w-12 text-rose-500 animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            System <span className="text-rose-500">Anomaly.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Internal Fulfillment Link Broken
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-6">
            <code className="text-[11px] font-bold text-slate-500 break-all leading-relaxed">
              {error.message || "An unexpected error occurred in the registry."}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => reset()}
            className="flex-1 h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-100 gap-2"
          >
            <RefreshCcw size={14} /> Re-Initialize
          </Button>
          
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-14 border-2 border-slate-100 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] text-slate-600 hover:bg-slate-50 transition-all active:scale-95 gap-2"
            >
              <Home size={14} /> Return Base
            </Button>
          </Link>
        </div>

        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest pt-4">
          Error Digest: {error.digest || "N/A"}
        </p>
      </div>
    </div>
  );
}