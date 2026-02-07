"use client";

import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem } from "@/helpers/cart.helper";
import { ShoppingBag, X, ArrowRight, Loader2, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartSidebarProps {
  providerId?: string; 
}

export default function CartSidebar({ providerId }: CartSidebarProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 1. Move to next tick to avoid "cascading render" error
    const timer = setTimeout(() => {
      setIsClient(true);
      syncCart();
    }, 0);

    const syncCart = () => {
      const fullCart = getCart();
      // 2. Filter items strictly by the current provider
      if (providerId) {
        setCart(fullCart.filter((item) => item.providerId === providerId));
      } else {
        setCart(fullCart);
      }
    };

    window.addEventListener("cart-updated", syncCart);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cart-updated", syncCart);
    };
  }, [providerId]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isClient) {
    return (
      <div className="sticky top-24 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-2xl min-h-[500px] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-orange-500 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Syncing Cart...</p>
      </div>
    );
  }

  return (
    <div className="sticky top-24 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-2xl shadow-slate-100 min-h-[550px] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
          Your <span className="text-orange-600">Order.</span>
        </h3>
        <ShoppingBag className="text-slate-200" size={28} />
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center">
               <Utensils className="h-8 w-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                No items from <br/> this kitchen.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
                <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black text-slate-900 uppercase truncate">{item.name}</p>
                  <p className="text-[10px] font-bold text-orange-600 italic">
                    {item.quantity} x ৳{item.price}
                  </p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-slate-50 pt-8 mt-6 space-y-6">
        <div className="flex justify-between font-black text-slate-400 uppercase text-xs tracking-widest">
          <span>Subtotal</span>
          <span className="text-slate-900 italic tracking-tighter text-2xl leading-none">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>
        
        {cart.length > 0 ? (
          <Link href="/dashboard/my-cart" className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95 shadow-orange-100">
            Execute Checkout <ArrowRight size={16} />
          </Link>
        ) : (
          <button disabled className="w-full bg-slate-100 text-slate-300 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] cursor-not-allowed opacity-50">
            Execute Checkout
          </button>
        )}
      </div>
    </div>
  );
}