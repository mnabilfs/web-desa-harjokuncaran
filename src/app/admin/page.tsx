"use client";

import { useState, useEffect } from "react";
import { Activity, Users, FileText, Database, Plus, Newspaper, Scale, Calendar, Image as ImageIcon, Download, LayoutDashboard, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [statsData, setStatsData] = useState({
    berita: 0,
    kunjungan: 0,
    produkHukum: 0,
    status: "Menghubungkan..."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      
      try {
        const [beritaRes, viewsRes, hukumRes] = await Promise.all([
          supabase.from('berita').select('*', { count: 'exact', head: true }),
          supabase.from('page_views').select('view_count'),
          supabase.from('produk_hukum').select('*', { count: 'exact', head: true })
        ]);

        const totalViews = viewsRes.data ? viewsRes.data.reduce((sum, row) => sum + row.view_count, 0) : 0;
        
        setStatsData({
          berita: beritaRes.count || 0,
          kunjungan: totalViews,
          produkHukum: hukumRes.count || 0,
          status: "Terhubung"
        });
      } catch (error) {
        setStatsData(prev => ({ ...prev, status: "Gagal Terhubung" }));
      }
      setLoading(false);
    };
    
    fetchStats();
  }, []);

  const stats = [
    { title: "Total Berita", value: loading ? "..." : statsData.berita, icon: <FileText size={24} className="text-blue-500" /> },
    { title: "Kunjungan Web", value: loading ? "..." : statsData.kunjungan, icon: <Users size={24} className="text-green-500" /> },
    { title: "Produk Hukum", value: loading ? "..." : statsData.produkHukum, icon: <Scale size={24} className="text-purple-500" /> },
    { 
      title: "Status Database", 
      value: statsData.status, 
      icon: <Activity size={24} className={statsData.status === "Terhubung" ? "text-emerald-500 animate-pulse" : "text-amber-500"} /> 
    },
  ];

  const quickActions = [
    { title: "Tulis Berita", desc: "Publikasi kabar terbaru", icon: <Newspaper size={24} />, href: "/admin/informasi/berita", color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" },
    { title: "Agenda Baru", desc: "Jadwalkan kegiatan desa", icon: <Calendar size={24} />, href: "/admin/informasi/agenda", color: "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white" },
    { title: "Unggah Foto", desc: "Tambah galeri visual", icon: <ImageIcon size={24} />, href: "/admin/informasi/galeri", color: "bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white" },
    { title: "Produk Hukum", desc: "Arsipkan perdes/SK", icon: <Scale size={24} />, href: "/admin/produkhukum", color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white" },
    { title: "File Unduhan", desc: "Unggah dokumen publik", icon: <Download size={24} />, href: "/admin/informasi/download", color: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white" },
    { title: "Input APBDesa", desc: "Transparansi anggaran", icon: <Database size={24} />, href: "/admin/informasi/apbdesa", color: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Beranda Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Ringkasan statistik dan akses cepat portal desa</p>
        </div>
        <div className="hidden md:flex bg-white p-2 rounded-lg shadow-sm border border-gray-100 items-center">
          <LayoutDashboard className="text-gray-400 mr-2" size={20} />
          <span className="text-sm font-medium text-gray-600">Administrator Panel</span>
        </div>
      </div>
      
      {/* Statistik Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center space-x-5 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-0.5">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Plus className="mr-2 text-[#0088cc]" size={20} />
            Akses Cepat (Jalan Pintas)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Link 
                key={idx} 
                href={action.href}
                className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className={`p-3 rounded-xl w-fit mb-4 transition-colors duration-300 ${action.color}`}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{action.desc}</p>
                <div className="mt-auto flex items-center text-xs font-bold text-[#0088cc] group-hover:translate-x-1 transition-transform">
                  Kelola <ArrowRight size={14} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Welcome Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0088cc] to-blue-800 rounded-xl shadow-md p-8 text-white h-full relative overflow-hidden flex flex-col justify-center">
            {/* Dekorasi */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 leading-tight">Selamat Datang,<br/>Admin!</h2>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Anda berada di pusat kendali. Segala perubahan yang Anda lakukan pada data Berita, Galeri, Perangkat Desa, maupun APBDesa akan langsung secara *real-time* terlihat oleh seluruh pengunjung website desa.
              </p>
              <div className="inline-flex items-center text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                Sistem Online & Terkoneksi
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
