"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Image as ImageIcon, 
  Scale, 
  FileText, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Berita", href: "/admin/berita", icon: <Newspaper size={20} /> },
    { name: "Agenda", href: "/admin/agenda", icon: <Calendar size={20} /> },
    { name: "Galeri", href: "/admin/galeri", icon: <ImageIcon size={20} /> },
    { name: "Produk Hukum", href: "/admin/produkhukum", icon: <Scale size={20} /> },
    { name: "APBDesa", href: "/admin/apbdesa", icon: <FileText size={20} /> },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0088cc] text-white transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:w-64 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-xs text-blue-200 mt-1">Desa Harjokuncaran</p>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-white text-[#0088cc] font-bold shadow-sm" 
                    : "text-white/90 hover:bg-white/10"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200 shrink-0">
          <button 
            className="lg:hidden text-gray-600 hover:text-[#0088cc] focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0088cc] font-bold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Administrator</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
