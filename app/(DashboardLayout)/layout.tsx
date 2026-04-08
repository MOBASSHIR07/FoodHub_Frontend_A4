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
    
      <AppSidebar role={role} /> 
      
      <SidebarInset className="bg-background">
     
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl md:hidden">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors" />
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary fill-primary" />
              <span className="font-black text-foreground tracking-tighter text-sm uppercase">FoodHub</span>
            </div>
          </div>

          {/* Role Indicator for Mobile */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-muted-foreground border border-border px-2 py-0.5 rounded-md uppercase tracking-tighter">
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