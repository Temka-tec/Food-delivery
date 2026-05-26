// src/app/admin/(admin)/layout.tsx
"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { HandPlatter, LayoutDashboard, Truck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "./_components/admin-sidebar";
// import { Main } from "./_components/Main";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
