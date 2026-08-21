"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Camera, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function GalleryStructureSection() {
  const [galeriList, setGaleriList] = useState<any[]>([]);
  const [perangkatList, setPerangkatList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // Fetch Galeri
      const { data: gData } = await supabase.from('galeri').select('*').order('created_at', { ascending: false }).limit(4);
      if (gData) setGaleriList(gData);
      
      // Fetch Perangkat Desa
      const { data: pData } = await supabase.from('perangkat_desa').select('*');
      if (pData) {
        const orderMap: Record<string, number> = {
          "kepala-desa": 1,
          "sekretaris-desa": 2,
          "kepala-urusan-umum": 3,
          "kepala-urusan-keuangan": 4,
          "kepala-urusan-perencanaan": 5,
          "kepala-seksi-pemerintahan": 6,
          "kepala-seksi-kesejahteraan": 7,
          "kepala-seksi-pelayanan": 8,
          "kepala-dusun-krajan": 9,
          "kepala-dusun-mulyosari": 10
        };
        const sorted = pData.sort((a, b) => (orderMap[a.slug] || 99) - (orderMap[b.slug] || 99));
        setPerangkatList(sorted);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (perangkatList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % perangkatList.length);
    }, 3000); // Slide setiap 3 detik

    return () => clearInterval(timer);
  }, [perangkatList.length]);

  const handlePrev = () => {
    if (perangkatList.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? perangkatList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (perangkatList.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % perangkatList.length);
  };

  // Format Jabatan helper
  const formatJabatan = (slug: string) => {
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="bg-gray-50 py-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          {/* Galeri */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Galeri <span className="font-bold ml-1">Foto & Video</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
              <Link href="/galeri" className="text-sm text-gray-500 hover:text-[#0088cc]">Lihat Semua</Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {galeriList && galeriList.length > 0 ? (
                galeriList.map((item) => (
                  <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden group shadow-sm bg-gray-200">
                    <Image 
                      src={item.image_url} 
                      alt={item.title} 
                      fill 
                      unoptimized={true}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-white text-xs font-semibold truncate leading-tight">{item.title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-gray-500 text-sm py-8 text-center border border-dashed border-gray-200 rounded-lg">Belum ada foto galeri.</div>
              )}
            </div>
          </div>

          {/* Struktur Organisasi */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Struktur <span className="font-bold ml-1">Organisasi</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
              <Link href="/organisasi" className="text-sm text-gray-500 hover:text-[#0088cc]">Detail Lengkap</Link>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={handlePrev}
                className="bg-gray-300 hover:bg-[#0088cc] text-white p-2 rounded-full transition-colors z-10 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="w-64 overflow-hidden relative group">
                <div className="flex w-full">
                  {perangkatList.length > 0 ? (
                    perangkatList.map((p, index) => (
                      <div 
                        key={p.id}
                        className="w-full shrink-0 flex flex-col items-center transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                      >
                        {/* Foto Perangkat */}
                        <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-2 overflow-hidden relative shadow-lg border-4 border-white">
                          {p.foto_url ? (
                            <Image src={p.foto_url} alt={p.nama} fill unoptimized={true} className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                              <Camera className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Kontainer Teks */}
                        <div className="bg-[#6b9cc8] text-white w-full text-center py-3 px-2 text-sm font-semibold mt-[-20px] relative z-10 shadow-md min-h-[64px] flex flex-col justify-center rounded">
                          <p className="mb-1 text-xs text-blue-100 uppercase tracking-widest truncate max-w-full relative z-20">
                            {formatJabatan(p.slug)}
                          </p>
                          <p className="line-clamp-2 leading-tight px-2 text-base font-bold relative z-20">
                            {p.nama === "Menunggu Penunjukan" ? "KOSONG" : p.nama}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-64 shrink-0 flex flex-col items-center justify-center h-64 text-gray-400">
                      <ImageIcon size={48} className="mb-2" />
                      <p className="text-sm">Memuat struktur...</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="bg-gray-300 hover:bg-[#0088cc] text-white p-2 rounded-full transition-colors z-10 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
