export const dynamic = "force-dynamic";
import { getAllCategoriesAction } from "@/actions/category.action";
import CategoryList from "@/components/admin/CategoryList";

import { LayoutGrid } from "lucide-react";

export default async function CategoryListPage() {
  // Fetch data on the server
  const categories = await getAllCategoriesAction();

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 space-y-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
            <LayoutGrid size={12} />
            Administrative Registry
          </div>
          <h1 className="text-6xl font-black text-foreground leading-[0.8] tracking-tighter uppercase">
            Category <br /> <span className="text-orange-500">Inventory.</span>
          </h1>
        </div>

        <div className="bg-card p-6 rounded-[2rem] border border-border shadow-sm min-w-[180px]">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Active</p>
          <p className="text-4xl font-black text-foreground leading-none">
            {categories?.length || 0}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-border w-full mb-12" />
        
        {/* Pass the data to the Client List component */}
        <CategoryList initialCategories={categories || []} />
      </div>
    </div>
  );
}