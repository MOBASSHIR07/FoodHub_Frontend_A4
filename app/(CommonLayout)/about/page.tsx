import React from "react";
import Image from "next/image";
import { 
  Users, 
  Store, 
  Truck, 
  Gamepad2, 
  Target, 
  Heart, 
  ShieldCheck, 
  UtensilsCrossed 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { label: "Active Users", value: "50,000+", icon: Users },
  { label: "Partner Restaurants", value: "1,200+", icon: Store },
  { label: "Daily Deliveries", value: "15,000+", icon: Truck },
  { label: "Local Heroes", value: "500+", icon: Gamepad2 },
];

const values = [
  {
    title: "Quality First",
    description: "We partner with the best local kitchens to ensure every meal meets our high standards.",
    icon: ShieldCheck,
  },
  {
    title: "Community Driven",
    description: "Supporting local businesses and creators is at the heart of everything we do.",
    icon: Heart,
  },
  {
    title: "Fast & Reliable",
    description: "Our logistics network is designed to get your food to you while it's still piping hot.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 flex flex-col items-center justify-center text-center px-6 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-white dark:from-slate-950/20 dark:to-background -z-10" />
        
        <div className="container mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <UtensilsCrossed className="w-3 h-3" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.2]">
            Connecting Hungry Hearts with <span className="text-orange-600">Culinary Masters</span>.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            FoodHub is Bangladesh's fastest growing food discovery and delivery platform, 
            built to celebrate local flavors and empower culinary creators.
          </p>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white dark:bg-slate-950/30 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 transition-transform group-hover:scale-105">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-0">
                  <h3 className="text-xl md:text-2xl font-black text-foreground">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-lg group">
               <Image 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
                  alt="Food Creation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-medium italic">"Passion turned into a movement, one meal at a time."</p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black text-foreground">The Story Behind FoodHub</h2>
                <div className="w-12 h-1.5 bg-orange-600 rounded-full" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Founded in 2024, FoodHub began with a simple observation: Bangladesh's incredible culinary 
                diversity was hidden in local neighborhoods, often inaccessible to those who craved it most.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We set out to build more than just a delivery app. We built a platform that treats food 
                as an art and every chef as an artist. Today, we bridge the gap between passion and 
                convenience, ensuring that every bite tells a story.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/meals">
                    <Button className="h-11 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-500/10 transition-all active:scale-95">
                    Explore Meals
                    </Button>
                </Link>
                <Link href="/contact">
                    <Button variant="outline" className="h-11 px-6 rounded-full border-2 font-bold hover:bg-muted transition-all active:scale-95">
                    Contact Us
                    </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-foreground">What Defines Us</h2>
            <p className="text-xs text-muted-foreground max-w-xl mx-auto italic">Our commitment to excellence in every order.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all text-left space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <val.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">{val.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="relative p-8 md:p-14 rounded-3xl bg-slate-950 dark:bg-orange-600 overflow-hidden text-center text-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600 rounded-full blur-[80px] opacity-20 dark:bg-orange-400/30" />
            
            <div className="relative space-y-6 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-black leading-tight">Ready to join the culinary revolution?</h2>
              <p className="text-slate-400 dark:text-orange-50 text-sm md:text-base font-medium">Join thousands of foodies and chefs at FoodHub.</p>
              <div className="flex justify-center pt-2">
                <Link href="/auth/sign-up">
                    <Button className="h-12 px-8 rounded-full bg-orange-600 dark:bg-white dark:text-orange-600 hover:bg-orange-700 dark:hover:bg-orange-50 text-white font-black text-base transition-all active:scale-95 shadow-lg">
                    Get Started Free
                    </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
