import { ChevronRight, Image as ImageIcon, MapPin, CalendarDays } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

export default async function NewsSection() {
  const supabase = await createClient();
  
  // Ambil data secara bersamaan (paralel) untuk mempercepat loading
  const [
    { data: newsList },
    { data: agendaList }
  ] = await Promise.all([
    supabase.from('berita').select('*').order('date', { ascending: false }).limit(2),
    supabase.from('agenda').select('*').order('date', { ascending: false }).limit(4)
  ]);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Berita Terkini */}
          <div className="md:col-span-8">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-2xl text-[#0088cc] flex items-center">
                Berita <span className="font-bold ml-1">Terkini</span>
                <ChevronRight className="w-5 h-5 ml-1 mt-1" />
              </h2>
              <Link href="/berita" className="text-sm text-gray-500 hover:text-[#0088cc]">Lihat Semua</Link>
            </div>
            
            <div className="flex flex-col gap-8">
              {newsList && newsList.length > 0 ? (
                newsList.map((news) => (
                  <div key={news.id} className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-100 border border-gray-200 rounded overflow-hidden shrink-0 flex items-center justify-center min-h-[160px]">
                      {news.image ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${news.image}')` }}
                        ></div>
                      ) : (
                        <ImageIcon size={48} className="text-gray-300" />
                      )}
                      <div className="absolute bottom-0 left-0 bg-[#0088cc] text-white text-xs font-semibold px-3 py-1.5 z-10">
                        {formatToIndonesianDate(news.date)}
                      </div>
                    </div>
                    
                    <div className="sm:w-2/3 flex flex-col justify-center">
                      <Link href={`/berita/read/${news.slug}/${news.id}`} className="text-blue-600 font-bold hover:underline mb-2 leading-tight uppercase line-clamp-2">
                        {news.title}
                      </Link>
                      <p className="text-gray-500 text-sm leading-relaxed mb-2 line-clamp-3">
                        {news.excerpt}
                        <Link href={`/berita/read/${news.slug}/${news.id}`} className="text-blue-500 hover:underline ml-1">Selengkapnya &gt;</Link>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm py-8 text-center border border-dashed border-gray-200 rounded-lg">Belum ada berita diterbitkan.</div>
              )}
            </div>
          </div>

          {/* Agenda */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
                <h2 className="text-2xl text-[#0088cc] flex items-center">
                  Agenda <span className="font-bold ml-1">Kegiatan</span>
                  <ChevronRight className="w-5 h-5 ml-1 mt-1" />
                </h2>
                <Link href="/agenda" className="text-sm text-gray-500 hover:text-[#0088cc]">Lihat Semua</Link>
              </div>
              
              <div className="flex flex-col gap-4">
                {agendaList && agendaList.length > 0 ? (
                  agendaList.map((agenda) => (
                    <div key={agenda.id} className="bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                      <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-[#0088cc] transition-colors mb-2">
                        {agenda.title}
                      </h3>
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarDays className="w-3.5 h-3.5 mr-2 text-[#0088cc]" />
                          <span>{formatToIndonesianDate(agenda.date)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5 mr-2 text-red-500" />
                          <span className="line-clamp-1">{agenda.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm p-4 text-center border border-dashed border-gray-200 rounded-lg">Belum ada agenda kegiatan.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
