"use client";

import { Activity, Users, FileText, Database } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Berita", value: "0", icon: <FileText size={24} className="text-blue-500" /> },
    { title: "Kunjungan Web", value: "0", icon: <Users size={24} className="text-green-500" /> },
    { title: "Produk Hukum", value: "0", icon: <Database size={24} className="text-purple-500" /> },
    { title: "Status Database", value: "Terhubung", icon: <Activity size={24} className="text-emerald-500" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Beranda Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Selamat Datang di Portal Admin</h2>
        <p className="text-gray-600 mb-4">
          Ini adalah pusat kendali (*Control Panel*) resmi untuk website Desa Harjokuncaran. 
          Dari sini Anda dapat mengelola seluruh konten dinamis website seperti menambahkan berita baru,
          mengunggah foto galeri, mengatur agenda kegiatan desa, hingga mengunggah dokumen hukum dan peraturan desa.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-sm text-blue-800 font-medium">
            Tampilan Dashboard (Fase 2) telah siap. Selanjutnya kita akan menghubungkan form input dengan Supabase untuk manajemen konten (Fase 3).
          </p>
        </div>
      </div>
    </div>
  );
}
