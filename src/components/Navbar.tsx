"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) return null;

  const menuItems = [
    { 
      name: "PROFIL DESA", 
      href: "#", 
      hasDropdown: true,
      activePath: "/about-us", // Simplifikasi deteksi aktif
      subItems: [
        { name: "Tentang Kami", href: "/about-us" },
        { name: "Visi & Misi", href: "/visi-misi" },
        { name: "Sejarah Desa", href: "/sejarah-desa" },
        { name: "Geografis Desa", href: "/geografis" },
        { name: "Demografi Desa", href: "/demografi" }
      ]
    },
    { 
      name: "PEMERINTAHAN", 
      href: "#", 
      hasDropdown: true,
      subItems: [
        { name: "Struktur Organisasi", href: "/organisasi" },
        { name: "Perangkat Desa", href: "/organisasi/sekretaris-desa" },
        { name: "Lembaga Desa", href: "/organisasi/lembaga-desa" }
      ]
    },
    { name: "LAYANAN", href: "/layanan", hasDropdown: false },
    { 
      name: "INFORMASI", 
      href: "#", 
      hasDropdown: true,
      subItems: [
        { name: "Berita", href: "/berita" },
        { name: "Agenda Kegiatan", href: "/agenda" },
        { name: "Galeri", href: "/galeri" },
        { name: "Download", href: "/download" },
        { name: "APBDesa", href: "/apbdesa" }
      ]
    },
    { 
      name: "POTENSI DESA", 
      href: "#", 
      hasDropdown: true,
      subItems: [
        { name: "Desa Wisata Kopi", href: "/potensi-desa" }
      ]
    },
    { name: "PRODUK HUKUM", href: "/produkhukum", hasDropdown: false },
  ];

  const isActive = (item: any) => {
    if (pathname === item.href && item.href !== "#") return true;
    if (item.activePath && pathname.startsWith(item.activePath)) return true;
    if (item.subItems && item.subItems.some((sub: any) => pathname === sub.href && sub.href !== "#")) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer group shrink-0 mr-4">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <Image src="/icon.png" alt="Logo Desa Harjokuncaran" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="font-bold text-[#1a202c] text-sm md:text-base leading-tight transition-colors group-hover:text-[#0088cc]">DESA HARJOKUNCARAN</span>
              <span className="text-[#4a5568] text-[10px] md:text-xs leading-tight uppercase mt-0.5">SUMBERMANJING WETAN - MALANG</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 h-full">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group h-20 flex items-center">
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-sm font-semibold text-[13px] transition-colors whitespace-nowrap ${
                    isActive(item) 
                      ? "bg-[#0088cc] text-white" 
                      : "text-[#0088cc] hover:text-blue-800"
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="ml-1" />}
                </Link>
                {/* Dropdown */}
                {item.hasDropdown && item.subItems && (
                  <div className="absolute top-[80px] left-0 w-56 bg-white shadow-lg border border-gray-100 rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="py-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link href={subItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0088cc]">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#0088cc] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-120px)] overflow-y-auto shadow-inner">
          <ul className="px-4 py-4 space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 font-semibold text-sm rounded-md ${
                    isActive(item) ? "bg-[#0088cc] text-white" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <ul className="pl-6 space-y-1 mt-1 border-l-2 border-gray-100 ml-6">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link 
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2 text-sm rounded-md ${
                            pathname === subItem.href && subItem.href !== "#" 
                              ? "text-[#0088cc] font-bold" 
                              : "text-gray-600 hover:text-[#0088cc]"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
