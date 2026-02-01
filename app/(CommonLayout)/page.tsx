import FeaturedMeals from "@/components/Home/FeaturedMeals";
import FeaturedProviders from "@/components/Home/FeaturedProviders";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";



export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero */}
      <Hero />
      <FeaturedProviders/>
      <FeaturedMeals/>
     <Features/>
     
    
    </div>
  );
}