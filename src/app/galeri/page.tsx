import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GaleriPage() {
  const galleries = [
    {
      id: 1,
      title: "Panen Raya Kopi Kelompok Tani Harjokuncaran",
      imgUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Kunjungan Camat Sumbermanjing Wetan ke Balai Desa",
      imgUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Pelatihan Digitalisasi BUMDes Harjokuncaran Komando",
      imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Penyaluran Bantuan Sembako untuk Warga Kurang Mampu",
      imgUrl: "https://images.unsplash.com/photo-1593113592332-ca01e630cc67?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="bg-gray-50 border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Informasi</span>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Galeri</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-2">Galeri Desa</h1>
          <p className="text-gray-600">Dokumentasi kegiatan dan momen penting di Desa Harjokuncaran.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleries.map((item) => (
            <div key={item.id} className="relative rounded-lg overflow-hidden group cursor-pointer aspect-square bg-gray-100 border border-gray-200 shadow-sm">
              <Image 
                src={item.imgUrl} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white font-semibold text-xs md:text-sm leading-snug drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
