import { createClient } from "@/utils/supabase/server";

export default async function OrganisasiPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('pengaturan_desa').select('value').eq('key', 'struktur_organisasi').single();
  
  const imageUrl = data?.value || "/struktur-organisasi-desa.png";

  return (
    <div className="w-full rounded-md overflow-hidden bg-white min-h-[500px] flex items-center justify-center">
      <img 
        src={imageUrl} 
        alt="Bagan Struktur Organisasi Desa Harjokuncaran" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
