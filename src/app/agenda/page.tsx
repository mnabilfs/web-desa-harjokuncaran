import { CalendarDays, Home, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

export const revalidate = 0; // Disable caching

export default async function AgendaPage() {
  const supabase = await createClient();
  // Fetch upcoming agendas (or all agendas sorted by date)
  const { data: agendas } = await supabase
    .from('agenda')
    .select('*')
    .order('date', { ascending: false })
    .order('time', { ascending: false });

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Informasi</span>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Agenda Kegiatan</span>
        </div>

        <div className="w-full">
          <h1 className="text-[28px] font-bold text-[#337ab7] mb-8">Agenda Kegiatan</h1>
          
          <div className="max-w-3xl">
            {(!agendas || agendas.length === 0) ? (
              <div className="text-center p-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                Belum ada agenda kegiatan yang dijadwalkan dalam waktu dekat.
              </div>
        ) : (
          <div className="relative border-l-2 border-[#0088cc] pl-6 md:pl-8 py-2 ml-4 md:ml-6 space-y-10">
            {agendas.map((agenda) => (
              <div key={agenda.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[37px] md:-left-[45px] top-1 bg-white p-1 rounded-full border-2 border-[#0088cc]">
                  <CalendarDays size={18} className="text-[#0088cc]" />
                </div>
                
                {/* Content */}
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center bg-blue-50 text-[#0088cc] text-xs font-bold px-3 py-1.5 rounded-full">
                      <CalendarDays size={14} className="mr-1.5" />
                      {formatToIndonesianDate(agenda.date)}
                    </span>
                    <span className="inline-flex items-center bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">
                      <Clock size={14} className="mr-1.5" />
                      {agenda.time} WIB
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {agenda.event}
                  </h3>
                  
                  <div className="flex items-start text-gray-500 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <MapPin size={16} className="mr-2 shrink-0 text-gray-400 mt-0.5" />
                    <span className="font-medium text-gray-700 leading-snug">{agenda.location}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
