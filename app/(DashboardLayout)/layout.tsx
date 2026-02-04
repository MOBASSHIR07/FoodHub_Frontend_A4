import { userService } from "@/service/user.service";
import { DashboardLayoutProps, UserRole } from "../types/provider";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Toaster } from "sonner";

export default async function DashboardLayout({ 
  admin, 
  provider, 
  children,
  customer
}: DashboardLayoutProps & { children: React.ReactNode }) {
  const session = await userService.getSession();
  if (!session?.user) redirect("/sign-in");

  const role = session.user.role as UserRole;
  console.log(role);

  const dashboardSlots = {
    ADMIN: admin,
    PROVIDER: provider,
    CUSTOMER: customer,
  };

  return (
    <SidebarProvider>
      <AppSidebar role={role} /> 
      <SidebarInset>
         <Toaster richColors  position="top-center" expand={false} />
      {dashboardSlots[role] || children}
      </SidebarInset>
    </SidebarProvider>
  )
}