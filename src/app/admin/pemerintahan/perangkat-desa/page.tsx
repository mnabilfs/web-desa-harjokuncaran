"use client";

import { useState, useEffect } from "react";
import { compressImage } from "@/utils/imageCompressor";
import { createClient } from "@/utils/supabase/client";
import { Edit2, Save, X, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function PerangkatDesaAdmin() {
  const [perangkat, setPerangkat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ nama: "", tupoksi: "" });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [existingFotoUrl, setExistingFotoUrl] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => { fetchPerangkat(); }, []);

  const fetchPerangkat = async () => {
    setLoading(true);
    const { data } = await supabase.from('perangkat_desa').select('*');
    if (data) {
      const orderMap: Record<string, number> = {
        "kepala-desa": 1,
        "sekretaris-desa": 2,
        "kepala-urusan-umum": 3,
        "kepala-urusan-keuangan": 4,
        "kepala-urusan-perencanaan": 5,
        "kepala-seksi-pemerintahan": 6,
        "kepala-seksi-kesejahteraan": 7,
        "kepala-seksi-pelayanan": 8,
        "kepala-dusun-krajan": 9,
        "kepala-dusun-mulyosari": 10
      };

      const sortedData = data.sort((a, b) => {
        const orderA = orderMap[a.slug] || 99;
        const orderB = orderMap[b.slug] || 99;
        return orderA - orderB;
      });

      setPerangkat(sortedData);
    }
    setLoading(false);
  };

  const handleEditClick = (p: any) => {
    setEditingId(p.id);
    const isDefaultNama = p.nama === "Menunggu Penunjukan" || p.nama === "Menunggu Penunjukan / Plt.";
    const isDefaultKontak = p.kontak === "-";
    
    setEditForm({ 
      nama: isDefaultNama ? "" : (p.nama || ""), 
      tupoksi: p.tupoksi || "" 
    });
    setFotoFile(null);
    setExistingFotoUrl(p.foto_url || null);
    setSuccessMsg("");
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string) => {
    setSaving(true);
    
    let finalFotoUrl = existingFotoUrl;

    if (fotoFile) {
        const compressedFile = await compressImage(fotoFile);
        const fileExt = compressedFile.name.split('.').pop();
      const fileName = `perangkat_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('public_assets').upload(fileName, compressedFile);
      
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('public_assets').getPublicUrl(fileName);
        finalFotoUrl = publicUrlData.publicUrl;
      }
    }

    const { error } = await supabase
      .from('perangkat_desa')
      .update({
        nama: editForm.nama,
        tupoksi: editForm.tupoksi,
        foto_url: finalFotoUrl
      })
      .eq('id', id);

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setSuccessMsg("Data berhasil diperbarui!");
      setEditingId(null);
      fetchPerangkat(); // refresh data
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Perangkat Desa</h1>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-700">Jabatan</th>
                <th className="p-4 font-semibold text-gray-700">Nama Pejabat</th>

                <th className="p-4 font-semibold text-gray-700">Tupoksi Singkat</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Foto</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                    Memuat data perangkat desa...
                  </td>
                </tr>
              ) : (
                perangkat.map((p) => {
                  const isEditing = editingId === p.id;
                  
                  // Format Jabatan dari slug
                  const jabatanName = p.slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                  return (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800 whitespace-nowrap">
                        {jabatanName}
                      </td>
                      
                      {isEditing ? (
                        <>
                          <td className="p-4">
                            <input 
                              type="text" 
                              value={editForm.nama} 
                              onChange={e => setEditForm({...editForm, nama: e.target.value})}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:ring-[#0088cc] focus:border-[#0088cc]"
                              placeholder="Nama Pejabat"
                            />
                          </td>

                          <td className="p-4">
                            <textarea 
                              value={editForm.tupoksi} 
                              onChange={e => setEditForm({...editForm, tupoksi: e.target.value})}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:ring-[#0088cc] focus:border-[#0088cc]"
                              placeholder="Tugas dan Fungsi"
                              rows={3}
                            />
                          </td>
                          <td className="p-4 text-center">
                            <input type="file" accept="image/*" onChange={e => setFotoFile(e.target.files?.[0] || null)} className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-black" />
                            {existingFotoUrl && !fotoFile && <span className="text-xs text-green-600 block mt-1">Ada foto</span>}
                          </td>
                          <td className="p-4 text-center whitespace-nowrap">
                            <button 
                              onClick={() => handleSave(p.id)}
                              disabled={saving}
                              className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 mr-2 transition-colors disabled:opacity-50"
                              title="Simpan"
                            >
                              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            </button>
                            <button 
                              onClick={handleCancel}
                              disabled={saving}
                              className="inline-flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
                              title="Batal"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-4 text-gray-700">{p.nama}</td>

                          <td className="p-4 text-gray-600 text-sm max-w-xs line-clamp-3" title={p.tupoksi}>
                            {p.tupoksi}
                          </td>
                          <td className="p-4 text-center">
                            {p.foto_url ? (
                              <img src={p.foto_url} alt="Foto" className="w-12 h-12 rounded object-cover mx-auto" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded mx-auto">
                                Kosong
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleEditClick(p)}
                              className="inline-flex items-center justify-center p-2 bg-blue-100 text-[#0088cc] rounded-md hover:bg-blue-200 transition-colors"
                              title="Edit Data"
                            >
                              <Edit2 size={18} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
