"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { imageUpload } from "@/helpers/imageUpload";
import { createCategoryAction } from "@/actions/category.action";
import { ImageIcon, Loader2, Sparkles, X, Plus, Hash } from "lucide-react";
import Image from "next/image";

export default function PostCategories() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categorySchema = z.object({
    name: z.string().min(1, "Name required").min(3, "Too short!"),
  });

  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: async ({ value }) => {
      if (!imageFile) return toast.error("Please upload a category image!");
      const toastId = toast.loading("Processing...");

      try {
        const imageUrl = await imageUpload(imageFile);
        const result = await createCategoryAction({ name: value.name, image: imageUrl });

        if (result.success) {
          toast.success("Success! Category is live.", { id: toastId });
          form.reset();
          setImageFile(null);
          setPreviewUrl(null);
        } else {
          toast.error(result.message, { id: toastId });
        }
      } catch (error) {
        toast.error("Process failed.", { id: toastId });
      }
    },
  });

  return (
    <div className="p-6 md:p-20 min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Info */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
            <Sparkles size={12} />
            Administrator Panel
          </div>
          <h1 className="text-6xl font-black text-foreground leading-[0.9] tracking-tighter">
            Add New <br /> <span className="text-orange-500">Category.</span>
          </h1>
          <p className="text-muted-foreground font-bold text-lg max-w-sm">
            Define the visual identity and naming for your new food classifications.
          </p>
          
          <div className="pt-10 flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-foreground text-background flex items-center justify-center font-bold">01</div>
             <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">General Configuration</p>
          </div>
        </div>

        {/* Right Side: The Form (Cardless Approach) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-12"
        >
          {/* Name Input */}
          <form.Field name="name" validators={{ onChange: categorySchema.shape.name }}>
            {(field) => (
              <div className="group space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground group-focus-within:text-orange-500 transition-colors">
                  <Hash size={18} />
                  <Label className="text-sm font-black uppercase tracking-widest">Cuisine Name</Label>
                </div>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Continental"
                  className="h-20 text-3xl font-black bg-transparent border-0 border-b-4 border-border rounded-none px-0 focus-visible:ring-0 focus:border-orange-500 transition-all placeholder:text-muted"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs font-bold text-red-500 uppercase tracking-tighter">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ImageIcon size={18} />
              <Label className="text-sm font-black uppercase tracking-widest">Visual Asset</Label>
            </div>
            
            {!previewUrl ? (
              <div className="relative h-80 w-full rounded-[3rem] bg-secondary border-4 border-dashed border-border flex items-center justify-center group/upload hover:bg-secondary/80 transition-all cursor-pointer overflow-hidden">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                  }}
                />
                <div className="text-center space-y-2 group-hover/upload:scale-110 transition-transform duration-500">
                   <div className="w-16 h-16 bg-background rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-4">
                      <Plus className="text-muted-foreground group-hover/upload:text-orange-500 transition-colors" />
                   </div>
                   <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Select Image File</p>
                </div>
              </div>
            ) : (
              <div className="relative h-80 w-full rounded-[3.5rem] overflow-hidden shadow-2xl group/preview">
                 <Image src={previewUrl} alt="Preview" fill className="object-cover transition-transform duration-1000 group-hover/preview:scale-110" />
                 <button 
                  type="button"
                  onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                  className="absolute top-6 right-6 h-14 w-14 bg-background/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-foreground shadow-2xl hover:bg-red-500 hover:text-white transition-all z-20 border border-border"
                 >
                   <X size={24} strokeWidth={3} />
                 </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                disabled={!canSubmit || isSubmitting}
                className="w-full h-24 rounded-[2.5rem] bg-foreground text-background hover:bg-orange-600 hover:text-white text-xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 disabled:opacity-20"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Commit Category"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}