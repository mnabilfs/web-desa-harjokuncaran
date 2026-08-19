import { BarChart3, Home, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function APBDesaPage() {
  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Informasi</span>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Transparansi APBDesa</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-2">Transparansi APBDesa</h1>
          <p className="text-gray-600">Ringkasan Anggaran Pendapatan dan Belanja Desa (APBDesa) Harjokuncaran Tahun Anggaran 2026.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        
        {/* Ringkasan Anggaran (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pendapatan */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-1">Total Pendapatan Desa</h3>
            <p className="text-2xl font-extrabold text-green-800">Rp 1.450.000.000</p>
          </div>

          {/* Belanja */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <div className="bg-red-100 text-red-500 p-3 rounded-full mb-3">
              <TrendingDown size={28} />
            </div>
            <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">Total Belanja Desa</h3>
            <p className="text-2xl font-extrabold text-red-800">Rp 1.380.000.000</p>
          </div>

          {/* Pembiayaan */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
              <Wallet size={28} />
            </div>
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">Pembiayaan Netto</h3>
            <p className="text-2xl font-extrabold text-blue-800">Rp 70.000.000</p>
          </div>
        </div>

        {/* Infografis Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-[#0088cc]" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Infografis Detail APBDesa 2026</h2>
          </div>
          
          {/* Placeholder for actual Infographic Image */}
          <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] flex flex-col items-center justify-center p-8 text-center text-gray-400">
            {/* 
              Di sini Anda bisa mengganti dengan komponen Image sungguhan:
              <Image src="/baliho-apbdes-2026.jpg" alt="Infografis APBDes 2026" width={1200} height={800} className="w-full rounded" />
            */}
            <Image 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
              alt="Placeholder Infografis" 
              width={800} 
              height={400} 
              className="w-full object-cover rounded-md opacity-50 grayscale mb-4 max-h-[300px]" 
            />
            <p className="font-semibold text-gray-500">Area Pemasangan Infografis Baliho APBDesa</p>
            <p className="text-sm mt-2 max-w-md mx-auto">Upload dan gantikan gambar placeholder ini dengan file grafis resmi laporan APBDes dari Desa Harjokuncaran.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
