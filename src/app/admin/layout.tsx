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

  const menuItems: { name: string, href: string, icon: React.ReactNode, subItems?: { name: string, href: string }[] }[] = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { 
      name: "Pemerintahan", 
      href: "#", 
      icon: <Scale size={20} />, 
      subItems: [
        { name: "Struktur Organisasi", href: "/admin/pemerintahan/struktur-organisasi" },
        { name: "Perangkat Desa", href: "/admin/pemerintahan/perangkat-desa" },
        { name: "Lembaga Desa", href: "/admin/pemerintahan/lembaga-desa" }
      ] 
    },
    { 
      name: "Informasi", 
      href: "#", 
      icon: <Newspaper size={20} />, 
      subItems: [
        { name: "Berita", href: "/admin/informasi/berita" },
        { name: "Agenda Kegiatan", href: "/admin/informasi/agenda" },
        { name: "Galeri", href: "/admin/informasi/galeri" },
        { name: "Download", href: "/admin/informasi/download" },
        { name: "APBDesa", href: "/admin/informasi/apbdesa" }
      ] 
    },
    { name: "Produk Hukum", href: "/admin/produkhukum", icon: <Scale size={20} /> },
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
            const hasSub = item.subItems && item.subItems.length > 0;
            const isAnySubActive = hasSub && item.subItems?.some(sub => pathname === sub.href);
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)) || isAnySubActive;

            return (
              <div key={item.name} className="flex flex-col">
                <Link
                  href={item.href !== "#" ? item.href : "#"}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive && !hasSub
                      ? "bg-white text-[#0088cc] font-bold shadow-sm" 
                      : (isAnySubActive ? "text-white font-bold bg-white/10" : "text-white/90 hover:bg-white/10")
                  }`}
                  onClick={(e) => {
                    if (item.href !== "#") setSidebarOpen(false);
                    else e.preventDefault(); // Just for visual grouping for now
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
                
                {hasSub && (
                  <div className="ml-9 mt-1 flex flex-col space-y-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            isSubActive 
                              ? "bg-white text-[#0088cc] font-bold shadow-sm" 
                              : "text-white/80 hover:bg-white/10"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
