import Link from "next/link";
import { UtensilsCrossed, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Meal", href: "/meal" },
  { name: "Providers", href: "/providers" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 dark:bg-black dark:border-t dark:border-slate-800">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* --- 1. BRANDING --- */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-500/20">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Food<span className="text-orange-600">Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The most reliable food delivery platform in Bangladesh. 
              Connecting hungry hearts with local culinary masters.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" suppressHydrationWarning className="rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" suppressHydrationWarning className="rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" suppressHydrationWarning className="rounded-full hover:bg-orange-600 hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* --- 2. QUICK LINKS (Scalable) --- */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Explore</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-orange-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- 3. CONTACT INFO --- */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="h-5 w-5 text-orange-600" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-orange-600" />
                +880 1234 567890
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-orange-600" />
                support@foodhub.com
              </li>
            </ul>
          </div>

          {/* --- 4. NEWSLETTER --- */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Subscribe</h4>
            <p className="text-sm text-slate-400">Get the latest deals and menu updates.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                suppressHydrationWarning
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600 outline-none placeholder:text-slate-600 text-white"
              />
              <Button suppressHydrationWarning className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl h-11 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                Join Now
              </Button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}