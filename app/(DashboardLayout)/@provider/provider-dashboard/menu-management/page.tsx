"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getAllCategoriesAction } from "@/actions/category.action";
import { createMealAction } from "@/actions/meal.action";
import { imageUpload } from "@/helpers/imageUpload";
import { UtensilsCrossed, Plus, X, Loader2, Sparkles, Hash, Globe, Leaf } from "lucide-react";
import Image from "next/image";


const mealSchema = z.object({
  name: z.string().min(3, "Title too short").max(40),
  description: z.string().min(10, "Description needs more detail"),
  price: z.number().positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Select a category"),
  cuisine: z.string().min(1, "Cuisine region required (e.g. Bengali)"),
  dietaryPreferences: z.string().min(1, "Dietary tag required (e.g. Halal)"),
});

export default function Menu_Management() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    getAllCategoriesAction().then((res) => { if (res) setCategories(res); });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const tid = toast.loading("Syncing culinary asset to registry...");

    try {
      if (!imageFile) throw new Error("Visual asset required for menu display");

      const formData = new FormData(e.currentTarget);
      const rawData = {
        name: formData.get("name")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        price: parseFloat(formData.get("price")?.toString() || "0"),
        categoryId: formData.get("categoryId")?.toString() || "",
        cuisine: formData.get("cuisine")?.toString() || "",
        dietaryPreferences: formData.get("dietaryPreferences")?.toString() || "",
      };

      const validation = mealSchema.safeParse(rawData);
      if (!validation.success) throw new Error(validation.error.issues[0].message);

      // 🚀 Image Upload Logic
      const imageUrl = await imageUpload(imageFile);
      
      const res = await createMealAction({ ...validation.data, image: imageUrl });

      if (res.success) {
        toast.success("Success", { id: tid, description: `${rawData.name} is now live.` });
        (e.target as HTMLFormElement).reset();
        setPreview(null);
        setImageFile(null);
      } else {
        toast.error("Error", { id: tid, description: res.message });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registry Sync Failed";
      toast.error("Process Failed", { id: tid, description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-12 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left: Configuration Panel */}
        <div className="flex-1 space-y-10">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Meal <span className="text-orange-500">Creation.</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
              <Sparkles size={14} className="text-orange-500" /> New Inventory Entry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2 group-focus-within:text-orange-500 transition-colors">
                   <Hash size={12} /> Meal Title
                </label>
                <input name="name" placeholder="Kacchi Biryani Full" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2 group-focus-within:text-orange-500 transition-colors">
                   ৳ Valuation
                </label>
                <input name="price" type="number" step="0.01" placeholder="450.00" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-orange-500">Menu Category</label>
                <select name="categoryId" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select Cuisine Type</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-orange-500 flex items-center gap-2">
                   <Globe size={12} /> Cuisine Region
                </label>
                <input name="cuisine" placeholder="e.g. Bengali, Chinese" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-orange-500 flex items-center gap-2">
                 <Leaf size={12} /> Dietary Manifest
              </label>
              <input name="dietaryPreferences" placeholder="e.g. Halal, Vegan, High-Protein" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all" />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-orange-500 transition-colors">Description</label>
              <textarea name="description" rows={3} placeholder="Ingredients and flavor profile..." className="w-full p-6 bg-slate-50 border-slate-100 border rounded-3xl font-bold text-sm focus:bg-white focus:border-orange-500 outline-none transition-all resize-none" />
            </div>

            <button disabled={loading} className="w-full h-16 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-20 shadow-2xl shadow-slate-200">
              {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18} /> Commit to Menu</> }
            </button>
          </form>
        </div>

        {/* Right: Asset & Live Preview (RESTORED) */}
        <div className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-12">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
            <UtensilsCrossed size={14} /> Visual Presentation
          </label>
          
          {!preview ? (
            <div className="relative h-[450px] w-full bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center group cursor-pointer overflow-hidden transition-colors hover:bg-slate-100">
              <input type="file" className="absolute inset-0 opacity-0 z-20 cursor-pointer" onChange={(e) => {
                const f = e.target.files?.[0];
                if(f) { setImageFile(f); setPreview(URL.createObjectURL(f)); }
              }} />
              <div className="text-center group-hover:scale-110 transition-transform duration-500">
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-50">
                   <Plus className="text-slate-300 group-hover:text-orange-500" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inject Meal Image</p>
              </div>
            </div>
          ) : (
            <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image src={preview} alt="Meal" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <button type="button" onClick={() => { setPreview(null); setImageFile(null); }} className="absolute top-6 right-6 h-12 w-12 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-red-500 shadow-2xl z-30 hover:bg-red-500 hover:text-white transition-all">
                <X size={20} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                 <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Live Preview</p>
                 <h2 className="text-white font-black text-2xl uppercase italic tracking-tighter">Culinary Draft</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}