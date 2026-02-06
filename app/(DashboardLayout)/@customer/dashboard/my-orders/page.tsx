"use client";

import React, { useEffect, useState } from "react";
import { getMyOrdersAction, updateOrderStatusAction, trackOrderAction } from "@/actions/order.action";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Package, XCircle, Loader2, Search, Truck, ChefHat, CheckCircle, Clock, Sparkles, Navigation, ShoppingBasket } from "lucide-react";

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
interface TrackingInfo {
  id: string; status: string; estimatedDelivery?: string;
}

const STATUS_CONFIG = {
  PENDING: { color: "text-amber-500 bg-amber-50", icon: Clock, step: 0 },
  CONFIRMED: { color: "text-blue-500 bg-blue-50", icon: CheckCircle, step: 1 },
  COOKING: { color: "text-orange-500 bg-orange-50", icon: ChefHat, step: 2 },
  DELIVERED: { color: "text-emerald-500 bg-emerald-50", icon: Truck, step: 3 },
  CANCELLED: { color: "text-rose-500 bg-rose-50", icon: XCircle, step: -1 },
} as const;

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

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
        toast.success("Order Cancelled", { id: tid });
        await fetchOrders();
      } else {
        toast.error(res.message, { id: tid });
      }
    } finally {
      setActionId(null);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.some(item => item.meal.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;

  return (
    <div className="p-6 md:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            My <span className="text-orange-500">Orders.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" /> Fulfillment History
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input placeholder="Search Registry..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 bg-white border border-slate-100 rounded-xl pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 transition-all shadow-sm" />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Reference</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Items</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
              <TableHead className="p-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/30 border-slate-50 transition-colors">
                <TableCell className="p-8">
                  <p className="font-black text-slate-900 text-sm tracking-tighter uppercase">#{order.orderNumber}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase italic">৳{order.totalAmount}</p>
                </TableCell>
                <TableCell className="p-8">
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8 rounded-lg border-2 border-white shadow-sm">
                            <AvatarImage src={item.meal.image} className="object-cover" />
                            <AvatarFallback><Package size={14} /></AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-white text-[8px] font-black flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-xs uppercase truncate">{item.meal.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold">৳{item.price} × {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="flex items-center gap-2 pl-11">
                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <span className="text-[9px] font-black text-slate-600">+{order.items.length - 2}</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">More items</p>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${STATUS_CONFIG[order.status].color}`}>
                    {React.createElement(STATUS_CONFIG[order.status].icon, { size: 12 })}
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
                        className="h-10 px-5 bg-white border border-slate-100 text-rose-500 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                      >
                        {actionId === order.id ? <Loader2 className="animate-spin" size={14} /> : <XCircle size={14} />}
                        Cancel
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

// --- Sub-Component: Visual Tracking Modal ---
function TrackButton({ order }: { order: Order }) {
  const [trackInfo, setTrackInfo] = useState<TrackingInfo | null>(null);
  const [tracking, setTracking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTrack = async () => {
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
        <button onClick={() => { setIsOpen(true); handleTrack(); }} className="h-10 px-5 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
          <Navigation size={14} /> Trace
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden max-w-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Order Tracking - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="bg-[#6dbfb8] p-6 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Order Tracking - {order.orderNumber}</p>
          <div className="flex justify-between items-end mt-4">
             <div><p className="text-[8px] uppercase font-bold opacity-70">Status</p><p className="text-sm font-black uppercase">{order.status}</p></div>
             <div className="text-right"><p className="text-[8px] uppercase font-bold opacity-70">Expected Arrival</p><p className="text-sm font-black uppercase">{trackInfo?.estimatedDelivery ? new Date(trackInfo.estimatedDelivery).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : "Processing"}</p></div>
          </div>
        </div>

        <div className="p-10 bg-white">
          <div className="relative flex items-center justify-between w-full">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#6dbfb8] -translate-y-1/2 transition-all duration-1000" 
              style={{ width: `${Math.max(0, (currentStep / 3) * 100)}%` }} 
            />

            {/* Steps */}
            {[
              { icon: ShoppingBasket, label: "Placed", step: 0 },
              { icon: CheckCircle, label: "Confirmed", step: 1 },
              { icon: ChefHat, label: "Cooking", step: 2 },
              { icon: Truck, label: "Delivered", step: 3 }
            ].map((s) => (
              <div key={s.step} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 shadow-md ${
                  currentStep >= s.step ? "bg-[#6dbfb8] text-white" : "bg-white text-slate-200"
                }`}>
                  <s.icon size={20} />
                </div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= s.step ? "text-slate-900" : "text-slate-300"}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {tracking && <div className="mt-10 flex justify-center"><Loader2 className="animate-spin text-[#6dbfb8]" size={20} /></div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}