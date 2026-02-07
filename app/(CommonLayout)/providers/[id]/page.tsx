import { providerService } from "@/service/provider.service";
import Image from "next/image";
import { MapPin, Utensils, Leaf, Flame, ShoppingBag, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 
import { Meal } from "@/app/types/provider";
import AddToCartButton from "@/components/meals/AddToCartButton";
import CartSidebar from "@/components/meals/CartSidebar";

export default async function ProviderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: provider, error } = await providerService.getProviderById(id);

  if (error || !provider) return <div className="py-20 text-center font-black uppercase tracking-widest text-slate-400">Kitchen not found.</div>;

  return (
    <main className="min-h-screen bg-[#FAFAFA] animate-in fade-in duration-700 pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image src={provider.coverImage || "/placeholder.jpg"} alt="" fill unoptimized className="object-cover opacity-20 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center md:items-end">
            <div className="relative h-48 w-48 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
              <Image src={provider.coverImage || "/placeholder.jpg"} alt="" fill unoptimized className="object-cover" />
            </div>
            <div className="text-center md:text-left pb-6 space-y-2">
              <Badge className="bg-orange-600 text-white mb-3 px-4 py-1 font-black text-[10px] tracking-widest uppercase">
                <Sparkles className="h-3 w-3 mr-1 fill-white" /> Premier Kitchen
              </Badge>
              <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
                {provider.businessName}
              </h1>
              <p className="text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2 uppercase text-[11px] tracking-widest mt-2">
                <MapPin className="h-4 w-4 text-orange-600" /> {provider.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Menu Section */}
          <div className="lg:col-span-8 space-y-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic border-b border-slate-100 pb-6">Featured <span className="text-orange-600">Menu.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {provider.meals.map((meal: Meal) => (
                <div key={meal.id} className="bg-white p-4 rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative h-56 w-full rounded-[2.5rem] overflow-hidden mb-6">
                    <Image src={meal.image || "/placeholder.jpg"} alt={meal.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {meal.dietaryPreferences && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase text-green-600 shadow-sm">
                        <Leaf className="h-3.5 w-3.5 fill-green-600" /> {meal.dietaryPreferences}
                      </div>
                    )}
                  </div>
                  <div className="px-2 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded leading-none">
                            {meal.cuisine || "House Special"}
                        </span>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic mt-1">{meal.name}</h3>
                      </div>
                      <p className="text-2xl font-black text-gray-900 italic tracking-tighter leading-none">৳{meal.price}</p>
                    </div>
                    
                    <p className="text-gray-400 font-medium text-sm italic leading-relaxed line-clamp-2">{meal.description}</p>
                    
                    <AddToCartButton 
                        meal={meal}
                        className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-100 group"
                    >
                      <ShoppingBag className="h-5 w-5 group-hover:rotate-12 transition-transform" /> Add to Order
                    </AddToCartButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 📍 THE LIVE SIDEBAR (Context Aware) */}
          <div className="lg:col-span-4">
            <CartSidebar providerId={provider.id} />
          </div>

        </div>
      </div>
    </main>
  );
}