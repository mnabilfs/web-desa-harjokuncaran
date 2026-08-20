"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Edit2, Save, X, Loader2, CheckCircle2, Plus, Trash2, Image as ImageIcon, Search } from "lucide-react";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

const getTodayYMD = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function BeritaAdmin() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Admin Desa");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  useEffect(() => { 
    const timeout = setTimeout(() => {
      fetchBerita(); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword, filterMonth, filterYear]);

  const fetchBerita = async () => {
    setLoading(true);
    let query = supabase.from('berita').select('*').order('date', { ascending: false });
    
    if (searchKeyword) {
      query = query.ilike('title', `%${searchKeyword}%`);
    }

    if (filterYear) {
      query = query.ilike('date', `%${filterYear}%`);
    }
    
    if (filterMonth) {
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      const monthName = monthNames[parseInt(filterMonth) - 1];
      // Mencari format baru "YYYY-MM-DD" ATAU format lama "DD Bulan YYYY"
      query = query.or(`date.ilike.%-${filterMonth}-%,date.ilike.%${monthName}%`);
    }

    const { data } = await query;
    if (data) setBerita(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle(""); 
    setAuthor("Admin Desa"); 
    setDate(getTodayYMD());
    setExcerpt(""); 
    setContent("");
    setImageFile(null); 
    setExistingImageUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setAuthor(item.author || "");
    // If the old data is not in YYYY-MM-DD format (like '18 Agustus 2026'), this will show empty on date picker, but new data will work.
    setDate(item.date || ""); 
    setExcerpt(item.excerpt || "");
    setContent(item.content || "");
    setImageFile(null);
    setExistingImageUrl(item.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, judul: string) => {
    if(!window.confirm(`Yakin ingin menghapus berita: "${judul}"?`)) return;
    
    setLoading(true);
    await supabase.from('berita').delete().eq('id', id);
    setSuccessMsg(`Berita berhasil dihapus.`);
    fetchBerita();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let finalImageUrl = existingImageUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `berita_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('public_assets').upload(fileName, imageFile);
      
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('public_assets').getPublicUrl(fileName);
        finalImageUrl = publicUrlData.publicUrl;
      }
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const payload = {
      title,
      slug,
      author,
      date, // Save YYYY-MM-DD string to DB so we can order by it properly
      excerpt,
      content,
      image: finalImageUrl
    };

    let error = null;
    if (editingId) {
      const res = await supabase.from('berita').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('berita').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setSuccessMsg("Berita berhasil disimpan!");
      setIsModalOpen(false);
      fetchBerita();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Berita</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Berita</span>
        </button>
      </div>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {successMsg}
        </div>
      )}

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cari berita berdasarkan judul..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] outline-none"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] outline-none"
          >
            <option value="">Semua Bulan</option>
            <option value="01">Januari</option>
            <option value="02">Februari</option>
            <option value="03">Maret</option>
            <option value="04">April</option>
            <option value="05">Mei</option>
            <option value="06">Juni</option>
            <option value="07">Juli</option>
            <option value="08">Agustus</option>
            <option value="09">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] outline-none"
          >
            <option value="">Semua Tahun</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-gray-500">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : berita.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500">
          {(searchKeyword || filterMonth || filterYear) ? "Tidak ada berita yang cocok dengan filter pencarian." : "Belum ada data berita. Silakan klik tombol \"Tambah Berita\"."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-100 relative group overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button onClick={() => openEditModal(item)} className="p-3 bg-white text-[#0088cc] rounded-full hover:bg-gray-100 shadow-lg">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-2 font-medium">{formatToIndonesianDate(item.date)} • {item.author}</div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Berita" : "Buat Berita Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita *</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Pembangunan Jalan Desa" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Penulis *</label>
                  <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto / Gambar (Opsional)</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-black" />
                {existingImageUrl && !imageFile && <p className="text-xs text-green-600 mt-1">Gambar saat ini sudah tersimpan dan akan digunakan.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan (Excerpt) *</label>
                <textarea required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Tuliskan 1-2 kalimat ringkasan yang akan tampil di halaman depan..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita Lengkap *</label>
                <textarea required value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Tuliskan keseluruhan isi berita di sini..." />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex items-center space-x-2 px-6 py-2.5 text-white bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-400 rounded-lg font-medium transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>{saving ? "Menyimpan..." : "Simpan Berita"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
