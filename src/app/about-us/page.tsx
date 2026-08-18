import { Home } from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Tentang Kami</span>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-8">Tentang Kami</h1>
          
          <h2 className="text-3xl font-light text-gray-800 mb-6">Desa Harjokuncaran</h2>
          
          <p className="text-gray-600 text-base leading-relaxed">
            Desa Harjokuncaran adalah sebuah desa yang terletak di Kecamatan Sumbermanjing Wetan Kabupaten Malang Provisi Jawa Timur
          </p>
        </div>
      </div>
    </div>
  );
}
