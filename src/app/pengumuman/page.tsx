import { Bell, Calendar, Home } from "lucide-react";
import Link from "next/link";

export default function PengumumanPage() {
  const announcements = [
    {
      id: 1,
      title: "Penyaluran BLT Dana Desa Tahap III",
      date: "15 Agustus 2026",
      desc: "Diberitahukan kepada Keluarga Penerima Manfaat (KPM), penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap III akan dilaksanakan di Balai Desa Harjokuncaran. Wajib membawa fotokopi KK dan KTP asli."
    },
    {
      id: 2,
      title: "Perekaman KTP-el Massal (Plat N)",
      date: "10 Agustus 2026",
      desc: "Bekerja sama dengan Dispendukcapil Kab. Malang, akan diadakan pelayanan kilat administrasi kependudukan (KTP-el dan KIA) bagi warga yang belum memiliki identitas resmi."
    },
    {
      id: 3,
      title: "Pemberitahuan Pemadaman Listrik Bergilir",
      date: "05 Agustus 2026",
      desc: "Sehubungan dengan pemeliharaan jaringan oleh PLN ULP Sumbermanjing Wetan, akan terjadi pemadaman listrik sementara di wilayah Dusun Krajan dari pukul 09.00 - 14.00 WIB."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Informasi</span>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Pengumuman</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-2">Pengumuman Desa</h1>
          <p className="text-gray-600">Informasi penting dan pemberitahuan resmi terbaru untuk warga Harjokuncaran.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="flex flex-col gap-6">
          {announcements.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 text-[#0088cc] p-3 rounded-full w-fit shrink-0 mt-1">
                <Bell size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h2>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Calendar size={13} className="mr-1.5" />
                  <span>{item.date}</span>
                </div>
                <p className="text-gray-600 text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
