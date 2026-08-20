import Link from "next/link";
import { Home, Calendar, User, ArrowRight, Image as ImageIcon } from "lucide-react";
import NewsSidebar from "@/components/berita/NewsSidebar";
import { createClient } from "@/utils/supabase/server";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

export const revalidate = 0; // Disable caching to always show latest news

export default async function BeritaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q;

  const supabase = await createClient();
  let query = supabase.from('berita').select('*').order('date', { ascending: false });
  
  if (q) {
    query = query.ilike('title', `%${q}%`);
  }
  
  const { data: newsData } = await query;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Berita</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content (Berita List) */}
          <div className="w-full md:w-3/4">
            <h1 className="text-[28px] font-bold text-[#337ab7] mb-8">Berita</h1>
            
            <div className="flex flex-col gap-10">
              {newsData && newsData.length > 0 ? (
                newsData.map(news => (
                  <div key={news.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-200 pb-8">
                    <div className="w-full md:w-[35%] shrink-0">
                      <div className="border border-gray-200 p-1 bg-gray-50 h-full flex items-center justify-center min-h-[160px]">
                        {news.image ? (
                          <img src={news.image} alt={news.title} className="w-full h-full object-cover aspect-[4/3]" />
                        ) : (
                          <ImageIcon size={48} className="text-gray-300" />
                        )}
                      </div>
                    </div>
                    <div className="w-full md:w-[65%] flex flex-col">
                      <Link href={`/berita/read/${news.slug}/${news.id}`} className="text-[17px] font-bold text-[#0088cc] hover:underline mb-2 uppercase leading-snug">
                        {news.title}
                      </Link>
                      <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                        <div className="flex items-center">
                          <Calendar size={13} className="mr-1" />
                          <span>{formatToIndonesianDate(news.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <User size={13} className="mr-1" />
                          <span>{news.author}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify line-clamp-3">
                        {news.excerpt}
                      </p>
                      <div>
                        <Link href={`/berita/read/${news.slug}/${news.id}`} className="inline-flex items-center bg-[#0088cc] text-white text-[13px] px-3 py-1.5 rounded hover:bg-blue-600 transition-colors font-medium">
                          selengkapnya <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-12 border border-dashed border-gray-300 rounded-lg">
                  Belum ada berita yang dipublikasikan.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <NewsSidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
