import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import hero from "@/assets/Image/hero.jpg"
// 2
export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden mt-1">
      {/* --- 1. THE BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero}
          alt="FoodHub Premium Meals"
          fill
          priority
          className="object-cover object-right lg:object-center" 
          // object-right ensures the food panels stay visible on small screens
        />
        {/* Dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-white/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-2xl text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-4 py-1.5 text-sm font-bold text-orange-600 border border-orange-200 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-current mt-0.5" />
            <span>Top Rated Food Delivery in Bangladesh</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-[1] drop-shadow-sm">
            Satisfy Your <br />
            <span className="text-orange-600">Cravings</span> <br /> 
            in One Click.
          </h1>
          
          {/* Description */}
          <p className="max-w-md text-lg font-medium text-gray-700 leading-relaxed mx-auto lg:mx-0">
            Experience the best meals from local providers. From juicy burgers to 
            authentic pasta, we bring the kitchen to your doorstep.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link href="/meal">
              <Button size="lg" className="h-16 px-10 rounded-full bg-orange-600 hover:bg-orange-700 text-xl font-black shadow-2xl shadow-orange-200 transition-all active:scale-95 group">
                Order Now
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/providers">
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-2 bg-white/50 backdrop-blur-sm text-lg font-bold hover:bg-white transition-all">
                Explore Kitchens
              </Button>
            </Link>
          </div>

          {/* Stats Overlay */}
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-10">
            <div>
              <p className="text-3xl font-black text-gray-900"></p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Customers</p>
            </div>
            <div className="h-12 w-[2px] bg-gray-300" />
            <div>
              <p className="text-3xl font-black text-gray-900">50+</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Kitchens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}