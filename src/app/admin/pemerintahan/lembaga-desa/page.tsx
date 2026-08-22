"use client";

import { useState, useEffect } from "react";
import { compressImage } from "@/utils/imageCompressor";
import { createClient } from "@/utils/supabase/client";
import { Edit2, Save, X, Loader2, CheckCircle2, Plus, Trash2, Image as ImageIcon, ArrowUp, ArrowDown } from "lucide-react";

export default function LembagaDesaAdmin() {
  const [lembaga, setLembaga] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengurusList, setPengurusList] = useState<{nama: string, jabatan: string}[]>([{nama: "", jabatan: "Ketua"}]);
  const [kegiatanList, setKegiatanList] = useState<string[]>([""]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);
  
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  useEffect(() => { fetchLembaga(); }, []);

  const fetchLembaga = async () => {
    setLoading(true);
    const { data } = await supabase.from('lembaga_desa').select('*').order('urutan', { ascending: true }).order('nama', { ascending: true });
    if (data) setLembaga(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setNama(""); setDeskripsi("");
    setPengurusList([{nama: "", jabatan: "Ketua"}]);
    setKegiatanList([""]);
    setLogoFile(null); setExistingLogoUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setNama(item.nama);
    setDeskripsi(item.deskripsi || "");
    
    let parsedPengurus = [{nama: "", jabatan: "Ketua"}];
    if (item.pengurus_inti) {
      try {
        const parsed = JSON.parse(item.pengurus_inti);
        if (Array.isArray(parsed)) parsedPengurus = parsed;
        else parsedPengurus = [{nama: item.pengurus_inti, jabatan: "Ketua"}];
      } catch (e) {
        parsedPengurus = [{nama: item.pengurus_inti, jabatan: "Ketua"}];
      }
    }
    setPengurusList(parsedPengurus);
    
    let parsedKegiatan = [""];
    if (item.kegiatan_utama) {
      try {
        const parsed = JSON.parse(item.kegiatan_utama);
        if (Array.isArray(parsed)) parsedKegiatan = parsed;
        else parsedKegiatan = item.kegiatan_utama.split('\n').filter((k: string) => k.trim() !== '');
      } catch (e) {
        parsedKegiatan = item.kegiatan_utama.split('\n').filter((k: string) => k.trim() !== '');
      }
    }
    if (parsedKegiatan.length === 0) parsedKegiatan = [""];
    setKegiatanList(parsedKegiatan);
    
    setLogoFile(null);
    setExistingLogoUrl(item.logo_url);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if(!window.confirm(`Yakin ingin menghapus lembaga ${name}?`)) return;
    
    setLoading(true);
    await supabase.from('lembaga_desa').delete().eq('id', id);
    setSuccessMsg(`Lembaga ${name} berhasil dihapus.`);
    fetchLembaga();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === lembaga.length - 1) return;

    setLoading(true);
    const newLembaga = [...lembaga];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap array position
    const temp = newLembaga[index];
    newLembaga[index] = newLembaga[targetIndex];
    newLembaga[targetIndex] = temp;

    // Normalisasi ulang semua urutan dari 1 sampai seterusnya
    await Promise.all(
      newLembaga.map((item, i) => 
        supabase.from('lembaga_desa').update({ urutan: i + 1 }).eq('id', item.id)
      )
    );
    
    fetchLembaga();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let finalLogoUrl = existingLogoUrl;

    // Jika ada file logo baru yang diunggah
    if (logoFile) {
        const compressedFile = await compressImage(logoFile);
        const fileExt = compressedFile.name.split('.').pop();
      const fileName = `lembaga_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('public_assets').upload(fileName, compressedFile);
      
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('public_assets').getPublicUrl(fileName);
        finalLogoUrl = publicUrlData.publicUrl;
      }
    }

    const payload = {
      nama,
      deskripsi,
      pengurus_inti: JSON.stringify(pengurusList),
      kegiatan_utama: JSON.stringify(kegiatanList.filter(k => k.trim() !== "")),
      logo_url: finalLogoUrl
    };

    let error = null;
    if (editingId) {
      // Update
      const res = await supabase.from('lembaga_desa').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      // Insert
      const res = await supabase.from('lembaga_desa').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setSuccessMsg("Data Lembaga berhasil disimpan!");
      setIsModalOpen(false);
      fetchLembaga();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Lembaga Desa</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Lembaga</span>
        </button>
      </div>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {successMsg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12 text-gray-500">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : lembaga.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500">
          Belum ada data Lembaga Desa. Silakan klik tombol "Tambah Lembaga".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lembaga.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                    {item.logo_url ? (
                      <img src={item.logo_url} alt={item.nama} className="w-full h-full object-contain p-1" />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleMoveOrder(index, 'up')} disabled={index === 0} className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-30"><ArrowUp size={16} /></button>
                    <button onClick={() => handleMoveOrder(index, 'down')} disabled={index === lembaga.length - 1} className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-30"><ArrowDown size={16} /></button>
                    <button onClick={() => openEditModal(item)} className="p-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item.id, item.nama)} className="p-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.nama}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.deskripsi}</p>
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <div className="mb-2">
                    <strong>Pengurus:</strong>
                    <div className="text-gray-700 mt-1 space-y-1">
                      {(() => {
                        try {
                          const parsed = JSON.parse(item.pengurus_inti || "[]");
                          if (Array.isArray(parsed) && parsed.length > 0) {
                            return parsed.map((p: any, i: number) => (
                              <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                                <span>{p.nama}</span>
                                <span className="text-[#0088cc] font-medium">{p.jabatan}</span>
                              </div>
                            ));
                          }
                        } catch (e) {
                          return <div>{item.pengurus_inti || "-"}</div>;
                        }
                        return <div>-</div>;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Lembaga Desa" : "Tambah Lembaga Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lembaga *</label>
                <input required type="text" value={nama} onChange={e => setNama(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Karang Taruna, BPD, PKK" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Lembaga (Opsional)</label>
                <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-black" />
                {existingLogoUrl && !logoFile && <p className="text-xs text-green-600 mt-1">Logo saat ini sudah tersimpan.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Jelaskan peran lembaga ini..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pengurus Inti</label>
                <div className="space-y-3">
                  {pengurusList.map((pengurus, idx) => (
                    <div key={idx} className="flex space-x-2 items-center">
                      <input 
                        type="text" 
                        value={pengurus.nama} 
                        onChange={(e) => {
                          const newList = [...pengurusList];
                          newList[idx].nama = e.target.value;
                          setPengurusList(newList);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" 
                        placeholder="Nama Pengurus" 
                      />
                      <select 
                        value={pengurus.jabatan}
                        onChange={(e) => {
                          const newList = [...pengurusList];
                          newList[idx].jabatan = e.target.value;
                          setPengurusList(newList);
                        }}
                        className="w-1/3 border border-gray-300 rounded-lg px-3 py-2 text-black focus:ring-[#0088cc] focus:border-[#0088cc]"
                      >
                        <option value="Ketua">Ketua</option>
                        <option value="Wakil Ketua">Wakil Ketua</option>
                        <option value="Sekretaris">Sekretaris</option>
                        <option value="Bendahara">Bendahara</option>
                        <option value="Anggota">Anggota</option>
                      </select>
                      {pengurusList.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newList = pengurusList.filter((_, i) => i !== idx);
                            setPengurusList(newList);
                          }}
                          className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={() => setPengurusList([...pengurusList, {nama: "", jabatan: "Anggota"}])}
                  className="mt-3 text-sm flex items-center text-[#0088cc] hover:text-blue-700 font-medium"
                >
                  <Plus size={16} className="mr-1" /> Tambah Anggota
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Kegiatan Utama (Opsional)</label>
                <div className="space-y-3">
                  {kegiatanList.map((kegiatan, idx) => (
                    <div key={idx} className="flex space-x-2 items-center">
                      <input 
                        type="text" 
                        value={kegiatan} 
                        onChange={(e) => {
                          const newList = [...kegiatanList];
                          newList[idx] = e.target.value;
                          setKegiatanList(newList);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" 
                        placeholder="Contoh: Posyandu Balita" 
                      />
                      {kegiatanList.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newList = kegiatanList.filter((_, i) => i !== idx);
                            setKegiatanList(newList);
                          }}
                          className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={() => setKegiatanList([...kegiatanList, ""])}
                  className="mt-3 text-sm flex items-center text-[#0088cc] hover:text-blue-700 font-medium"
                >
                  <Plus size={16} className="mr-1" /> Tambah Kegiatan
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex items-center space-x-2 px-5 py-2 text-white bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-400 rounded-lg font-medium transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>{saving ? "Menyimpan..." : "Simpan Data"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
