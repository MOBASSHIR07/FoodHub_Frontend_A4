import { ProviderDetail } from "@/app/types/provider";
import ProviderCard from "@/components/shared/ProviderCard";
import { providerService } from "@/service/provider.service";

import { UtensilsCrossed } from "lucide-react";


export default async function AllProvidersPage() {
  const { data: providers, error } = await providerService.getProviders();

  if (error) return <div className="py-20 text-center text-red-500">Error: {error.message}</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">
            Our Partner <span className="text-orange-600">Kitchens</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Explore authentic home-cooked meals from the best local providers in Dhaka.
          </p>
        </div>

        {/* Grid Layout */}
        {providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {providers.map((provider:ProviderDetail) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <UtensilsCrossed className="h-20 w-20 mb-4 opacity-20" />
            <p className="text-xl font-bold">No kitchens found right now.</p>
          </div>
        )}
      </div>
    </main>
  );
}