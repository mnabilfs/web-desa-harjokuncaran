"use client";

import { useState, useEffect } from "react";
import { compressImage } from "@/utils/imageCompressor";
import { createClient } from "@/utils/supabase/client";
import { Save, X, Loader2, CheckCircle2, Plus, Trash2, Image as ImageIcon, Search, Edit2 } from "lucide-react";
import Image from "next/image";

export default function GaleriAdmin() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [title, setTitle] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  useEffect(() => { 
    const timeout = setTimeout(() => {
      fetchGalleries(); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  const fetchGalleries = async () => {
    setLoading(true);
    let query = supabase.from('galeri').select('*').order('created_at', { ascending: false });
    
    if (searchKeyword) {
      query = query.ilike('title', `%${searchKeyword}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching galleries:", error);
    }
    if (data) setGalleries(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDriveUrl("");
    setFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setDriveUrl(item.drive_url || "");
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

  const handleDelete = async (id: string, imgUrl: string, itemTitle: string) => {
    if(!window.confirm(`Yakin ingin menghapus foto "${itemTitle}"?`)) return;
    
    setLoading(true);
    // 1. Delete from database
    await supabase.from('galeri').delete().eq('id', id);
    
    // 2. Try to delete from storage (extract filename from URL)
    try {
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('public_assets').remove([fileName]);
      }
    } catch (err) {
      console.error("Gagal menghapus file gambar di storage", err);
    }

    setSuccessMsg(`Foto berhasil dihapus.`);
    fetchGalleries();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !editingId) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    setSaving(true);
    let imageUrl = previewUrl;
    
    // Upload image if file changed
    if (file) {
      const compressedFile = await compressImage(file);
      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
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
      title,
      image_url: imageUrl,
      drive_url: driveUrl || null
    };

    let error = null;
    if (editingId) {
      const res = await supabase.from('galeri').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('galeri').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan data galeri: " + error.message);
    } else {
      setSuccessMsg(`Foto berhasil ${editingId ? "diperbarui" : "ditambahkan"}!`);
      setIsModalOpen(false);
      fetchGalleries();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Galeri Desa</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Foto</span>
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
            placeholder="Cari foto berdasarkan judul..."
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
      ) : galleries.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500 flex flex-col items-center">
          <ImageIcon size={48} className="text-gray-300 mb-4" />
          {searchKeyword ? "Tidak ada foto yang cocok dengan pencarian." : "Belum ada foto galeri. Silakan klik tombol \"Tambah Foto\"."}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleries.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
              
              <div className="aspect-square relative bg-gray-100">
                <Image 
                  src={item.image_url} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Action Buttons Overlay */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-2">
                  <button 
                    onClick={() => openEditModal(item)} 
                    className="p-2 bg-blue-500/90 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                    title="Edit foto"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.image_url, item.title)} 
                    className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Hapus foto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <p className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug" title={item.title}>
                  {item.title}
                </p>
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
                {editingId ? "Edit Foto Galeri" : "Unggah Foto Galeri"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul / Deskripsi Foto *</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Panen Raya Kopi" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Drive (Opsional)</label>
                <input type="url" value={driveUrl} onChange={e => setDriveUrl(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: https://drive.google.com/..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Gambar *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                  <input 
                    required={!editingId}
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0088cc] hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              {previewUrl && (
                <div className="mt-4 border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium mb-2 uppercase">Pratinjau:</p>
                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-gray-200">
                    <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex items-center space-x-2 px-5 py-2 text-white bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-400 rounded-lg font-medium transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>{saving ? "Mengunggah..." : "Simpan Foto"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
