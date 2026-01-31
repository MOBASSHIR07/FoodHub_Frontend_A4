import Navbar from "@/components/shared/Navbar";
export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Global Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="grow">
        {children}
      </main>

      {/* Global Footer */}
      {/* <Footer /> */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
         © {new Date().getFullYear()} FoodHub. All rights reserved.
      </footer>
    </div>
  );
}