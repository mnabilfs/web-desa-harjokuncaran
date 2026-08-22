"use client";

import { Download, FileText, Home, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function DownloadPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data } = await supabase
        .from('download')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data) {
        setDocuments(data);
      }
      setLoading(false);
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
          <span className="text-gray-500">Download</span>
        </div>

        <div className="w-full">
          <h1 className="text-[28px] font-bold text-[#337ab7] mb-8">Download</h1>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        
        {/* Search Bar Section */}
        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Cari dokumen berdasarkan judul..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-800 shadow-sm focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-pulse flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-gray-300 mb-4" />
              <p>Memuat dokumen...</p>
            </div>
          </div>
        ) : (!filteredDocuments || filteredDocuments.length === 0) ? (
          <div className="text-center p-12 bg-white border border-gray-200 rounded-xl text-gray-500 shadow-sm flex flex-col items-center justify-center">
            <FileText size={48} className="text-gray-300 mb-4" />
            <p className="font-medium text-lg">
              {searchKeyword ? "Tidak ada dokumen yang cocok dengan kata kunci pencarian Anda." : "Belum ada dokumen yang tersedia untuk diunduh."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col relative overflow-hidden">
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-red-500 shadow-sm border border-red-100/50">
                    <FileText size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                    {doc.file_type}
                  </span>
                </div>
                
                <div className="relative z-10 flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-3 group-hover:text-[#0088cc] transition-colors">{doc.title}</h2>
                  <p className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {doc.file_size}
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto pt-4 border-t border-gray-100">
                  <a 
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full text-[#0088cc] font-semibold group/btn hover:text-blue-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Download size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      Unduh File
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover/btn:bg-[#0088cc] group-hover/btn:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </a>
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
