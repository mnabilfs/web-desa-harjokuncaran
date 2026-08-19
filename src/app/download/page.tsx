import { Download, FileText, Home } from "lucide-react";
import Link from "next/link";

export default function DownloadPage() {
  const documents = [
    {
      id: 1,
      name: "Peraturan Desa (Perdes) No. 01 Tahun 2026 tentang Pungutan Desa",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Formulir Standar Keterangan Domisili Usaha (SKDU)",
      type: "DOCX",
      size: "150 KB"
    },
    {
      id: 3,
      name: "Laporan Penyelenggaraan Pemerintahan Desa (LPPD) 2025",
      type: "PDF",
      size: "4.1 MB"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#0088cc] flex items-center">
              <Home size={16} className="text-[#0088cc]" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Informasi</span>
            <span className="mx-2">/</span>
            <span className="text-gray-500 font-semibold">Download</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-2">Pusat Unduhan</h1>
          <p className="text-gray-600">Akses dokumen publik, formulir, dan laporan resmi Desa Harjokuncaran secara langsung.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="flex flex-col gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-red-50 text-red-500 p-3 rounded-lg shrink-0">
                  <FileText size={28} />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1 leading-tight">{doc.name}</h2>
                  <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{doc.type}</span>
                    <span className="text-gray-500">{doc.size}</span>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold py-2.5 px-5 rounded hover:bg-blue-600 transition-colors shrink-0">
                <Download size={18} />
                Unduh Dokumen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
