import { Phone, Briefcase, User } from "lucide-react";

export default async function OrganisasiSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const jabatanName = slug.split('-').map(w => w.toUpperCase()).join(' ');

  // Data dinamis tiruan (dummy) untuk kebutuhan UI yang terlihat resmi
  const dataMap: Record<string, { name: string, contact: string, tupoksi: string }> = {
    "kepala-desa": {
      name: "H. Budi Santoso, S.E., M.Si.",
      contact: "0812-3456-7890",
      tupoksi: "Menyelenggarakan pemerintahan desa, melaksanakan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat Desa Harjokuncaran."
    },
    "badan-permusyawaratan-desa": {
      name: "Drs. Ahmad Wijaya",
      contact: "0813-4567-8901",
      tupoksi: "Menampung dan menyalurkan aspirasi masyarakat, serta melakukan pengawasan terhadap kinerja Kepala Desa dalam penyelenggaraan pemerintahan desa."
    },
    "sekretaris-desa": {
      name: "Siti Aminah, S.A.P.",
      contact: "0812-5678-9012",
      tupoksi: "Membantu Kepala Desa dalam bidang administrasi pemerintahan, serta memberikan pelayanan teknis administrasi kepada seluruh perangkat desa dan masyarakat."
    },
    "kaur-pemerintahan": {
      name: "Rudi Hermawan, S.H.",
      contact: "0811-6789-0123",
      tupoksi: "Membantu Kepala Desa dalam pelaksanaan manajemen urusan pemerintahan, pembinaan ketentraman dan ketertiban, urusan kependudukan, sipil, dan pertanahan."
    },
    "kaur-pembangunan": {
      name: "Ir. Hendra Gunawan",
      contact: "0822-7890-1234",
      tupoksi: "Membantu Kepala Desa dalam mengelola administrasi pembangunan, perencanaan kegiatan fisik infrastruktur, dan pemeliharaan sarana prasarana desa."
    },
    "kaur-pemberdayaan-masyarakat": {
      name: "Dwi Wahyuni, S.Pd.",
      contact: "0857-8901-2345",
      tupoksi: "Membantu membina dan memberdayakan masyarakat di bidang ekonomi produktif, UMKM, kegiatan sosial, budaya, pemuda, olahraga, dan Karang Taruna."
    },
    "kaur-kesejahteraan-rakyat": {
      name: "M. Yusuf, S.Sos.",
      contact: "0819-9012-3456",
      tupoksi: "Membantu mengelola pelaksanaan pembinaan keagamaan, kesehatan masyarakat, keluarga berencana, pendidikan, dan penyaluran bantuan sosial (bansos)."
    },
    "kaur-umum": {
      name: "Lina Marlina, A.Md.",
      contact: "0812-0123-4567",
      tupoksi: "Membantu Sekretaris Desa dalam urusan ketatausahaan, pengelolaan arsip surat menyurat, inventarisasi aset desa, perlengkapan, dan kerumahtanggaan desa."
    },
    "kaur-keuangan": {
      name: "Andi Saputra, S.E.",
      contact: "0813-1234-5678",
      tupoksi: "Membantu Sekretaris Desa dalam urusan administrasi keuangan, penyusunan rancangan APBDesa, pembukuan, verifikasi pengeluaran, dan pelaporan keuangan."
    }
  };

  const fallbackData = {
    name: "Menunggu Penunjukan / Plt.",
    contact: "-",
    tupoksi: "Deskripsi tugas untuk jabatan ini belum tersedia atau masih dalam proses pembaruan data sistem."
  };

  const data = dataMap[slug] || fallbackData;

  return (
    <div className="text-gray-700">
      
      {/* Title / Identitas Singkat */}
      <div className="flex items-center mb-8 text-[15px]">
        <span className="font-bold text-gray-700 w-24">Jabatan</span>
        <span className="mx-2">:</span>
        <span className="text-gray-600 font-semibold">{jabatanName}</span>
      </div>
      
      {/* Kartu Profil Resmi */}
      <div className="flex flex-col md:flex-row gap-8 bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
        
        {/* Bagian Foto */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-48 h-64 bg-gray-100 border-2 border-gray-200 rounded overflow-hidden flex flex-col items-center justify-center mb-3 text-gray-300">
            <User size={64} className="mb-2" />
            <span className="text-xs text-gray-400">3 x 4</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">Foto Dinas Resmi</span>
        </div>

        {/* Bagian Biodata & Tupoksi */}
        <div className="w-full md:w-2/3 flex flex-col justify-start pt-2">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{data.name}</h2>
          <p className="text-sm font-bold text-[#0088cc] mb-8 uppercase tracking-wide">{jabatanName}</p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Phone size={20} className="text-[#0088cc] mr-4 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-700 mb-1">Kontak Resmi (WA/Telp)</p>
                <p className="text-gray-600 text-[15px]">{data.contact}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Briefcase size={20} className="text-[#0088cc] mr-4 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">Tugas Pokok & Fungsi (Tupoksi)</p>
                <p className="text-gray-600 text-[15px] leading-relaxed text-justify">
                  {data.tupoksi}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
