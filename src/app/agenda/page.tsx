import { CalendarDays, Home, MapPin } from "lucide-react";
import Link from "next/link";

export default function AgendaPage() {
  const agendas = [
    {
      id: 1,
      date: "20 Agustus 2026, 08.00 WIB",
      event: "Musyawarah Desa (Musdes) Pembahasan RPJMDes",
      location: "Balai Desa Harjokuncaran"
    },
    {
      id: 2,
      date: "22 Agustus 2026, 07.30 WIB",
      event: "Kegiatan Posyandu Balita & Lansia",
      location: "Polindes Dusun Krajan"
    },
    {
      id: 3,
      date: "25 Agustus 2026, 06.00 WIB",
      event: "Kerja Bakti Bersih Desa / Gotong Royong",
      location: "Sepanjang Jalan Utama Dusun Krajan"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="bg-gray-50 border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Informasi</span>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Agenda Kegiatan</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-2">Agenda Kegiatan Desa</h1>
          <p className="text-gray-600">Jadwal acara dan kegiatan penting yang akan dilaksanakan di Desa Harjokuncaran.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl mt-12">
        <div className="relative border-l-2 border-[#0088cc] pl-6 md:pl-8 py-2 ml-4 md:ml-6 space-y-10">
          {agendas.map((agenda) => (
            <div key={agenda.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[45px] top-1 bg-white p-1 rounded-full border-2 border-[#0088cc]">
                <CalendarDays size={18} className="text-[#0088cc]" />
              </div>
              
              {/* Content */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block bg-blue-50 text-[#0088cc] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {agenda.date}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">
                  {agenda.event}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={16} className="mr-1.5 shrink-0" />
                  <span className="italic">{agenda.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
