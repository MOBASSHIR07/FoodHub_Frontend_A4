import { mealService } from "@/service/meal.service";
import Image from "next/image";
import { ShoppingBag, Flame, Clock } from "lucide-react";

export default async function FeaturedMeals() {
  const { data: meals, error } = await mealService.getAllMeals()

  if (error || !meals || meals.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-orange-600 font-black uppercase tracking-[0.2em] text-xs">Trending Now</h2>
            <h3 className="text-4xl font-black text-gray-900">Popular on FoodHub</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <div key={meal.id} className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-3 hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500">
              {/* Image with overlay badge */}
              <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
                <Image 
                  src={meal.image || "/placeholder-meal.jpg"} 
                  alt={meal.name} 
                  fill 
                  unoptimized 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                  <span className="text-lg font-black text-gray-900">৳{meal.price}</span>
                </div>
              </div>

              {/* Meal Info */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    {meal.category?.name}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                    <Clock className="h-3 w-3" /> 25 min
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {meal.name}
                </h4>
                
                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed h-8">
                  {meal.description}
                </p>

                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 mt-2">
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}