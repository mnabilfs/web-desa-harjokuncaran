"use client";

import { useState, useEffect } from "react";
import { compressImage } from "@/utils/imageCompressor";
import { createClient } from "@/utils/supabase/client";
import { Save, X, Loader2, CheckCircle2, Plus, Trash2, Edit2, Image as ImageIcon, Search, BarChart3 } from "lucide-react";
import Image from "next/image";

// Helper for Rupiah formatting
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function APBDesaAdmin() {
  const [apbdesaList, setApbdesaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [tahun, setTahun] = useState("");
  const [pendapatan, setPendapatan] = useState("");
  const [belanja, setBelanja] = useState("");
  const [pembiayaan, setPembiayaan] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  useEffect(() => { 
    const timeout = setTimeout(() => {
      fetchApbdesa(); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  const fetchApbdesa = async () => {
    setLoading(true);
    let query = supabase.from('apbdesa').select('*').order('tahun', { ascending: false });
    
    if (searchKeyword) {
      query = query.ilike('tahun', `%${searchKeyword}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching APBDesa:", error);
    }
    if (data) setApbdesaList(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTahun("");
    setPendapatan("");
    setBelanja("");
    setPembiayaan("");
    setFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setTahun(item.tahun || "");
    setPendapatan(item.pendapatan?.toString() || "");
    setBelanja(item.belanja?.toString() || "");
    setPembiayaan(item.pembiayaan?.toString() || "");
    setFile(null);
    setPreviewUrl(item.image_url);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDelete = async (id: string, imgUrl: string, tahunItem: string) => {
    if(!window.confirm(`Yakin ingin menghapus laporan APBDesa Tahun "${tahunItem}"?`)) return;
    
    setLoading(true);
    // 1. Delete from database
    await supabase.from('apbdesa').delete().eq('id', id);
    
    // 2. Try to delete from storage
    try {
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('public_assets').remove([fileName]);
      }
    } catch (err) {
      console.error("Gagal menghapus file gambar di storage", err);
    }

    setSuccessMsg(`Laporan APBDesa Tahun ${tahunItem} berhasil dihapus.`);
    fetchApbdesa();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !editingId) {
      alert("Pilih gambar infografis terlebih dahulu!");
      return;
    }

    setSaving(true);
    let imageUrl = previewUrl;
    
    // Upload image if a new file is selected
    if (file) {
      const compressedFile = await compressImage(file);
      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `apbdesa_${Math.random().toString(36).substring(2, 10)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('public_assets')
        .upload(fileName, compressedFile);

      if (uploadError) {
        alert("Gagal mengunggah gambar: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('public_assets')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // Insert or Update DB
    const payload = {
      tahun,
      pendapatan: Number(pendapatan),
      belanja: Number(belanja),
      pembiayaan: Number(pembiayaan),
      image_url: imageUrl
    };

    let error = null;
    if (editingId) {
      const res = await supabase.from('apbdesa').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('apbdesa').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan data APBDesa: " + error.message);
    } else {
      setSuccessMsg(`Laporan APBDesa Tahun ${tahun} berhasil ${editingId ? "diperbarui" : "ditambahkan"}!`);
      setIsModalOpen(false);
      fetchApbdesa();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen APBDesa</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Laporan Baru</span>
        </button>
      </div>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {successMsg}
        </div>
      )}

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cari berdasarkan tahun anggaran..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-gray-500">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : apbdesaList.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500 flex flex-col items-center">
          <BarChart3 size={48} className="text-gray-300 mb-4" />
          {searchKeyword ? "Tidak ada laporan APBDesa untuk tahun tersebut." : "Belum ada laporan APBDesa. Silakan klik tombol \"Tambah Laporan Baru\"."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apbdesaList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-extrabold text-gray-800">Tahun Anggaran {item.tahun}</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(item)} 
                    className="p-2 bg-blue-100 text-[#0088cc] rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit laporan"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.image_url, item.tahun)} 
                    className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                    title="Hapus laporan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                  <p className="text-xs font-bold text-green-600 mb-1">PENDAPATAN</p>
                  <p className="text-sm font-bold text-gray-800">{formatRupiah(item.pendapatan)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                  <p className="text-xs font-bold text-red-600 mb-1">BELANJA</p>
                  <p className="text-sm font-bold text-gray-800">{formatRupiah(item.belanja)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <p className="text-xs font-bold text-blue-600 mb-1">PEMBIAYAAN</p>
                  <p className="text-sm font-bold text-gray-800">{formatRupiah(item.pembiayaan)}</p>
                </div>
              </div>
              
              <div className="px-5 pb-5 mt-auto">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-blue-200 transition-colors">
                  <Image 
                    src={item.image_url} 
                    alt={`Infografis APBDesa ${item.tahun}`}
                    fill
                    unoptimized={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Infografis
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Laporan APBDesa" : "Tambah Laporan APBDesa"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tahun Anggaran *</label>
                <input required type="number" value={tahun} onChange={e => setTahun(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black font-semibold focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: 2026" />
              </div>

              <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-green-600 mb-1 uppercase tracking-wider">Total Pendapatan (Rp) *</label>
                  <input required type="number" value={pendapatan} onChange={e => setPendapatan(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black font-medium focus:ring-green-500 focus:border-green-500" placeholder="Contoh: 1450000000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-red-600 mb-1 uppercase tracking-wider">Total Belanja (Rp) *</label>
                  <input required type="number" value={belanja} onChange={e => setBelanja(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black font-medium focus:ring-red-500 focus:border-red-500" placeholder="Contoh: 1380000000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Pembiayaan Netto (Rp) *</label>
                  <input required type="number" value={pembiayaan} onChange={e => setPembiayaan(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black font-medium focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: 70000000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Gambar Baliho / Infografis *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:bg-gray-50 transition-colors">
                  <input 
                    required={!editingId}
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0088cc] hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
                {editingId && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Biarkan kosong jika Anda tidak ingin mengganti gambar infografis lama.
                  </p>
                )}
              </div>

              {previewUrl && (
                <div className="mt-4 border border-gray-200 rounded-xl p-3 bg-gray-50">
                  <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wider">Pratinjau Infografis:</p>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-gray-200">
                    <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                  </div>
                </div>
              )}

              <div className="pt-6 flex justify-end space-x-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex items-center space-x-2 px-6 py-2.5 text-white bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-400 rounded-xl font-bold transition-colors shadow-md">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>{saving ? "Menyimpan..." : "Simpan Laporan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
