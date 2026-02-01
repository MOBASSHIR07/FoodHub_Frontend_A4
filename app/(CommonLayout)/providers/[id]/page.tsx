import { providerService } from "@/service/provider.service";
import Image from "next/image";
import { MapPin, Star, Utensils, Leaf, Flame, ShoppingBag, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 
import { Meal } from "@/app/types/provider";

export default async function ProviderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: provider, error } = await providerService.getProviderById(id);

  if (error || !provider) return <div className="py-20 text-center">Kitchen not found.</div>;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Premium Hero Header */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <Image 
          src={provider.coverImage || "/placeholder.jpg"} 
          alt="" fill unoptimized className="object-cover scale-105 blur-[2px] opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center md:items-end">
            <div className="relative h-40 w-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
              <Image src={provider.coverImage || "/placeholder.jpg"} alt="" fill unoptimized className="object-cover" />
            </div>
            <div className="text-center md:text-left pb-4">
              <Badge className="mb-3 bg-orange-100 text-orange-600 hover:bg-orange-100 border-none px-4">Open Now</Badge>
              <h1 className="text-5xl font-black text-gray-900 tracking-tight">{provider.businessName}</h1>
              <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-2">
                <MapPin className="h-4 w-4 text-orange-600" /> {provider.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Menu (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-black text-gray-900">Featured Menu</h2>
              <div className="flex gap-2">
                 <Badge variant="outline" className="rounded-full">All</Badge>
                 <Badge variant="outline" className="rounded-full opacity-50">Fast Food</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.meals.map((meal: Meal) => (
                <div key={meal.id} className="bg-white p-4 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                  <div className="relative h-48 w-full rounded-[2rem] overflow-hidden mb-4">
                    <Image src={meal.image || "/placeholder.jpg"} alt={meal.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {meal.dietaryPreferences && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase text-green-600">
                        <Leaf className="h-3 w-3" /> {meal.dietaryPreferences}
                      </div>
                    )}
                  </div>

                  <div className="px-2 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{meal.cuisine || "Specialty"}</span>
                        <h3 className="text-xl font-bold text-gray-900">{meal.name}</h3>
                      </div>
                      <p className="text-xl font-black text-gray-900">৳{meal.price}</p>
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2">{meal.description}</p>
                    
                    <div className="flex items-center gap-4 py-3">
                       <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                          <MessageSquare className="h-3 w-3" /> 
                       </span>
                       <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                          <Flame className="h-3 w-3 text-orange-500" /> 450 kcal
                       </span>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95">
                      <ShoppingBag className="h-5 w-5" /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Cart Sidebar (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Your Order</h3>
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">Your cart is empty.<br/>Add some delicious meals!</p>
              </div>
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span>৳0</span>
                </div>
                <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-[1.5rem] font-bold cursor-not-allowed">
                  Checkout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}