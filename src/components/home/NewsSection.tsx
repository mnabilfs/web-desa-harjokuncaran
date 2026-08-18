import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewsSection() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Berita Terkini */}
          <div className="md:col-span-8">
            <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Berita <span className="font-bold ml-1">Terkini</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Berita Image Placeholder */}
              <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-200 rounded overflow-hidden shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                ></div>
                <div className="absolute bottom-0 left-0 bg-[#0088cc] text-white text-xs font-semibold px-3 py-1.5">
                  Jun 29, 2022
                </div>
              </div>
              
              <div className="sm:w-2/3 flex flex-col justify-center">
                <Link href="#" className="text-blue-600 font-bold hover:underline mb-2 leading-tight">
                  PEMBANGUNAN DRAINASE DI DUSUN KRAJAN
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  Pembangunan drainase di Dusun Krajan RT.21 RW.07 Desa Harjokuncaran telah dimulai. Pembangunan ini merupakan wujud dari usulan warga dimana pada lokasi tersebut pada saat musim hujan air meluap ke jalan dikarenakan drainase yang sempit dan dangkal. 
                  <Link href="#" className="text-blue-500 hover:underline ml-1">Selengkapnya &gt;</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Pengumuman & Agenda */}
          <div className="md:col-span-4 space-y-8">
            {/* Pengumuman */}
            <div>
              <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
                <h2 className="text-2xl text-[#0088cc] flex items-center">
                  Pengumuman
                  <ChevronRight className="w-5 h-5 ml-1 mt-1" />
                </h2>
              </div>
              <p className="text-gray-500 text-sm">Tidak ada data yang ditampilkan</p>
            </div>

            {/* Agenda */}
            <div>
              <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
                <h2 className="text-2xl text-[#0088cc] flex items-center">
                  Agenda <span className="font-bold ml-1">Kegiatan</span>
                  <ChevronRight className="w-5 h-5 ml-1 mt-1" />
                </h2>
              </div>
              <p className="text-gray-500 text-sm">Tidak ada data yang ditampilkan</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
