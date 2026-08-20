import Link from "next/link";
import { Calendar, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import NewsSearchBox from "./NewsSearchBox";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

export default async function NewsSidebar() {
  const supabase = await createClient();
  const { data: recentNews } = await supabase.from('berita').select('*').order('date', { ascending: false }).limit(3);

  return (
    <div className="w-full">
      {/* Search Box */}
      <NewsSearchBox />

      {/* Widget Berita Terakhir */}
      <div className="border border-gray-200 bg-white">
        {/* Header Style Taps */}
        <div className="border-t-4 border-t-gray-800 border-b border-b-gray-200">
          <div className="bg-white px-4 py-3 font-bold text-sm text-gray-800 inline-block border-r border-gray-200 border-b border-b-white -mb-px relative top-px">
            BERITA TERAKHIR
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {recentNews && recentNews.length > 0 ? (
            recentNews.map((news) => (
              <div key={news.id} className="flex gap-3">
                <div className="w-16 h-16 shrink-0 bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                  {news.image ? (
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={20} className="text-gray-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <Link href={`/berita/read/${news.slug}/${news.id}`} className="text-[#0088cc] text-sm hover:underline leading-tight mb-1">
                    {news.title.length > 40 ? news.title.substring(0, 40) + "..." : news.title}
                  </Link>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span>{formatToIndonesianDate(news.date)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">Belum ada berita terbaru.</div>
          )}
        </div>
      </div>
    </div>
  );
}
