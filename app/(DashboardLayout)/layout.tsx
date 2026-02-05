import { userService } from "@/service/user.service";
import { DashboardLayoutProps, UserRole } from "../types/provider";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Toaster } from "sonner";
import { Zap } from "lucide-react";

export default async function DashboardLayout({ 
  admin, 
  provider, 
  children,
  customer
}: DashboardLayoutProps & { children: React.ReactNode }) {
  const session = await userService.getSession();
  if (!session?.user) redirect("/sign-in");

  const role = session.user.role as UserRole;

  const dashboardSlots = {
    ADMIN: admin,
    PROVIDER: provider,
    CUSTOMER: customer,
  };

  return (
    <SidebarProvider>
      {/* Your existing Sidebar */}
      <AppSidebar role={role} /> 
      
      <SidebarInset className="bg-slate-50/50">
        {/* 📱 MODERN MOBILE HEADER (Option 1) */}
        {/* Hidden on Desktop (md:hidden) */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-xl md:hidden">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors" />
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500 fill-orange-500" />
              <span className="font-black text-slate-900 tracking-tighter text-sm uppercase">FoodHub</span>
            </div>
          </div>

          {/* Role Indicator for Mobile */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {role}
            </span>
          </div>
        </header>

        {/* Global Toaster */}
        <Toaster richColors position="top-center" expand={false} />

        <main className="flex-1 overflow-x-hidden p-4 md:p-0">
          {dashboardSlots[role] || children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}