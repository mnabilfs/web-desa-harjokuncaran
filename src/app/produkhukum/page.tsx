"use client";

import { Download, Home, Search, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProdukHukumPage() {
  // Data Dummy Produk Hukum
  const [hukumData] = useState([
    {
      id: 1,
      nomor: "01 Tahun 2026",
      kategori: "Peraturan Desa (Perdes)",
      judul: "Anggaran Pendapatan dan Belanja Desa (APBDesa) Tahun Anggaran 2026",
      status: "Berlaku",
      link: "#"
    },
    {
      id: 2,
      nomor: "03 Tahun 2025",
      kategori: "Peraturan Kepala Desa",
      judul: "Tata Cara Pengelolaan Tanah Kas Desa",
      status: "Berlaku",
      link: "#"
    },
    {
      id: 3,
      nomor: "12 Tahun 2024",
      kategori: "Keputusan Kepala Desa",
      judul: "Penetapan Susunan Pengurus BUMDes Harjokuncaran Komando",
      status: "Berlaku",
      link: "#"
    },
    {
      id: 4,
      nomor: "02 Tahun 2023",
      kategori: "Peraturan Desa (Perdes)",
      judul: "Pungutan Desa",
      status: "Dicabut",
      link: "#"
    }
  ]);

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Produk Hukum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0088cc] mb-3">
            Produk Hukum Desa Harjokuncaran
          </h1>
          <p className="text-gray-600 text-lg">
            Jaringan Dokumentasi dan Informasi Hukum (JDIH) resmi Desa Harjokuncaran untuk transparansi tata kelola desa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        
        {/* Search Bar UI */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex items-center">
          <Search className="text-gray-400 ml-2 mr-4" size={20} />
          <input 
            type="text" 
            placeholder="Cari berdasarkan judul atau nomor dokumen hukum..." 
            className="w-full text-[15px] outline-none placeholder:text-gray-400 text-gray-700"
          />
          <button className="bg-[#0088cc] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-blue-600 transition-colors hidden sm:block">
            Cari
          </button>
        </div>

        {/* Daftar Produk Hukum */}
        <div className="flex flex-col gap-4">
          {hukumData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500">Nomor: {item.nomor}</span>
                </div>
                
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-snug">
                  {item.judul}
                </h2>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {/* Badge Kategori */}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.kategori.includes("Perdes") 
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : item.kategori.includes("Peraturan Kepala") 
                      ? "bg-green-50 text-green-600 border border-green-200" 
                      : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                  }`}>
                    {item.kategori}
                  </span>
                  
                  {/* Badge Status */}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    item.status === "Berlaku" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                      : "bg-red-50 text-red-500 border-red-200"
                  }`}>
                    Status: {item.status}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full md:w-auto flex items-center justify-center gap-2 border-2 border-[#0088cc] text-[#0088cc] font-bold py-2.5 px-5 rounded-md hover:bg-[#0088cc] hover:text-white transition-colors shrink-0">
                <Download size={18} />
                Unduh / Lihat Detail
              </button>
              
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
