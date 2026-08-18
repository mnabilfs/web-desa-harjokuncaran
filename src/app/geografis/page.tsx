import { Home } from "lucide-react";
import Link from "next/link";

export default function GeografisDesaPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Geografis Desa</span>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-8">Geografis Desa</h1>
          
          <div className="text-gray-700 text-[15px] leading-relaxed space-y-6">
            <p>
              Desa Harjokuncaran Kecamatan Sumbermanjing Wetan Kabupaten Malang merupakan bagian integral dari sistem perwilayahan Kecamatan Sumbermanjing Wetan.
            </p>
            
            <div>
              <p className="mb-4">Batas-batas Desa Harjokuncaran :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <div className="inline-flex">
                    <span className="w-32">Sebelah Utara</span>
                    <span>: Desa Sumbermanjing</span>
                  </div>
                </li>
                <li>
                  <div className="inline-flex">
                    <span className="w-32">Sebelah Selatan</span>
                    <span>: Desa Argotirto</span>
                  </div>
                </li>
                <li>
                  <div className="inline-flex">
                    <span className="w-32">Sebelah timur</span>
                    <span>: Desa Klepu dan Desa Ringinkembar</span>
                  </div>
                </li>
                <li>
                  <div className="inline-flex">
                    <span className="w-32">Sebelah Barat</span>
                    <span>: Desa Sumbermanjing Wetan dan Desa Ringinsari</span>
                  </div>
                </li>
              </ul>
            </div>

            <p>
              Secara geografis Wilayah Desa Harjokuncaran terletak pada wilayah dataran tinggi antara 750 m diatas permukaan laut, dengan luas 5 km2 atau 1878 ha. Berdasarkan data BPS Kabupaten Malang, curah hujan di Desa Harjokuncaran rata-rata mencapai 2.400 mm. Curah hujan terbanyak terjadi pada bulan Januari hingga mencapai 405,04 mm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
