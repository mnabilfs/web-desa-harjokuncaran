"use client";

import { Home, Users, FileText, Building, ChevronRight } from "lucide-react";
import Link from "next/link";

const servicesData = [
  {
    category: "Layanan Administrasi Kependudukan (Adminduk)",
    icon: <Users className="w-6 h-6 text-[#0088cc]" />,
    items: [
      {
        id: "adminduk-1",
        title: "Pengantar Pembuatan / Perubahan Kartu Keluarga (KK)",
      },
      {
        id: "adminduk-2",
        title: "Pengantar Perekaman KTP Elektronik (KTP-el) & KIA",
      },
      {
        id: "adminduk-3",
        title: "Surat Keterangan Pindah / Datang WNI",
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
      },
      {
        id: "sku-2",
        title: "Surat Keterangan Tidak Mampu (SKTM)",
      },
      {
        id: "sku-3",
        title: "Surat Keterangan Domisili",
      },
      {
        id: "sku-4",
        title: "Pengantar Surat Keterangan Catatan Kepolisian (SKCK)",
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
      },
      {
        id: "sipil-2",
        title: "Surat Pengantar Pengurusan Nikah (Form N1 - N4)",
      },
      {
        id: "sipil-3",
        title: "Pengantar Urusan Pertanahan (PBB/Sertifikat)",
      }
    ]
  }
];

export default function LayananDesaPage() {
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
            Berikut adalah daftar layanan administrasi yang dapat Anda urus di Balai Desa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="space-y-8">
          {servicesData.map((category, catIdx) => (
            <div key={catIdx} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="bg-blue-100 p-2 md:p-3 rounded-lg mr-4 shadow-sm border border-blue-200">
                  {category.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {category.category}
                </h2>
              </div>
              
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li 
                    key={item.id} 
                    className="flex items-start text-gray-700 font-medium px-2 group"
                  >
                    <ChevronRight size={20} className="text-[#0088cc] mr-3 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-[15px] md:text-lg">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
