"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Utensils, Zap } from "lucide-react";
import featuresBg from "@/assets/Image/choose_us.jpg";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-orange-600" />,
    title: "Flash Delivery",
    desc: "Your favorite meals delivered in under 30 minutes, fresh and hot.",
  },
  {
    icon: <Utensils className="h-8 w-8 text-orange-600" />,
    title: "Premium Quality",
    desc: "We partner with top-rated local kitchens to ensure every bite is perfect.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-orange-600" />,
    title: "Secure Payment",
    desc: "Multiple secure payment options including SSL Commerz and Cash on Delivery.",
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- LEFT SIDE: THE IMAGE (Slides in from Left) --- */}
          <div className={`flex-1 relative group transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          }`}>
            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              <Image
                src={featuresBg}
                alt="Why choose FoodHub"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating Experience Badge */}
            <div className={`absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-3xl shadow-xl transition-all duration-1000 delay-500 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}>
              <p className="text-4xl font-black text-orange-600">5+</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Years of Trust</p>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT (Staggered Animation) --- */}
          <div className="flex-1 space-y-10">
            <div className={`space-y-4 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">
                Why Choose Us
              </h2>
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                More Than Just <br /> Food Delivery.
              </h3>
              <p className="text-lg text-gray-600">
                We bridge the gap between your hunger and the best local chefs in Bangladesh. 
                Our platform is built for speed, safety, and taste.
              </p>
            </div>

            <div className="grid gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-6 group transition-all duration-700 ease-out`}
                  style={{ 
                    transitionDelay: `${(idx + 1) * 200}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)"
                  }}
                >
                  <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:bg-orange-600 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-orange-600 transition-colors group-hover:text-white">
                        {feature.icon}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {feature.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed italic">
                        {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}