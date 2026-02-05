"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCategoryAction } from "@/actions/category.action";
import { Category } from "@/app/types/provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/helpers/imageUpload"; 

interface Props {
  category: Category;
  onClose: () => void;
}

export default function EditCategoryForm({ category, onClose }: Props) {
  const [name, setName] = useState(category.name);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(category.image || null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");
    
    setIsUpdating(true);
    const toastId = toast.loading("Processing changes...");

    try {
      let finalImageUrl = category.image || "";
      if (imageFile) {
        finalImageUrl = await imageUpload(imageFile);
      }

      const res = await updateCategoryAction(category.id, { 
        name, 
        image: finalImageUrl 
      });

      if (res.success) {
        toast.success("Registry updated!", { id: toastId });
        router.refresh();
        onClose();
      } else {
        toast.error("Failed to update database", { id: toastId });
      }
    } catch (error) {
      toast.error("System error", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-16 rounded-[1.25rem] border-slate-100 bg-slate-50 focus-visible:ring-orange-500 font-bold text-xl px-6"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Graphic Asset</Label>
        {!previewUrl ? (
          <div className="relative h-44 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50 cursor-pointer overflow-hidden">
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
              }}
            />
            <ImageIcon className="text-slate-200 mb-2" size={32} />
            <p className="text-[10px] font-black text-slate-400 uppercase">Upload Asset</p>
          </div>
        ) : (
          <div className="relative h-44 rounded-[2rem] overflow-hidden group shadow-xl">
            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            <button type="button" onClick={() => { setPreviewUrl(null); setImageFile(null); }}
              className="absolute top-4 right-4 bg-white p-3 rounded-2xl text-rose-500 opacity-0 group-hover:opacity-100 transition-all shadow-xl"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>

      <Button type="submit" disabled={isUpdating} className="w-full h-16 rounded-[1.5rem] bg-slate-900 hover:bg-orange-600 text-white font-black uppercase tracking-widest transition-all">
        {isUpdating ? <Loader2 className="animate-spin" /> : "Commit Changes"}
      </Button>
    </form>
  );
}