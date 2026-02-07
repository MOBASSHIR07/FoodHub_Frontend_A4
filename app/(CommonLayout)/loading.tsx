import { Loader2, UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-[70vh] w-full items-center justify-center space-y-6 animate-in fade-in duration-500">
      {/* Brand Icon with Pulse */}
      <div className="relative">
        <div className="h-20 w-20 bg-orange-100 rounded-[2rem] flex items-center justify-center animate-pulse">
          <UtensilsCrossed className="text-orange-600 h-10 w-10" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
          <Loader2 className="animate-spin text-orange-600 h-6 w-6" />
        </div>
      </div>

      {/* Typography matches your Cart Manifest style */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
          Preparing <span className="text-orange-600">Freshness.</span>
        </h2>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
          Syncing with FoodHub Servers...
        </p>
      </div>
    </div>
  );
}