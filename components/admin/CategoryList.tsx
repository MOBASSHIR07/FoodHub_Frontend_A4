"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Edit3, Trash2, LayoutGrid, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { Category } from "@/app/types/provider";
import { deleteCategoryAction } from "@/actions/category.action";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import EditCategoryForm from "./EditCategoryForm";

export default function CategoryList({ initialCategories = [] }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  /* ---------------- DELETE HANDLER WITH ERROR MSG ---------------- */
  const handleDelete = (id: string, name: string) => {
    toast(`Delete Category: ${name}?`, {
      description: "Are you sure? This will remove the category permanently.",
      className: "rounded-[2rem] p-6 shadow-2xl border-2 border-slate-50",
      action: {
        label: "Confirm Delete",
        onClick: async () => {
          const tid = toast.loading(`Deleting ${name}...`);
          
          try {
            const res = await deleteCategoryAction(id);
            
            if (res.success) {
              toast.success("Category removed successfully!", { id: tid });
              setCategories((prev) => prev.filter((cat) => cat.id !== id));
            } else {
              // ✅ ব্যাকএন্ড থেকে আসা স্পেসিফিক মেসেজ (যেমন: Meals assigned) এখানে দেখাবে
              toast.error(res.message || "Unauthorized or Delete failed!", { 
                id: tid,
                duration: 5000, // মেসেজটি পড়ার জন্য একটু বেশি সময় দিন
                icon: <Info className="text-rose-500" size={18} />
              });
            }
          } catch (error) {
            toast.error("Network error! Could not connect to server.", { id: tid });
          }
        },
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="hidden md:block bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr className="text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="p-8 w-32">Visual</th>
              <th className="p-8">Cuisine Name</th>
              <th className="p-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map((cat) => (
              <tr key={cat.id} className="group hover:bg-orange-50/40 transition-all duration-300">
                <td className="p-8">
                  <div className="relative h-16 w-16 rounded-[1.2rem] overflow-hidden shadow-lg border-2 border-white group-hover:rotate-3 transition-transform">
                    <Image 
                      src={cat.image || "/placeholder.jpg"} 
                      alt={cat.name} 
                      fill 
                      className="object-cover"
                      unoptimized={true} 
                    />
                  </div>
                </td>
                <td className="p-8">
                  <p className="font-black text-slate-800 text-xl tracking-tighter uppercase italic group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </p>
                  <span className="text-[9px] font-bold text-slate-300 tracking-widest uppercase">
                    Ref ID: {cat.id.slice(-8)}
                  </span>
                </td>
                <td className="p-8">
                  <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Dialog open={openId === cat.id} onOpenChange={(io) => setOpenId(io ? cat.id : null)}>
                      <DialogTrigger asChild>
                        <button className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                          <Edit3 size={18} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[3rem] p-10 border-none shadow-2xl max-w-lg bg-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic text-slate-900">Modify Category</DialogTitle>
                        </DialogHeader>
                        <EditCategoryForm category={cat} onClose={() => setOpenId(null)} />
                      </DialogContent>
                    </Dialog>

                    <button 
                      onClick={() => handleDelete(cat.id, cat.name)} 
                      className="h-12 w-12 flex items-center justify-center bg-rose-50 rounded-2xl text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between shadow-xl shadow-slate-100/30">
            <div className="flex items-center gap-5">
               <div className="relative h-14 w-14 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                 <Image src={cat.image || ""} alt={cat.name} fill className="object-cover" unoptimized />
               </div>
               <h3 className="font-black text-slate-800 uppercase text-xs tracking-tight">{cat.name}</h3>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setOpenId(cat.id)} className="p-3 bg-slate-50 rounded-xl text-slate-400"><Edit3 size={16}/></button>
               <button onClick={() => handleDelete(cat.id, cat.name)} className="p-3 bg-rose-50 rounded-xl text-rose-400"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
           <AlertCircle className="text-slate-200 w-16 h-16 mb-4" />
           <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No entries in the registry</p>
        </div>
      )}
    </div>
  );
}