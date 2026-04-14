// app/lib/actions/dashboard-info/getAdminLinks.ts  (server side)
"use server";

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { jwtVerify } from "jose";
import { 
  LayoutDashboard, 
  ShoppingCart,
  Package, 
  List,
  Users,
  Sparkle,
  StoreIcon,
  PersonStanding, 
} from "lucide-react";
import { IconReportAnalytics } from "@tabler/icons-react";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function getAdminLinks() {
  try {
    // read cookie store from current server request context
    const cookieStore = await cookies() as any;
    const adminIdCookie = cookieStore.get("admin_id")?.value ?? null;

    // prefer the admin_id cookie if set
    let adminId = adminIdCookie;

    // if admin_id not present, try to verify the session jwt
    if (!adminId) {
      const token = cookieStore.get("session")?.value;
      if (!token) {
        // no session -> not authenticated
        return [];
      }

      let payload: any;
      try {
        const verified = await jwtVerify(token, SECRET);
        payload = verified.payload;
      } catch (err) {
        console.error("JWT verify failed", err);
        return [];
      }

      const sid = payload?.sid;
      if (!sid) return [];

      const { data: sessionRow, error: sErr } = await supabaseAdmin
        .schema("admin_auth")
        .from("sessions")
        .select("user_id")
        .eq("id", sid)
        .maybeSingle();

      if (sErr || !sessionRow) {
        console.error("session not found", sErr);
        return [];
      }

      adminId = sessionRow.user_id;
    }

    if (!adminId) return [];

    // finally get role
    const { data, error } = await supabaseAdmin
      .schema("admin_auth")
      .from("auth")
      .select("role")
      .eq("id", adminId)
      .maybeSingle();

    if (error || !data) {
      console.error("Failed to get role:", error);
      return [];
    }

    const role = data.role;

    if (role === "management") { 
      return [ 
        { label: "Dashboard", href: "/admin/home", icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
        { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
        { label: "Products", href: "/admin/products", icon: <Package className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
        { label: "Categories", href: "/admin/categories", icon: <List className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
        { label: "Users", href: "/admin/customers", icon: <Users className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
        { label: "Employees", href: "/admin/employees", icon: <PersonStanding className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
      { label: "Specials", href: "/admin/specials", icon: <Sparkle className="h-5 w-5 shrink-0 text-neutral-700" /> },
    { label: "Product Analytics", href: "/admin/product-analytics", icon: <IconReportAnalytics className="h-5 w-5 shrink-0 text-neutral-700" /> },
    { label: "Inventory", href: "/admin/inventory", icon: <StoreIcon className="h-5 w-5 shrink-0 text-neutral-700" /> }
    
    ]; 
      } 
        
      else if (role === "employee") {
        return [
         { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
         { label: "Users", href: "/admin/customers", icon: <Users className="h-5 w-5 shrink-0 text-neutral-700" /> }, 
      ];
      }

      else {
        return [];
      }
      
  } catch (err) {
    console.error("Error fetching admin links:", err);
    return [];
  }
}
