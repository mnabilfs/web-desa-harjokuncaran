import { Home, Users, User, UsersRound, Baby, Info } from "lucide-react";
import Link from "next/link";

export default function DemografiDesaPage() {
  const TOTAL_PENDUDUK = 11311;
  
  const profesiData = [
    { nama: "Petani", jumlah: 3215 },
    { nama: "Peternak", jumlah: 2584 },
    { nama: "Buruh Harian Lepas", jumlah: 2154 },
    { nama: "Pedagang Kelontong", jumlah: 759 },
    { nama: "Buruh Migran", jumlah: 240 },
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Demografi Desa</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0088cc] mb-8">Demografi Desa Harjokuncaran</h1>
        
        {/* 1. Highlight Metrik Kependudukan (Summary Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0088cc] mb-4">
              <Users size={24} />
            </div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Total Penduduk</p>
            <h3 className="text-2xl font-bold text-gray-800">11.311 <span className="text-sm font-normal text-gray-500">Jiwa</span></h3>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <UsersRound size={24} />
            </div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Kepala Keluarga</p>
            <h3 className="text-2xl font-bold text-gray-800">3.501 <span className="text-sm font-normal text-gray-500">KK</span></h3>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <User size={24} />
            </div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Laki-laki</p>
            <h3 className="text-2xl font-bold text-gray-800">5.685 <span className="text-sm font-normal text-gray-500">Jiwa</span></h3>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-4">
              <Baby size={24} />
            </div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Perempuan</p>
            <h3 className="text-2xl font-bold text-gray-800">5.625 <span className="text-sm font-normal text-gray-500">Jiwa</span></h3>
          </div>
        </div>

        {/* Teks Ringkasan Distribusi */}
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg mb-12">
          <p className="text-gray-700 font-medium">
            Penduduk tersebar di 2 Dusun (Krajan dan Mulyosari), 10 RW, dan 35 RT dengan luas wilayah 1.878 Ha.
          </p>
        </div>

        {/* 2. Visualisasi Mata Pencaharian */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mata Pencaharian Utama</h2>
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm mb-12">
          <div className="space-y-6">
            {profesiData.map((profesi, index) => {
              // Menghitung persentase otomatis
              const percentage = ((profesi.jumlah / TOTAL_PENDUDUK) * 100).toFixed(1);
              
              return (
                <div key={index} className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700 text-sm md:text-base">{profesi.nama}</span>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#0088cc]">{profesi.jumlah.toLocaleString('id-ID')} Orang</span>
                      <span className="text-xs text-gray-500 ml-2 font-semibold bg-gray-100 px-2 py-1 rounded">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#0088cc] to-[#00aaff] h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>



      </div>
    </div>
  );
}
