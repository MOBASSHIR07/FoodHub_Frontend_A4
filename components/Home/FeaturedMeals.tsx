import { mealService } from "@/service/meal.service";
import { Meal } from "@/app/types/provider"; 
import Image from "next/image";
import {  Star, MapPin } from "lucide-react";

export default async function FeaturedMeals() {
  const { data: meals, error } = await mealService.getAllMeals();

  if (error || !meals) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-7">
      {meals.map((meal: Meal) => {
        const reviewCount = meal.reviews?.length || 0;
        const avgRating = reviewCount > 0 
          ? meal.reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount 
          : 0;

        return (
          <div key={meal.id} className="group border rounded-[2.5rem] p-3 hover:shadow-xl transition-all">
            <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
              <Image src={meal.image || "/placeholder.jpg"} alt={meal.name} fill unoptimized className="object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-black">
                <Star className="h-3 w-3 text-orange-500 fill-current" />
                {avgRating > 0 ? avgRating.toFixed(1) : "New"}
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <h4 className="text-xl font-bold">{meal.name}</h4>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <MapPin className="h-3 w-3 text-orange-500" />
                <span>{meal.provider?.businessName}</span>
              </div>
              <p className="text-orange-600 font-black">৳{meal.price}</p>
              <button className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold mt-2 hover:bg-orange-600 transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}