"use client";

import { useState } from "react";
import { Users, Shield, Building, Home, Target, Heart, Briefcase, ChevronRight } from "lucide-react";

export default function LembagaDesaPage() {
  const [activeTab, setActiveTab] = useState(0);

  const lembaga = [
    {
      id: "bpd",
      name: "BPD",
      fullName: "Badan Permusyawaratan Desa",
      desc: "BPD merupakan 'parlemen' tingkat desa yang berfungsi membahas dan menyepakati Rancangan Peraturan Desa bersama Kepala Desa, menampung dan menyalurkan aspirasi masyarakat desa, serta melakukan pengawasan terhadap kinerja Kepala Desa.",
      icon: <Building className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Bpk. Sutrisno, M.Pd.",
      kegiatan: "Musyawarah Desa (Musdes), Pengawasan APBDesa, Jaring Aspirasi Warga."
    },
    {
      id: "lpmd",
      name: "LPMD",
      fullName: "Lembaga Pemberdayaan Masyarakat Desa",
      desc: "Wadah yang dibentuk atas prakarsa masyarakat untuk membantu Pemerintah Desa dalam merencanakan, melaksanakan, dan mengendalikan pembangunan desa secara partisipatif.",
      icon: <Briefcase className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Bpk. Haryono, S.T.",
      kegiatan: "Gotong Royong Pembangunan Fisik, Pelatihan Keterampilan, Evaluasi Pembangunan."
    },
    {
      id: "pkk",
      name: "PKK",
      fullName: "Pemberdayaan Kesejahteraan Keluarga",
      desc: "Gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah, dengan wanita sebagai motor penggeraknya, bertujuan membangun keluarga yang sejahtera.",
      icon: <Heart className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Ibu Hj. Siti Rahmawati",
      kegiatan: "Posyandu, Penyuluhan Kesehatan Ibu & Anak, Pelatihan Ekonomi Kreatif."
    },
    {
      id: "karang-taruna",
      name: "Karang Taruna",
      fullName: "Organisasi Kepemudaan Desa",
      desc: "Organisasi sosial kepemudaan yang berfungsi sebagai wadah pembinaan dan pengembangan generasi muda desa di bidang usaha kesejahteraan sosial, olahraga, dan seni.",
      icon: <Target className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Sdr. Wahyu Pratama",
      kegiatan: "Turnamen Olahraga Antar Dusun, Pentas Seni, Kegiatan Bakti Sosial Pemuda."
    },
    {
      id: "bumdes",
      name: "BUMDes",
      fullName: "Badan Usaha Milik Desa",
      desc: "Lembaga usaha desa yang dikelola oleh masyarakat dan pemerintahan desa dalam upaya memperkuat perekonomian desa dan membangun kerekatan sosial masyarakat.",
      icon: <Briefcase className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Bpk. Irwan Syah",
      kegiatan: "Pengelolaan Pasar Desa, Simpan Pinjam, Unit Usaha Pariwisata & Pertanian."
    },
    {
      id: "linmas",
      name: "Linmas",
      fullName: "Perlindungan Masyarakat (Hansip)",
      desc: "Warga masyarakat yang disiapkan dan dibekali pengetahuan serta keterampilan untuk melaksanakan kegiatan penanganan bencana, memelihara keamanan, ketentraman dan ketertiban masyarakat.",
      icon: <Shield className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Bpk. Ngatimin",
      kegiatan: "Pengamanan Pemilu/Pilkades, Ronda Malam, Evakuasi Bencana Alam."
    },
    {
      id: "rtrw",
      name: "RT / RW",
      fullName: "Rukun Tetangga / Rukun Warga",
      desc: "Lembaga kemasyarakatan yang bertugas memelihara dan melestarikan nilai-nilai kehidupan masyarakat yang berdasarkan kegotongroyongan dan kekeluargaan.",
      icon: <Home className="w-8 h-8 text-[#0088cc]" />,
      ketua: "Para Ketua RT & RW se-Desa",
      kegiatan: "Administrasi Kependudukan Tingkat Bawah, Kerja Bakti Lingkungan, Mediasi Warga."
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center mb-8 text-[15px]">
        <span className="font-bold text-gray-700 w-32">Kategori Menu</span>
        <span className="mx-2 font-semibold text-gray-600">:</span>
        <span className="text-gray-600 font-semibold uppercase">Lembaga Desa</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Navigation (Sidebar for Tabs) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
          {lembaga.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer flex items-center justify-between text-left w-full px-5 py-4 rounded-lg font-bold transition-all border ${
                activeTab === index 
                  ? "bg-[#0088cc] text-white border-[#0088cc] shadow-md transform scale-[1.02]" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#0088cc] hover:text-[#0088cc] hover:shadow-sm"
              }`}
            >
              <span>{item.name}</span>
              <ChevronRight size={18} className={`transition-transform ${activeTab === index ? "translate-x-1" : ""}`} />
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm min-h-[400px]">
            
            <div className="flex items-center border-b border-gray-100 pb-6 mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                {lembaga[activeTab].icon}
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-extrabold text-gray-800">{lembaga[activeTab].name}</h2>
                <p className="text-[#0088cc] font-semibold text-sm uppercase tracking-wider">{lembaga[activeTab].fullName}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wider">Profil Singkat</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {lembaga[activeTab].desc}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-1 tracking-wider">Pengurus Inti (Ketua)</h3>
                    <p className="text-gray-800 font-semibold flex items-center">
                      <Users size={16} className="mr-2 text-[#0088cc]" />
                      {lembaga[activeTab].ketua}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wider">Kegiatan Utama</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {lembaga[activeTab].kegiatan.split(',').map((kegiatan, i) => (
                    <li key={i}>{kegiatan.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
