"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Save, X, Loader2, CheckCircle2, Plus, Trash2, Search, Edit2, Scale, Download } from "lucide-react";

// Helper for human-readable file size
const formatBytes = (bytes: number, decimals = 1) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function ProdukHukumAdmin() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // Existing data if editing
  const [existingData, setExistingData] = useState<{fileUrl: string, fileType: string, fileSize: string} | null>(null);
  
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  useEffect(() => { 
    const timeout = setTimeout(() => {
      fetchDocuments(); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  const fetchDocuments = async () => {
    setLoading(true);
    let query = supabase.from('produk_hukum').select('*').order('created_at', { ascending: false });
    
    if (searchKeyword) {
      query = query.ilike('title', `%${searchKeyword}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching documents:", error);
    }
    if (data) setDocuments(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setFile(null);
    setExistingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setFile(null);
    setExistingData({
      fileUrl: item.file_url,
      fileType: item.file_type,
      fileSize: item.file_size
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDelete = async (id: string, fileUrl: string, itemTitle: string) => {
    if(!window.confirm(`Yakin ingin menghapus Produk Hukum "${itemTitle}"?`)) return;
    
    setLoading(true);
    // 1. Delete from database
    await supabase.from('produk_hukum').delete().eq('id', id);
    
    // 2. Try to delete from storage
    try {
      const urlParts = fileUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('public_assets').remove([fileName]);
      }
    } catch (err) {
      console.error("Gagal menghapus file di storage", err);
    }

    setSuccessMsg(`Produk Hukum berhasil dihapus.`);
    fetchDocuments();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !editingId) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    setSaving(true);
    let finalFileUrl = existingData?.fileUrl || "";
    let finalFileType = existingData?.fileType || "";
    let finalFileSize = existingData?.fileSize || "";
    
    if (file) {
      const fileExt = file.name.split('.').pop()?.toUpperCase() || "UNKNOWN";
      const fileSize = formatBytes(file.size);
      const fileName = `hukum_${Math.random().toString(36).substring(2, 10)}_${Date.now()}.${fileExt.toLowerCase()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('public_assets')
        .upload(fileName, file);

      if (uploadError) {
        alert("Gagal mengunggah file: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('public_assets')
        .getPublicUrl(fileName);

      finalFileUrl = publicUrlData.publicUrl;
      finalFileType = fileExt;
      finalFileSize = fileSize;
    }

    const payload = {
      title,
      file_url: finalFileUrl,
      file_type: finalFileType,
      file_size: finalFileSize
    };

    let error = null;
    if (editingId) {
      const res = await supabase.from('produk_hukum').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('produk_hukum').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan data: " + error.message);
    } else {
      setSuccessMsg(`Produk Hukum berhasil ${editingId ? "diperbarui" : "ditambahkan"}!`);
      setIsModalOpen(false);
      fetchDocuments();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk Hukum</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Data</span>
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
            placeholder="Cari berdasarkan judul peraturan..."
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
      ) : documents.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500 flex flex-col items-center">
          <Scale size={48} className="text-gray-300 mb-4" />
          {searchKeyword ? "Tidak ada Produk Hukum yang cocok dengan pencarian." : "Belum ada data. Silakan klik tombol \"Tambah Data\"."}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {documents.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-blue-50 text-[#0088cc] p-3 rounded-xl shrink-0 border border-blue-100">
                  <Scale size={24} />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1 leading-tight">{item.title}</h2>
                  <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                    <span className="bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full">{item.file_type}</span>
                    <span className="text-gray-500">{item.file_size}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
                <a 
                  href={item.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  title="Unduh"
                >
                  <Download size={18} />
                </a>
                <button 
                  onClick={() => openEditModal(item)} 
                  className="p-2 bg-blue-50 text-[#0088cc] rounded-full hover:bg-blue-100 transition-colors"
                  title="Edit Data"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.file_url, item.title)} 
                  className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                  title="Hapus Data"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Produk Hukum" : "Tambah Produk Hukum Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Peraturan *</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Peraturan Desa No. 2 Tahun 2026" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih File (PDF, DOCX, dll) {editingId && "(Opsional)"}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                  <input 
                    required={!editingId} 
                    type="file" 
                    onChange={handleFileChange} 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0088cc] hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
                {editingId && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Biarkan kosong jika Anda tidak ingin mengganti file yang sudah ada.
                  </p>
                )}
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Batal</button>
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
