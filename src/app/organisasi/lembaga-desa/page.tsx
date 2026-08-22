"use client";

import { useState, useEffect } from "react";
import { Users, Building, ChevronRight, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LembagaDesaPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [lembaga, setLembaga] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLembaga = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('lembaga_desa').select('*').order('urutan', { ascending: true }).order('nama', { ascending: true });
      if (data) setLembaga(data);
      setLoading(false);
    };
    fetchLembaga();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Memuat data lembaga desa...</div>;
  }

  if (lembaga.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">Belum ada data lembaga desa yang dipublikasikan.</div>;
  }

  const activeLembaga = lembaga[activeTab];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar List */}
      <div className="lg:w-1/3 space-y-2">
        {lembaga.map((item, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center justify-between transition-all duration-200 ${
                isActive 
                  ? "bg-[#0088cc] text-white shadow-md transform scale-[1.02]" 
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-100 shadow-sm"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold">{item.nama}</span>
              </div>
              <ChevronRight size={18} className={isActive ? "text-white" : "text-gray-400"} />
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="lg:w-2/3">
        {activeLembaga && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-200 shadow-inner overflow-hidden p-2">
                {activeLembaga.logo_url ? (
                  <img src={activeLembaga.logo_url} alt={activeLembaga.nama} className="w-full h-full object-contain" />
                ) : (
                  <Building size={48} className="text-[#0088cc] opacity-80" />
                )}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">{activeLembaga.nama}</h2>
                <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
                  Mitra Pemerintahan Desa
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-8">
              {/* Profil Singkat */}
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-[#0088cc] rounded-lg flex items-center justify-center mr-3">1</span>
                  Profil Singkat
                </h3>
                <p className="text-gray-600 leading-relaxed text-justify bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {activeLembaga.deskripsi || "Belum ada deskripsi."}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kepengurusan */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-[#0088cc] rounded-lg flex items-center justify-center mr-3">2</span>
                    Pengurus Inti
                  </h3>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-start space-x-3 mb-1">
                        <Users className="text-[#0088cc] mt-1 shrink-0" size={20} />
                        <div className="w-full">
                          {(() => {
                            if (!activeLembaga.pengurus_inti) return <span className="text-gray-500">Belum ada data pengurus.</span>;
                            
                            try {
                              const parsed = JSON.parse(activeLembaga.pengurus_inti);
                              if (Array.isArray(parsed) && parsed.length > 0) {
                                return (
                                  <div className="space-y-2 w-full mt-1">
                                    {parsed.map((p: any, idx: number) => (
                                      <div key={idx} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                        <span className="font-semibold text-gray-800">{p.nama}</span>
                                        <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-[#0088cc] rounded-full uppercase tracking-wider">{p.jabatan}</span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                            } catch (e) {
                              return <span className="font-medium text-gray-800 whitespace-pre-line leading-relaxed">{activeLembaga.pengurus_inti}</span>;
                            }
                            return <span className="text-gray-500">Belum ada data pengurus.</span>;
                          })()}
                        </div>
                      </div>
                    </div>
                </section>

                {/* Kegiatan Utama */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-[#0088cc] rounded-lg flex items-center justify-center mr-3">3</span>
                    Kegiatan Utama
                  </h3>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    {(() => {
                      if (!activeLembaga.kegiatan_utama) return <p className="text-gray-600 font-medium">Belum ada data kegiatan.</p>;
                      
                      try {
                        const parsed = JSON.parse(activeLembaga.kegiatan_utama);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                          return (
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed text-justify">
                              {parsed.map((k: string, idx: number) => (
                                <li key={idx}>{k}</li>
                              ))}
                            </ul>
                          );
                        }
                      } catch (e) {
                        return (
                          <p className="text-gray-600 font-medium whitespace-pre-line leading-relaxed text-justify">
                            {activeLembaga.kegiatan_utama}
                          </p>
                        );
                      }
                      return <p className="text-gray-600 font-medium">Belum ada data kegiatan.</p>;
                    })()}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
