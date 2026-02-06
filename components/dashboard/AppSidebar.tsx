"use client";

import { ClipboardList, Package, Settings, ShoppingCart, Users, Utensils, Zap, LayoutDashboard, Grid2X2, PlusCircle, UserCheck } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const menuItems = {
    ADMIN: [
      { title: "User Directory", url: "/admin-dashboard/users", icon: Users },
      { title: "Category List", url: "/admin-dashboard/category-list", icon: Grid2X2 },
      { title: "Create Category", url: "/admin-dashboard/post-categories", icon: PlusCircle },
      { title: "All Orders History", url: "/admin-dashboard/orders", icon: ShoppingCart },
    ],
    PROVIDER: [
      {
        title: "Kitchen Profile",
        url: "/provider-dashboard/kitchen-profile",
        icon: Utensils
      },
      {
        title: "Menu Management",
        url: "/provider-dashboard/menu-management", 
        icon: ClipboardList
      },
      {
        title: "Live Orders",
        url: "/provider-dashboard/orders", 
        icon: Package
      },
    ],
    CUSTOMER: [

      { title: "Browse Food", url: "/dashboard", icon: ShoppingCart },
      { title: "My Orders", url: "/dashboard/my-orders", icon: Package },
      { title: "Profile", url: "/dashboard/profile", icon: Settings },
    ],
  };


  const currentMenu = menuItems[role as keyof typeof menuItems] || [];

  return (
    <Sidebar className="border-r border-slate-100 bg-white/50 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          {/* Neon Icon Box */}
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-200">
            <Zap className="h-5 w-5 text-white fill-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-slate-900 text-xl leading-none">FOODHUB</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{role} MODE</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            Navigation Console
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {currentMenu.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "group relative flex items-center gap-3 px-4 py-7 rounded-[1.25rem] transition-all duration-300 border border-transparent",
                        isActive
                          ? "bg-white border-slate-100 text-orange-600 shadow-xl shadow-slate-100"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn(
                          "h-5 w-5 transition-transform duration-500 group-hover:scale-110",
                          isActive ? "text-orange-600" : "text-slate-400 group-hover:text-slate-900"
                        )} />
                        <span className="font-bold text-[15px]">{item.title}</span>

                        {isActive && (
                          <div className="absolute left-0 w-1.5 h-8 bg-orange-600 rounded-r-full shadow-[2px_0_8px_rgba(234,88,12,0.4)]" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Cyberpunk Status Footer */}
      <div className="mt-auto p-4 border-t border-slate-50">
        <div className="bg-slate-950 rounded-[2rem] p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 h-20 w-20 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Network</span>
              <span className="text-xs font-bold text-white mt-0.5">Render: Online</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-green-400">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}