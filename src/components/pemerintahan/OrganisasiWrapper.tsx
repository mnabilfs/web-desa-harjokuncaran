"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OrganisasiWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const sidebarMenus = [
    { name: "Struktur Organisasi", href: "/organisasi" },
    { name: "Kepala Desa", href: "/organisasi/kepala-desa" },
    { name: "Kepala Urusan Umum", href: "/organisasi/kepala-urusan-umum" },
    { name: "Kepala Urusan Keuangan", href: "/organisasi/kepala-urusan-keuangan" },
    { name: "Kepala Urusan Perencanaan", href: "/organisasi/kepala-urusan-perencanaan" },
    { name: "Kepala Seksi Pemerintahan", href: "/organisasi/kepala-seksi-pemerintahan" },
    { name: "Kepala Seksi Kesejahteraan", href: "/organisasi/kepala-seksi-kesejahteraan" },
    { name: "Kepala Seksi Pelayanan", href: "/organisasi/kepala-seksi-pelayanan" },
    { name: "Kepala Dusun Krajan", href: "/organisasi/kepala-dusun-krajan" },
    { name: "Kepala Dusun Mulyosari", href: "/organisasi/kepala-dusun-mulyosari" },
  ];

  const activeMenu = sidebarMenus.find(menu => menu.href === pathname) || sidebarMenus[0];
  const isRoot = pathname === "/organisasi";

  const isLembagaDesa = pathname === "/organisasi/lembaga-desa";

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          {isRoot ? (
            <span className="text-gray-500">Struktur Organisasi</span>
          ) : isLembagaDesa ? (
            <>
              <span className="text-[#0088cc]">Lembaga Desa</span>
            </>
          ) : (
            <>
              <Link href="/organisasi" className="text-[#0088cc] hover:underline">Struktur Organisasi</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-500">{activeMenu.name}</span>
            </>
          )}
        </div>

        {/* Layout Container */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar - Disembunyikan di halaman Lembaga Desa */}
          {!isLembagaDesa && (
            <div className="w-full md:w-1/4 shrink-0">
              <ul className="flex flex-col border-t border-gray-100">
                {sidebarMenus.map((menu, index) => {
                  const isActive = pathname === menu.href;
                  return (
                    <li key={index}>
                      <Link 
                        href={menu.href} 
                        className={`flex items-center px-4 py-3 border-b border-gray-100 text-[15px] transition-colors ${
                          isActive ? "text-[#0088cc] bg-gray-100" : "text-gray-600 hover:text-[#0088cc]"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="w-3 h-3 mr-2 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {menu.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className={`w-full ${isLembagaDesa ? '' : 'md:w-3/4'}`}>
            <h1 className="text-3xl font-bold text-[#0088cc] mb-8">
              {isLembagaDesa ? "Lembaga Desa" : "Struktur Organisasi"}
            </h1>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
