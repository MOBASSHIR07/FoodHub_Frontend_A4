import FeaturedProviders from "@/components/Home/FeaturedProviders";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";



export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero */}
      <Hero />
      <FeaturedProviders/>
      
      {/* Section 2: Categories (Coming Next) */}
      {/* <Categories /> */}
      
      {/* Section 3: Trending (Coming Next) */}
      {/* <Trending /> */}
      
      {/* Section 4: Why Us (Coming Next) */}
     <Features/>
     
    
    </div>
  );
}