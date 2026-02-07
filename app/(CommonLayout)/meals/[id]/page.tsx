import { mealService } from "@/service/meal.service";
import Image from "next/image";
import { ShoppingBag, ShieldCheck, MapPin, ChevronLeft, Clock, Flame, Utensils } from "lucide-react";
import Link from "next/link";
// 🚀 Import the client-side button
import AddToCartButton from "@/components/meals/AddToCartButton";

export default async function MealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: meal, error } = await mealService.getMealById(id);

  if (error || !meal) return <div className="py-20 text-center font-black uppercase tracking-widest text-slate-400">Meal asset not found in registry.</div>;

  return (
    <main className="min-h-screen bg-white pb-20 animate-in fade-in duration-700">
      <div className="container mx-auto px-6 py-10">
        <Link href="/meals" className="inline-flex items-center gap-2 text-gray-400 font-bold hover:text-orange-600 transition-all mb-10 group uppercase text-[10px] tracking-[0.2em]">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT: Premium Image Gallery Look */}
          <div className="lg:col-span-7">
            <div className="relative h-112.5 md:h-162.5 w-full rounded-[4rem] overflow-hidden group shadow-2xl border border-slate-50">
              <Image 
                src={meal.image || "/placeholder.jpg"} 
                alt={meal.name} 
                fill 
                unoptimized 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="bg-orange-600 text-white px-6 py-2 rounded-2xl font-black text-[10px] tracking-widest shadow-xl flex items-center gap-2 animate-bounce uppercase">
                  <Flame className="h-4 w-4" /> POPULAR
                </div>
                <div className="bg-white/90 backdrop-blur-md text-gray-900 px-6 py-2 rounded-2xl font-black text-[10px] tracking-widest shadow-xl flex items-center gap-2 uppercase">
                  <Clock className="h-4 w-4 text-orange-600" /> 20-30 MIN
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sophisticated Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="bg-orange-50 text-orange-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-100 leading-none">
                   {meal.category?.name || "Gourmet"}
                 </span>
                 <span className="text-gray-300">|</span>
                 <span className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4" /> 100% Fresh
                 </span>
              </div>

              <h1 className="text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter uppercase italic">
                {meal.name}
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed font-medium italic">
                {meal.description}
              </p>
            </div>

            {/* Pricing & Add to Cart Container */}
            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 space-y-8 shadow-sm">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Price</p>
                  <p className="text-5xl font-black text-gray-900 tracking-tighter italic">৳{meal.price}</p>
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                        🥗
                    </div>
                  ))}
                </div>
              </div>

              {/* 🛒 INTEGRATED ADD TO CART BUTTON */}
              <AddToCartButton 
                meal={meal} 
                className="w-full bg-gray-900 text-white py-6 rounded-[2.5rem] text-xl font-black flex items-center justify-center gap-4 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-200 transition-all active:scale-95 group uppercase tracking-widest shadow-xl"
              >
                <ShoppingBag className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Add to Cart
              </AddToCartButton>
            </div>

            {/* Provider/Kitchen Branding */}
            <div className="flex items-center justify-between p-6 rounded-[2.5rem] border border-dashed border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                  <Utensils className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Kitchen Partner</p>
                  <p className="text-lg font-black text-slate-900 uppercase tracking-tighter italic leading-none">{meal.provider?.businessName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Operational Zone</p>
                <p className="text-xs font-bold text-slate-600 flex items-center gap-1 justify-end uppercase">
                  <MapPin className="h-3 w-3 text-orange-500" /> Uttara, Dhaka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}