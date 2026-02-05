"use client";

import React, { useState } from "react";

import { Search, ChevronRight, Inbox, ArrowUpRight } from "lucide-react";
import { Order } from "@/app/types/provider";

export default function OrderHistoryTable({ orders = [] }: { orders: Order[] }) {
  const [query, setQuery] = useState("");

  const filtered = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(query.toLowerCase())
  );

  const formatDate = (date: string) => 
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(date));

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* 🔍 Elite Search Bar */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={16} />
        <input 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Quick search registry..." 
          className="w-full bg-slate-50 border border-slate-100 h-11 pl-11 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white focus:border-orange-500/30 transition-all"
        />
      </div>

      {/* 📊 Desktop Registry */}
      <div className="hidden lg:block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Reference</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4 text-center">Manifest</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((order) => (
              <tr key={order.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-orange-600 transition-colors">{order.orderNumber}</span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase">{formatDate(order.createdAt)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm leading-none">{order.customer.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[150px]">{order.customer.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-1">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="h-6 px-2 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase flex items-center">
                        {item.quantity}× {item.meal.name.split(' ')[0]}
                      </div>
                    ))}
                    {order.items.length > 2 && <span className="text-[9px] font-black text-slate-300">+{order.items.length - 2}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 font-black text-slate-900 text-sm italic">
                    ৳{order.totalAmount.toLocaleString()}
                    <ArrowUpRight size={14} className="text-slate-200 group-hover:text-orange-500 transition-colors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Registry (Cards) */}
      <div className="lg:hidden space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{order.orderNumber}</span>
                <h3 className="font-bold text-slate-800 text-base">{order.customer.name}</h3>
              </div>
              <p className="font-black text-slate-900 text-sm">৳{order.totalAmount}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${
                order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
              }`}>{order.status}</span>
              <button className="text-slate-400 hover:text-orange-500 flex items-center gap-1 text-[10px] font-black uppercase">
                View Log <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-slate-300">
          <Inbox size={40} strokeWidth={1} className="mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">No matching records</p>
        </div>
      )}
    </div>
  );
}