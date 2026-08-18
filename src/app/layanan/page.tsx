"use client";

import { useState } from "react";
import { Home, Users, FileText, Building, ChevronDown, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

const servicesData = [
  {
    category: "Layanan Administrasi Kependudukan (Adminduk)",
    icon: <Users className="w-6 h-6 text-[#0088cc]" />,
    items: [
      {
        id: "adminduk-1",
        title: "Pengantar Pembuatan / Perubahan Kartu Keluarga (KK)",
        syarat: ["Fotokopi KTP Kepala Keluarga", "Buku Nikah (untuk KK baru)", "Surat Pengantar dari RT/RW"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "adminduk-2",
        title: "Pengantar Perekaman KTP Elektronik (KTP-el) & KIA",
        syarat: ["Fotokopi Kartu Keluarga (KK)", "Akta Kelahiran (untuk KIA)", "Surat Pengantar dari RT/RW"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "adminduk-3",
        title: "Surat Keterangan Pindah / Datang WNI",
        syarat: ["KTP Asli dan Fotokopi", "Kartu Keluarga (KK) Asli", "Surat Pengantar RT/RW", "Alamat Tujuan Kepindahan"],
        waktu: "20 Menit",
        biaya: "Gratis / Rp 0"
      }
    ]
  },
  {
    category: "Layanan Surat Keterangan Umum",
    icon: <FileText className="w-6 h-6 text-[#0088cc]" />,
    items: [
      {
        id: "sku-1",
        title: "Surat Keterangan Usaha (SKU)",
        syarat: ["Fotokopi KTP Pemohon", "Fotokopi Kartu Keluarga (KK)", "Foto Tempat Usaha", "Surat Pengantar dari RT/RW"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "sku-2",
        title: "Surat Keterangan Tidak Mampu (SKTM)",
        syarat: ["Fotokopi KTP dan KK", "Surat Pengantar RT/RW yang ditandatangani", "Foto kondisi rumah (opsional)"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "sku-3",
        title: "Surat Keterangan Domisili",
        syarat: ["Fotokopi KTP Asal", "Surat Pengantar RT/RW Setempat"],
        waktu: "10 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "sku-4",
        title: "Pengantar Surat Keterangan Catatan Kepolisian (SKCK)",
        syarat: ["Fotokopi KTP", "Fotokopi KK", "Surat Pengantar RT/RW"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      }
    ]
  },
  {
    category: "Pencatatan Sipil & Lainnya",
    icon: <Building className="w-6 h-6 text-[#0088cc]" />,
    items: [
      {
        id: "sipil-1",
        title: "Surat Pengantar Kelahiran / Kematian",
        syarat: ["Surat Keterangan dari RS/Bidan (Kelahiran)", "Surat Keterangan Meninggal (Kematian)", "Fotokopi KTP & KK", "Pengantar RT/RW"],
        waktu: "15 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "sipil-2",
        title: "Surat Pengantar Pengurusan Nikah (Form N1 - N4)",
        syarat: ["Fotokopi KTP & KK Calon Suami & Istri", "Pas Foto 3x4", "Surat Pengantar RT/RW", "Surat Pernyataan Belum Pernah Nikah"],
        waktu: "30 Menit",
        biaya: "Gratis / Rp 0"
      },
      {
        id: "sipil-3",
        title: "Pengantar Urusan Pertanahan (PBB/Sertifikat)",
        syarat: ["Fotokopi KTP & KK Pemohon", "Fotokopi SPPT PBB Tahun Terakhir", "Bukti Kepemilikan Tanah / Letter C"],
        waktu: "1 Hari Kerja (Perlu Verifikasi)",
        biaya: "Gratis / Rp 0"
      }
    ]
  }
];

export default function LayananDesaPage() {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200 pt-8 pb-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Layanan</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0088cc] mb-3">
            Layanan Masyarakat Desa Harjokuncaran
          </h1>
          <p className="text-gray-600 text-lg">
            Siapkan persyaratan Anda sebelum datang ke Balai Desa agar pelayanan lebih cepat dan mudah.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="space-y-10">
          {servicesData.map((category, catIdx) => (
            <div key={catIdx}>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3 shadow-sm border border-blue-200">
                  {category.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {category.category}
                </h2>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="cursor-pointer w-full text-left px-5 py-4 flex items-center justify-between bg-white hover:bg-blue-50/50 transition-colors focus:outline-none"
                    >
                      <span className="font-semibold text-gray-800 text-[15px] md:text-base pr-4">
                        {item.title}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                          openAccordions[item.id] ? "rotate-180" : "rotate-0"
                        }`} 
                      />
                    </button>
                    
                    {openAccordions[item.id] && (
                      <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-gray-50/30">
                        <div className="mt-4">
                          <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
                            Persyaratan Pengurusan:
                          </h4>
                          <ul className="space-y-2 mb-5">
                            {item.syarat.map((syaratItem, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle2 size={16} className="text-[#0088cc] mt-0.5 mr-2 shrink-0" />
                                <span className="text-gray-600 text-sm leading-relaxed">{syaratItem}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                            <div className="flex items-center text-sm">
                              <Clock size={16} className="text-orange-500 mr-2" />
                              <span className="text-gray-600">Estimasi Waktu: <strong className="text-gray-800">{item.waktu}</strong></span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center text-sm">
                              <span className="text-gray-600">Biaya: <strong className="text-green-600">{item.biaya}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
