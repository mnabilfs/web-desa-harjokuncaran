import { Home } from "lucide-react";
import Link from "next/link";

export default function SejarahDesaPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Sejarah Desa</span>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-8">Sejarah Desa</h1>
          
          <h2 className="text-2xl font-light text-gray-800 mb-8 uppercase tracking-wide">
            SEJARAH DESA HARJOKUNCARAN
          </h2>
          
          <div className="text-gray-700 text-[15px] leading-loose text-justify space-y-6">
            <p>
              Tanah Desa Harjokuncaran, semula adalah tanah perkebunan C.O. Telogorejo, yang disekitar tahun 1915 ditanami dengan tanaman kopi, yang disela-selanya ditanami pohon karet. Pada kira-kira tahun 1925 tanaman kopi tersebut dibongkar dan tinggal karetnya saja. Sewaktu Indonesia dibawah kekuasaan penjajahan jepang, yaitu pada tahun 1942, sebagian dari tanaman karet tersebut dirombak oleh pemerintah jepang dan diganti dengan tanaman – tanaman rami, jarak,dan kapas. Pelaksanaan rombakan tersebut dilakukan dengan jalan kerja paksa, yang dijaman penjajahan jepang terkenal dengan istilah kerja <span className="italic">romusa</span>..Pemerintahan jepang di Indonesia tidak berlangsung lama,pada tahun 1945 pemerintahan berpindah ketangan pemerintahan Indonesia. Pada waktu itu, pimpinan perkebunan C.O. Telogorejo dijabat oleh seorang bernama Cipto Utomo . Menginjak tahun 1948 , belanda datang kembali keindonesia yang kedua kalinya (Clash Ke II) Agresi ke II . Untuk mencegah agar belanda jangan sampai menguasai kembali tanah perkebunan tersebut oleh tentara R.I. yang waktu itu terkenal dengan nama tentarah hijrah diusahakan berbagai macam cara ,yang antara lain denan membakar habis (bumi hangus) pabrik serta perumahan para pegawi / pekerjanya , dan akhirnya menginjak pada pohon- pohon karet. Tenaga pelaksana dari bumi hangus tersebut. Terdiri dari orang-orang desa sekitar perkebunan C.O. Telogorejo. Adapun pimpinan tentara hijrah yang melaksanakan bumi hangus tersebut bernama MAGHENDA (Dibuat untuk nama Jalan Raya) sedang camat sumbermanjing wetan waktu itu di jabat oleh <strong>Atmodiwirjo</strong> dan <strong>wedono Turen bernama Akadun</strong>. Menurut keterangan camat <strong>Atmodiwirjo</strong> waktu itu,siapa yang dapat menumbangkan sebatang pohon karet, berarti membunuh seorang tentara belanda. Sedang penduduk yang tidak mau merusak pohon karet waktu itu, dianggap memihak belanda (mata –mata musuh). Bumi hangus selesai dan orang-orang tadinya bekerja sebagai buruh perkebunan dan tinggal di perumahan perkebunan,lalu pindah dan membuat perumahan darurat diladang –ladang hasil penebangan bumi hangus. Status tanah waktu itu oleh <strong>Camat Atmodiwirjo</strong> dinamakan tanah bumi guna usaha menjadi dua belah pihak, yang artinya petani mengerjakan kebun yang tidak terkena bumi hangus. Kedua pihak tidak boleh saling mengganggu. Urusan pemerintahan Desa waktu itu menjadi satu dengan Desa Sumbermanjing Wetan. Untuk melancarkan jalannya pemerintahan, akhirnya pada tahun 1949 diadakan pilihan Kepala Desa, dan berhasil seorang bernama <strong>Notodiharjo</strong> terpilih sebagai Kepala Desa.
            </p>
            <p>
              Pemimpin perkebunan waktu itu dipegang oleh orang bernama <strong>Surjatmodjo</strong> dan <strong>Sujadi</strong>. Sedang untuk memberi nama Desa yang baru itu, diambilkannya dari nama seorang pemimpin perkebunan sebelum <strong>Surijatmodjo</strong>, yaitu yang bernama <strong>Ardjokuntjoro</strong>, <strong>menjadi Harjokuncaran.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
