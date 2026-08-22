"use client";

import { BarChart3, Home, TrendingDown, TrendingUp, Wallet, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

// Helper for Rupiah formatting
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function APBDesaPage() {
  const [apbdesaList, setApbdesaList] = useState<any[]>([]);
  const [selectedTahun, setSelectedTahun] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('apbdesa')
        .select('*')
        .order('tahun', { ascending: false });
        
      if (data && data.length > 0) {
        setApbdesaList(data);
        setSelectedTahun(data[0].tahun);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const activeApbdesa = apbdesaList.find(item => item.tahun === selectedTahun);

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Informasi</span>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Transparansi APBDesa</span>
        </div>

        <div className="w-full">
          <h1 className="text-[28px] font-bold text-[#337ab7] mb-8">Transparansi APBDesa</h1>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : !activeApbdesa ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
            <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
            <p>Data Laporan APBDesa belum dipublikasikan oleh pihak Desa.</p>
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 text-gray-700 font-semibold px-2">
                <Calendar className="text-[#0088cc]" size={20} />
                <span>Pilih Tahun Anggaran:</span>
              </div>
              <select 
                value={selectedTahun}
                onChange={(e) => setSelectedTahun(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-[#0088cc] focus:border-[#0088cc] block w-full sm:w-auto px-4 py-2.5 font-bold cursor-pointer"
              >
                {apbdesaList.map((item) => (
                  <option key={item.id} value={item.tahun}>
                    Tahun {item.tahun}
                  </option>
                ))}
              </select>
            </div>

            {/* Ringkasan Anggaran (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Pendapatan */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-green-100 transition-all group">
                <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pendapatan Desa</h3>
                <p className="text-2xl font-extrabold text-green-700">{formatRupiah(activeApbdesa.pendapatan)}</p>
              </div>

              {/* Belanja */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-red-100 transition-all group">
                <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingDown size={32} />
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Belanja Desa</h3>
                <p className="text-2xl font-extrabold text-red-700">{formatRupiah(activeApbdesa.belanja)}</p>
              </div>

              {/* Pembiayaan */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-blue-100 transition-all group">
                <div className="bg-blue-50 border border-blue-100 text-[#0088cc] p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Wallet size={32} />
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pembiayaan Netto</h3>
                <p className="text-2xl font-extrabold text-[#0088cc]">{formatRupiah(activeApbdesa.pembiayaan)}</p>
              </div>
            </div>

            {/* Infografis Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-3 rounded-xl text-[#0088cc]">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-800">Infografis APBDesa</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">Tahun Anggaran {activeApbdesa.tahun}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full relative rounded-xl overflow-hidden border border-gray-200 shadow-inner group">
                <Image 
                  src={activeApbdesa.image_url} 
                  alt={`Infografis APBDesa Tahun ${activeApbdesa.tahun}`} 
                  width={1200} 
                  height={800} 
                  priority
                  unoptimized={true}
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
