import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* LEFT SIDE: The Form Container */}
      <div className="flex flex-col justify-center items-center px-8 py-12 lg:px-20">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
              F
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900">FoodHub</span>
          </Link>

          {/* This is where your Sign-In or Sign-Up page content will appear */}
          {children}
            <Toaster richColors  />
        </div>
      </div>

      {/* RIGHT SIDE: Visual Branding (Hidden on Mobile) */}
      <div className="hidden lg:block relative bg-gray-900 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070" 
          alt="Auth Background" 
          fill 
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-16 bg-linear-to-t from-black/80 to-transparent">
          <h2 className="text-4xl font-black text-white mb-4">The best meals from <br/> local kitchens.</h2>
          <p className="text-gray-300 font-medium">Join thousands of foodies in Dhaka.</p>
        </div>
      </div>
    </div>
  );
}