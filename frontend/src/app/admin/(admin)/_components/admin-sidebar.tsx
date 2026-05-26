"use client";

import { Button } from "@/components/ui/button";
import { HandPlatter, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <HandPlatter className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg">NomNom</h1>
          <p className="text-xs text-gray-500">Swift delivery</p>
        </div>
      </div>

      <nav className="space-y-2">
        <Link href="/admin">
          <Button
            variant={pathname === "/admin" ? "default" : "ghost"}
            className={
              pathname === "/admin"
                ? "w-full justify-start gap-2 bg-black text-white hover:bg-black/90"
                : "w-full justify-start gap-2"
            }
          >
            <HandPlatter className="w-4 h-4" />
            Food menu
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button
            variant={pathname === "/admin/orders" ? "default" : "ghost"}
            className={
              pathname === "/admin/orders"
                ? "w-full justify-start gap-2 bg-black text-white hover:bg-black/90"
                : "w-full justify-start gap-2"
            }
          >
            <Package className="w-4 h-4" />
            Orders
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
