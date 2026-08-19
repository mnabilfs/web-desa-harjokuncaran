import Link from "next/link";
import { Search, Calendar } from "lucide-react";
import { newsData } from "@/data/news";

export default function NewsSidebar() {
  const recentNews = newsData.slice(0, 3); // Ambil 3 terbaru

  return (
    <div className="w-full">
      {/* Search Box */}
      <div className="flex mb-8">
        <input 
          type="text" 
          placeholder="Pencarian Berita..." 
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-[#0088cc] text-sm"
        />
        <button className="bg-white border border-l-0 border-gray-300 rounded-r px-4 py-2 hover:bg-gray-50 text-gray-500">
          <Search size={18} />
        </button>
      </div>

      {/* Widget Berita Terakhir */}
      <div className="border border-gray-200 bg-white">
        {/* Header Style Taps */}
        <div className="border-t-4 border-t-gray-800 border-b border-b-gray-200">
          <div className="bg-white px-4 py-3 font-bold text-sm text-gray-800 inline-block border-r border-gray-200 border-b border-b-white -mb-px relative top-px">
            BERITA TERAKHIR
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {recentNews.map((news) => (
            <div key={news.id} className="flex gap-3">
              <div className="w-16 h-16 shrink-0 bg-gray-100 border border-gray-200 overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <Link href={`/berita/read/${news.slug}/${news.id}`} className="text-[#0088cc] text-sm hover:underline leading-tight mb-1">
                  {news.title.length > 40 ? news.title.substring(0, 40) + "..." : news.title}
                </Link>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  <span>{news.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
