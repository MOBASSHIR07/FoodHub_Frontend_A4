"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getMyOrdersAction, updateOrderStatusAction, trackOrderAction } from "@/actions/order.action";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Package, XCircle, Loader2, Search, Truck, ChefHat, CheckCircle, Clock, Sparkles, Navigation, ShoppingBasket, Ban } from "lucide-react";

// --- Types ---
interface Meal { id: string; name: string; image: string; price: number; }
interface OrderItem { id: string; quantity: number; price: number; meal: Meal; }
interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  deliveryAddress: string;
  status: "PENDING" | "CONFIRMED" | "COOKING" | "DELIVERED" | "CANCELLED";
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}
interface TrackingInfo { id: string; status: string; estimatedDelivery?: string; }

const STATUS_CONFIG = {
  PENDING: { color: "text-amber-500 bg-amber-50", icon: Clock, step: 0 },
  CONFIRMED: { color: "text-blue-500 bg-blue-50", icon: CheckCircle, step: 1 },
  COOKING: { color: "text-orange-500 bg-orange-50", icon: ChefHat, step: 2 },
  DELIVERED: { color: "text-emerald-500 bg-emerald-50", icon: Truck, step: 3 },
  CANCELLED: { color: "text-rose-500 bg-rose-50", icon: Ban, step: -1 },
} as const;

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [viewFilter, setViewFilter] = useState<"ACTIVE" | "HISTORY" | "CANCELLED">("ACTIVE");

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrdersAction();
      const ordersArray = Array.isArray(data) ? data : (data as { data?: Order[] })?.data || [];
      setOrders(ordersArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId: string) => {
    const tid = toast.loading("Aborting order...");
    setActionId(orderId);
    try {
      const res = await updateOrderStatusAction(orderId, "CANCELLED") as { success: boolean, message: string };
      if (res.success) {
        toast.success("Order Aborted", { id: tid });
        await fetchOrders();
      } else {
        toast.error(res.message, { id: tid });
      }
    } finally {
      setActionId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.items.some(item => item.meal.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (viewFilter === "ACTIVE") return matchesSearch && !["DELIVERED", "CANCELLED"].includes(o.status);
      if (viewFilter === "HISTORY") return matchesSearch && o.status === "DELIVERED";
      if (viewFilter === "CANCELLED") return matchesSearch && o.status === "CANCELLED";
      return matchesSearch;
    });
  }, [orders, searchQuery, viewFilter]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;

  return (
    <div className="p-6 md:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-4">
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            Order <br /> <span className="text-orange-500">Registry.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" /> Fulfillment History
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {(["ACTIVE", "HISTORY", "CANCELLED"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setViewFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewFilter === filter ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input 
              placeholder="Search IDs or Meals..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full sm:w-64 h-12 bg-white border border-slate-100 rounded-xl pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-orange-500 transition-all shadow-sm" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-100/50">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {/* ✅ FIXED: Changed </tr> to </TableRow> */}
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Reference</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Meal Manifest</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
              <TableHead className="p-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="p-20 text-center">
                  <Package className="mx-auto text-slate-100 mb-4" size={48} />
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No entries found for {viewFilter}</p>
                </TableCell>
              </TableRow>
            ) : filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/30 border-slate-50 transition-colors">
                <TableCell className="p-8">
                  <div className="space-y-1">
                    <p className="font-black text-slate-900 text-sm tracking-tighter uppercase">#{order.orderNumber}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                       ৳{order.totalAmount} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="p-8">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="group relative flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 hover:border-orange-200 transition-all">
                        <Avatar className="h-6 w-6 rounded-lg mr-3 shadow-sm">
                          <AvatarImage src={item.meal.image} className="object-cover" />
                          <AvatarFallback><Package size={10} /></AvatarFallback>
                        </Avatar>
                        <span className="text-[9px] font-black text-slate-700 uppercase">{item.quantity}x {item.meal.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="p-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border-2 ${STATUS_CONFIG[order.status].color}`}>
                    {React.createElement(STATUS_CONFIG[order.status].icon, { size: 10 })}
                    {order.status}
                  </div>
                </TableCell>
                <TableCell className="p-8 text-right">
                  <div className="flex justify-end gap-3">
                    <TrackButton order={order} />
                    {order.status === "PENDING" && (
                      <button 
                        disabled={actionId === order.id}
                        onClick={() => handleCancel(order.id)}
                        className="h-10 px-6 bg-white border-2 border-slate-50 text-rose-500 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                      >
                        {actionId === order.id ? <Loader2 className="animate-spin" size={12} /> : <XCircle size={12} />}
                        Abort
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function TrackButton({ order }: { order: Order }) {
  const [trackInfo, setTrackInfo] = useState<TrackingInfo | null>(null);
  const [tracking, setTracking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTrack = async () => {
    if (order.status === "CANCELLED") return;
    setTracking(true);
    try {
      const data = await trackOrderAction(order.id) as TrackingInfo;
      setTrackInfo(data);
    } catch (error) {
      toast.error("Telemetry link lost");
    } finally {
      setTracking(false);
    }
  };

  const currentStep = STATUS_CONFIG[order.status].step;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          onClick={() => { setIsOpen(true); handleTrack(); }} 
          className="h-10 px-6 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
        >
          <Navigation size={12} /> Trace
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden max-w-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Order Tracking - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        
        <div className={`p-8 text-white ${order.status === 'CANCELLED' ? 'bg-rose-500' : 'bg-slate-900'}`}>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Asset ID: {order.orderNumber}</p>
          <div className="flex justify-between items-end mt-4">
             <div><p className="text-[8px] uppercase font-black opacity-60">Status</p><p className="text-xl font-black uppercase italic leading-none">{order.status}</p></div>
             {order.status !== "CANCELLED" && (
                <div className="text-right"><p className="text-[8px] uppercase font-black opacity-60">ETA</p><p className="text-xl font-black uppercase italic leading-none">{trackInfo?.estimatedDelivery ? new Date(trackInfo.estimatedDelivery).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : "Processing"}</p></div>
             )}
          </div>
        </div>

        <div className="p-12 bg-white">
          {order.status === "CANCELLED" ? (
            <div className="text-center py-6 space-y-4">
               <div className="h-20 w-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                  <Ban size={40} className="text-rose-500" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Transaction Terminated</p>
            </div>
          ) : (
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 transition-all duration-1000" 
                style={{ width: `${Math.max(0, (currentStep / 3) * 100)}%` }} 
              />

              {[
                { icon: ShoppingBasket, label: "Placed", step: 0 },
                { icon: CheckCircle, label: "Confirmed", step: 1 },
                { icon: ChefHat, label: "Cooking", step: 2 },
                { icon: Truck, label: "Delivered", step: 3 }
              ].map((s) => (
                <div key={s.step} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-white transition-all duration-500 shadow-xl ${
                    currentStep >= s.step ? "bg-orange-500 text-white scale-110" : "bg-white text-slate-200"
                  }`}>
                    <s.icon size={16} />
                  </div>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${currentStep >= s.step ? "text-slate-900" : "text-slate-300"}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tracking && <div className="mt-10 flex justify-center"><Loader2 className="animate-spin text-orange-500" size={20} /></div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}