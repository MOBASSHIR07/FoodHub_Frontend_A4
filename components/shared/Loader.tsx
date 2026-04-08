import React from "react";
import { Loader2, UtensilsCrossed } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col h-[60vh] w-full items-center justify-center space-y-6 animate-in fade-in duration-500">
      <div className="relative">
        {/* Pulsing Background Square */}
        <div className="h-20 w-20 bg-muted rounded-[2rem] flex items-center justify-center animate-pulse border border-border">
          <UtensilsCrossed className="text-orange-600 h-10 w-10" />
        </div>
        
        {/* Rotating Spinner Overlay */}
        <div className="absolute -bottom-1 -right-1 bg-background p-1.5 rounded-full shadow-sm border border-border">
          <Loader2 className="animate-spin text-orange-600 h-5 w-5" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase italic">
          Food<span className="text-orange-600">Hub</span>
        </h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
          Syncing Manifest...
        </p>
      </div>
    </div>
  );
}