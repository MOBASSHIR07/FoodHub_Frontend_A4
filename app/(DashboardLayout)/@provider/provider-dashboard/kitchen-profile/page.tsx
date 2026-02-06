"use client";

import React, { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { updateProviderProfileAction } from "@/actions/provider.action";
import { imageUpload } from "@/helpers/imageUpload"; // 🚀 Using your helper
import { Store, MapPin, AlignLeft, Save, Loader2, Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";

const providerSchema = z.object({
  businessName: z.string().min(3, "Business name must be at least 3 characters").max(50),
  address: z.string().min(5, "Please provide a more specific address").optional().or(z.literal("")),
  description: z.string().max(500, "Description is too long").optional().or(z.literal("")),
});

const Kitchen_Profile = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      businessName: formData.get("businessName"),
      address: formData.get("address"),
      description: formData.get("description"),
    };

    // 1. Validate Text Fields
    const validation = providerSchema.safeParse(payload);
    if (!validation.success) {
      toast.error("Validation Error", { description: validation.error.issues[0].message });
      setLoading(false);
      return; 
    }

    const toastId = toast.loading("Syncing kitchen data...");

    try {
      let coverImageUrl = "";
      
      // 2. Upload Image if a new one is selected
      if (imageFile) {
        coverImageUrl = await imageUpload(imageFile);
      }

      // 3. Send to Server Action
      const res = await updateProviderProfileAction({
        ...validation.data,
        profileImage: coverImageUrl || undefined, 
      });

      if (res.success) {
        toast.success("Profile Live", { id: toastId, description: "Your kitchen registry is updated." });
        setImageFile(null);
      } else {
        toast.error("Sync Failed", { id: toastId, description: res.message });
      }
    } catch (error: unknown) {
     let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error("Process Failed", { 
        id: toastId, 
        description: errorMessage 
      });

      console.error("KITCHEN_PROFILE_UPDATE_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
          Kitchen <span className="text-orange-500 text-outline">Studio.</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">
          Identity & Visual Manifest
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 🖼️ Elite Image Upload Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
            <ImageIcon size={14} /> Brand Banner
          </label>
          
          {!previewUrl ? (
            <div className="relative h-64 w-full rounded-[2.5rem] bg-slate-50 border-4 border-dashed border-slate-100 flex items-center justify-center group hover:bg-slate-100 transition-all cursor-pointer">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                }}
              />
              <div className="text-center group-hover:scale-110 transition-transform">
                <Plus className="mx-auto text-slate-300 group-hover:text-orange-500 mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Banner</p>
              </div>
            </div>
          ) : (
            <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-xl group">
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
              <button 
                type="button"
                onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 shadow-xl"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <Store size={14} /> Kitchen Name
            </label>
            <input name="businessName" placeholder="e.g. Spice Route" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-orange-500 transition-all" />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Location
            </label>
            <input name="address" placeholder="Area, Dhaka" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-orange-500 transition-all" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <AlignLeft size={14} /> Bio
            </label>
            <textarea name="description" rows={3} placeholder="Tell your story..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-orange-500 transition-all resize-none" />
          </div>
        </div>

        <button disabled={loading} className="h-14 px-10 bg-slate-900 text-white rounded-xl font-black uppercase text-[11px] tracking-widest flex items-center gap-3 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Sync Registry</>}
        </button>
      </form>
    </div>
  );
};

export default Kitchen_Profile;