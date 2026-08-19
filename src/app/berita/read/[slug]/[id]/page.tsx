import Link from "next/link";
import { Home, Calendar, User } from "lucide-react";
import NewsSidebar from "@/components/berita/NewsSidebar";
import { newsData } from "@/data/news";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string, id: string }> }) {
  const resolvedParams = await params;
  const news = newsData.find(n => n.id === resolvedParams.id);
  
  if (!news) {
    return <div className="p-8 text-center">Berita tidak ditemukan</div>;
  }

  // Format breadcrumb text agar jika kepanjangan ditambahkan elipsis
  const shortTitle = news.title.length > 35 ? news.title.substring(0, 35) + "..." : news.title;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8 overflow-hidden whitespace-nowrap">
          <Link href="/" className="hover:text-[#0088cc] flex items-center shrink-0">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2 shrink-0">/</span>
          <Link href="/berita" className="hover:text-[#0088cc] shrink-0 text-[#0088cc]">Berita</Link>
          <span className="mx-2 shrink-0">/</span>
          <span className="text-gray-500 truncate" title={news.title}>{shortTitle}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <h1 className="text-[26px] font-bold text-[#0088cc] mb-3 uppercase leading-snug">
              {news.title}
            </h1>
            
            <div className="flex items-center text-xs text-gray-500 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={13} className="mr-1" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center">
                <User size={13} className="mr-1" />
                <span>{news.author}</span>
              </div>
            </div>

            <div className="mb-6">
              <img src={news.image} alt={news.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>

            <div className="text-gray-700 leading-relaxed text-justify text-[15px] space-y-4">
              <p>{news.content}</p>
            </div>

            {/* Social Share Buttons */}
            <div className="flex gap-2 mt-12 pt-6">
              <button className="bg-[#3b5998] text-white p-2 rounded hover:opacity-90 flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </button>
              <button className="bg-black text-white p-2 rounded hover:opacity-90 flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="bg-[#25D366] text-white p-2 rounded hover:opacity-90 flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </button>
              <button className="bg-[#00B900] text-white p-2 rounded hover:opacity-90 flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.844 8.871 9.178 9.619.358.077.852.235.975.545.111.278.072.716.035.996l-.189 1.139c-.049.296-.233 1.144 1.002.625 1.236-.52 6.666-3.921 9.213-6.818 2.463-2.793 3.786-4.321 3.786-6.106zm-16.143-1.142c0-.524.425-.949.949-.949h4.372c.524 0 .949.425.949.949 0 .524-.425.949-.949.949h-3.423v1.396h2.247c.524 0 .949.425.949.949 0 .524-.425.949-.949.949h-2.247v2.391c0 .524-.425.949-.949.949-.524 0-.949-.425-.949-.949v-6.584zm11.782 5.635h-.006c-.035.059-.089.112-.152.152-.162.106-.395.106-.557 0-.063-.04-.117-.093-.152-.152l-2.022-3.136v2.187c0 .524-.425.949-.949.949-.524 0-.949-.425-.949-.949v-6.584c0-.524.425-.949.949-.949.524 0 .949.425.949.949v2.186l2.022-3.136c.035-.059.089-.112.152-.152.162-.106.395-.106.557 0 .063.04.117.093.152.152.106.162.106.395 0 .557l-1.895 2.943 1.895 2.943c.106.162.106.395 0 .557h.006z"/></svg>
              </button>
              <button className="bg-[#0088cc] text-white p-2 rounded hover:opacity-90 flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.905-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </button>
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
