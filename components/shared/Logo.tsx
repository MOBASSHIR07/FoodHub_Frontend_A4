import Link from "next/link";
import { UtensilsCrossed } from "lucide-react"; 

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 transition-transform group-hover:scale-110">
          <UtensilsCrossed className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-gray-900">
          FoodHub
        </span>
      </div>
    </Link>
  );
};