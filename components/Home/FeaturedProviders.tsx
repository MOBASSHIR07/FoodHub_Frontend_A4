
import { providerService } from "@/service/provider.service";
import ProviderCarousel from "./ProviderCarousel";

export default async function FeaturedProviders() {
  const { data: providers, error } = await providerService.getProviders();

  if (error || !providers || providers.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest text-orange-600">Local Partners</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mt-2">Browse Kitchens</h3>
        </div>
        
        <ProviderCarousel providers={providers} />
      </div>
    </section>
  );
}