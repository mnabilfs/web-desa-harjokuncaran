import { Phone, Briefcase, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function OrganisasiSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const jabatanNameTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Fetch dari Supabase Server
  const supabase = await createClient();
  const { data } = await supabase.from('perangkat_desa').select('*').eq('slug', slug).single();

  const name = data?.nama || "Menunggu Penunjukan / Plt.";
  const contact = data?.kontak || "-";
  const tupoksi = data?.tupoksi || "Deskripsi tugas untuk jabatan ini belum tersedia atau masih dalam proses pembaruan data sistem.";
  const foto_url = data?.foto_url || null;

  return (
    <div className="text-gray-700">
      <h1 className="text-3xl font-extrabold text-[#0088cc] mb-8 pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
        {jabatanNameTitle}
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-max">
          Pemerintahan Desa
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-[#0088cc] to-[#00aaff] rounded-xl p-6 text-white text-center shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 border-4 border-white/30 overflow-hidden">
              {foto_url ? (
                <img src={foto_url} alt={name} className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-white" />
              )}
            </div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-blue-100 text-sm font-medium mb-4">{jabatanNameTitle}</p>
            
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center space-x-2 backdrop-blur-sm">
              <Phone size={16} />
              <span className="text-sm font-semibold">{contact}</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-[#0088cc]">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Tugas Pokok & Fungsi (Tupoksi)</h2>
            </div>
            
            <div className="prose max-w-none text-gray-600 leading-relaxed text-justify">
              {tupoksi.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
