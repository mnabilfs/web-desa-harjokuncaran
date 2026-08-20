"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Camera } from "lucide-react";

export default function GalleryStructureSection() {
  const strukturOrganisasi = [
    "Kepala Desa",
    "Sekretaris Desa",
    "Kaur Pemerintahan",
    "Kaur Pembangunan",
    "Kaur Pemberdayaan Masyarakat",
    "Kaur Kesejahteraan Rakyat",
    "Kaur Umum",
    "Kaur Keuangan"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % strukturOrganisasi.length);
    }, 3000); // Slide setiap 3 detik

    return () => clearInterval(timer);
  }, [strukturOrganisasi.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? strukturOrganisasi.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strukturOrganisasi.length);
  };

  return (
    <div className="bg-gray-50 py-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          {/* Galeri */}
          <div>
            <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Galeri <span className="font-bold ml-1">Foto & Video</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
            </div>
            <p className="text-gray-500 text-sm">Tidak ada data yang ditampilkan</p>
          </div>

          {/* Struktur Organisasi */}
          <div>
            <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Struktur <span className="font-bold ml-1">Organisasi</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={handlePrev}
                className="bg-gray-300 hover:bg-gray-400 text-white p-1 rounded transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="w-64 overflow-hidden relative group">
                <div className="flex w-full">
                  {strukturOrganisasi.map((jabatan, index) => (
                    <div 
                      key={index}
                      className="w-full shrink-0 flex flex-col items-center transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {/* Ikon Kamera */}
                      <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center mb-2 overflow-hidden relative shadow-md">
                        <Camera className="w-24 h-24 text-gray-400" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-1 bg-white rotate-45 scale-150"></div>
                        </div>
                      </div>
                      
                      {/* Kontainer Teks */}
                      <div className="bg-[#6b9cc8] text-white w-full text-center py-2 px-2 text-sm font-semibold mt-[-20px] relative z-10 shadow min-h-[56px] flex flex-col justify-center">
                        <p className="mb-1 relative z-20">...</p>
                        <p className="line-clamp-2 leading-tight px-2 relative z-20">{jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="bg-gray-300 hover:bg-gray-400 text-white p-1 rounded transition-colors z-10"
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
