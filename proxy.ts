import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await userService.getSession();

  // 1. Authentication Check
  if (!session) {
   
    if (pathname === "/sign-in") return NextResponse.next();
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const role = session.user.role; 

  // 2. Logic for when they hit the base "/dashboard"
  if (pathname === "/dashboard") {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
    
    return NextResponse.next();
  }

  // 3. Security: Role-Based Path Protection
 
  if (pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  if (pathname.startsWith("/provider-dashboard") && role !== "PROVIDER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/provider-dashboard/:path*"
  ],
};