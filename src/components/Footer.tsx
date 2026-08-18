"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-[#0088cc] text-white pt-12 pb-6 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Profil */}
          <div>
            <h3 className="text-xl mb-4 font-normal">Profil</h3>
            <div className="mb-4">
              <p className="font-bold text-sm">DESA HARJOKUNCARAN -</p>
              <p className="font-bold text-sm">SUMBERMANJING WETAN</p>
              <p className="font-bold text-sm">MALANG - JAWA TIMUR</p>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-white/90">
              Website desa dibangun dengan tujuan sebagai media pelayanan publik resmi desa, yang dibangun dan dikelola oleh tim desa setempat. Dengan memanfaatkan website penyelenggaraan pelayanan publik dapat dilakukan secara cepat dan mudah
            </p>
            <Link href="#" className="flex items-center text-sm font-semibold hover:underline">
              selengkapnya <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {/* Kontak Kami */}
          <div>
            <h3 className="text-xl mb-4 font-normal">Kontak Kami</h3>
            <p className="text-sm leading-relaxed mb-4 text-white/90">
              Jalan Maghenda No.88 RT.03 RW.01 Dusun Krajan Desa Harjokuncaran Kecamatan Sumbermanjing Wetan.<br />
              Kode Pos 65176
            </p>
            <div className="flex items-center space-x-2 text-sm mb-2 text-white/90">
              <Phone size={14} />
              <span>-</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-white/90">
              <Mail size={14} />
              <span>harjokuncaran.sumbermanjingwetan@malangkab.go.id</span>
            </div>
          </div>

          {/* Visitor Counter */}
          <div className="space-y-4">
            <div className="bg-white/10 rounded-md p-4 text-center border border-white/20">
              <h4 className="font-semibold mb-2">Total Visitor Hari Ini</h4>
              <p className="text-2xl font-bold">0 Visitor</p>
            </div>
            <div className="bg-white/10 rounded-md p-4 text-center border border-white/20">
              <h4 className="font-semibold mb-2">Total Visitor Sepanjang Waktu</h4>
              <p className="text-2xl font-bold">0 Visitor</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center relative">
          <p className="text-sm text-white/90">WebsiteDesa</p>
          <p className="text-sm text-white/90 mt-2 md:mt-0 font-bold">2020-2026 © Kementerian Komunikasi dan Digital RI.</p>
        </div>
      </div>
      
      {/* Back to top button - menempel di bawah (absolute) terhadap footer (relative) */}
      <button 
        onClick={scrollToTop}
        className="absolute right-4 bottom-0 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-t-md transition-colors z-50 cursor-pointer"
        aria-label="Back to top"
        title="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}
