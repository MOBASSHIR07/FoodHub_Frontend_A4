"use client";

import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart, updateCartItemQuantity, CartItem } from "@/helpers/cart.helper";
import { createOrderAction } from "@/actions/order.action";
import { Trash2, MapPin, ShoppingBag, Plus, Minus, ArrowRight, Loader2, Sparkles, CreditCard } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MyCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
    const sync = () => setCart(getCart());
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return toast.error("Delivery address required");
    setLoading(true);
    const tid = toast.loading("Finalizing your culinary request...");

    const payload = {
      deliveryAddress: address,
      items: cart.map(item => ({ mealId: item.id, quantity: item.quantity }))
    };

    try {
      const res = await createOrderAction(payload);
      if (res.success) {
        toast.success("Order Synchronized!", { id: tid });
        clearCart();
        router.push("/dashboard/my-orders");
      } else {
        toast.error(res.message || "Sync failed", { id: tid });
      }
    } catch (error) {
      toast.error("Internal server error", { id: tid });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Fancy Minimal Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="h-2 w-8 bg-orange-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Checkout Terminal</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
          Order <span className="text-orange-500">Manifest.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product List (Compact Cards) */}
        <div className="lg:col-span-7 space-y-3">
          {cart.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-16 border border-slate-100 text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-slate-200" size={32} />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-widest text-[10px]">No active assets in cart</p>
            </div>
          ) : (
            cart.map((item) => (
              <Card key={item.id} className="rounded-3xl border-slate-50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                    <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-800 uppercase italic text-sm truncate">{item.name}</h3>
                    <p className="text-orange-500 font-black text-xs">৳{item.price}</p>
                  </div>

                  <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      className="h-7 w-7 rounded-lg bg-white flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                    >
                      <Minus size={12} strokeWidth={3} />
                    </button>
                    <span className="font-black text-[12px] px-3 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 rounded-lg bg-white flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                    >
                      <Plus size={12} strokeWidth={3} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Right: Fancy Sidebar Summary */}
        <div className="lg:col-span-5 sticky top-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Decorative Sparkle */}
            <Sparkles className="absolute -top-4 -right-4 text-white/5" size={120} />
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logistics Destination</span>
                </div>
                <Textarea
                  placeholder="Drop-off address..."
                  className="bg-white/5 border-none rounded-2xl text-xs font-bold placeholder:text-slate-600 focus-visible:ring-orange-500 min-h-[100px] resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white italic">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-orange-500" />
                    <span className="text-xs font-black uppercase italic">Total Due</span>
                  </div>
                  <span className="text-4xl font-black text-white italic tracking-tighter">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                disabled={loading || cart.length === 0}
                onClick={handlePlaceOrder}
                className="w-full h-14 bg-orange-500 hover:bg-white hover:text-orange-500 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-orange-500/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Commit Order <ArrowRight size={16} className="ml-2" /></>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}