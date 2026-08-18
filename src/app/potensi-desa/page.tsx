import { Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PotensiDesaPage() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Desa Harjokuncaran Penghasil Kopi Berkualitas</span>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#0088cc] mb-8">
            Desa Harjokuncaran Penghasil Kopi Berkualitas
          </h1>
          
          <div className="w-full bg-white">
            <img 
              src="/1632889337_memetik_kopi.jpeg" 
              alt="Warga Harjokuncaran sedang memetik kopi berkualitas" 
              className="w-full h-auto object-cover rounded-sm shadow-sm"
            />
          </div>
          
          {/* Tambahan dummy teks paragraf agar layout tidak kosong jika diperlukan */}
          <div className="mt-8 text-gray-700 leading-relaxed text-justify space-y-4">
            <p>
              Desa Harjokuncaran yang terletak di Kecamatan Sumbermanjing Wetan, Kabupaten Malang, telah lama dikenal sebagai salah satu sentra penghasil biji kopi berkualitas unggul di wilayah Malang Selatan. Letak geografisnya yang berada pada dataran tinggi dengan kondisi tanah yang subur serta iklim yang sejuk, menciptakan ekosistem ideal bagi pertumbuhan tanaman kopi yang sempurna.
            </p>
            <p>
              Mayoritas masyarakat desa menggantungkan roda perekonomiannya pada sektor perkebunan, khususnya budidaya kopi jenis Robusta dan Arabika. Dengan teknik pemetikan "petik merah" (cherry) yang dilakukan secara cermat oleh para petani lokal yang sudah berpengalaman turun-temurun, biji kopi Harjokuncaran memiliki cita rasa dan aroma khas yang sangat diminati oleh para penikmat kopi maupun berbagai kedai kopi (coffee shop) di berbagai daerah.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
}
