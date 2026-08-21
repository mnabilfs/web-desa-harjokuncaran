"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Edit2, Save, X, Loader2, CheckCircle2, Plus, Trash2, CalendarDays, Search, MapPin, Clock } from "lucide-react";
import { formatToIndonesianDate } from "@/utils/dateFormatter";

const getTodayYMD = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getCurrentTime = () => {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

export default function AgendaAdmin() {
  const [agendas, setAgendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Adding/Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  useEffect(() => { 
    const timeout = setTimeout(() => {
      fetchAgendas(); 
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchKeyword, filterMonth, filterYear]);

  const fetchAgendas = async () => {
    setLoading(true);
    let query = supabase.from('agenda').select('*').order('date', { ascending: false }).order('time', { ascending: false });
    
    if (searchKeyword) {
      query = query.ilike('event', `%${searchKeyword}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching agendas:", error);
    }
    
    if (data) {
      let filteredData = data;
      
      if (filterYear) {
        filteredData = filteredData.filter((item: any) => item.date && item.date.startsWith(filterYear));
      }
      
      if (filterMonth) {
        filteredData = filteredData.filter((item: any) => item.date && item.date.split('-')[1] === filterMonth);
      }
      
      setAgendas(filteredData);
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingId(null);
    setDate(getTodayYMD());
    setTime(getCurrentTime());
    setEvent("");
    setLocation("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setDate(item.date || ""); 
    setTime(item.time || "");
    setEvent(item.event || "");
    setLocation(item.location || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, namaAcara: string) => {
    if(!window.confirm(`Yakin ingin menghapus agenda: "${namaAcara}"?`)) return;
    
    setLoading(true);
    await supabase.from('agenda').delete().eq('id', id);
    setSuccessMsg(`Agenda berhasil dihapus.`);
    fetchAgendas();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      date,
      time,
      event,
      location
    };

    let error = null;
    if (editingId) {
      const res = await supabase.from('agenda').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('agenda').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setSuccessMsg("Agenda berhasil disimpan!");
      setIsModalOpen(false);
      fetchAgendas();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Agenda Kegiatan</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Tambah Agenda</span>
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
            placeholder="Cari agenda berdasarkan nama acara..."
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
            <option value="2027">2027</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-gray-500">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : agendas.length === 0 ? (
        <div className="bg-white p-12 text-center border border-gray-200 rounded-xl shadow-sm text-gray-500">
          {(searchKeyword || filterMonth || filterYear) ? "Tidak ada agenda yang cocok dengan filter pencarian." : "Belum ada data agenda. Silakan klik tombol \"Tambah Agenda\"."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agendas.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative group hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                <button onClick={() => openEditModal(item)} className="p-2 bg-blue-50 text-[#0088cc] rounded-full hover:bg-blue-100 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id, item.event)} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <CalendarDays className="text-[#0088cc]" size={24} />
                </div>
                <div className="flex-1 pr-16">
                  <h3 className="text-lg font-bold text-gray-800 leading-snug mb-3">{item.event}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDays size={14} className="mr-2 text-gray-400" />
                      {formatToIndonesianDate(item.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-2 text-gray-400" />
                      {item.time} WIB
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2 text-gray-400 shrink-0" />
                      <span className="truncate" title={item.location}>{item.location}</span>
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
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Agenda" : "Buat Agenda Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan / Acara *</label>
                <input required type="text" value={event} onChange={e => setEvent(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Musyawarah Desa Pembahasan RPJMDes" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jam (WIB) *</label>
                  <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi *</label>
                <input required type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:ring-[#0088cc] focus:border-[#0088cc]" placeholder="Contoh: Balai Desa Harjokuncaran" />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Batal</button>
                <button type="submit" disabled={saving} className="flex items-center space-x-2 px-6 py-2.5 text-white bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-400 rounded-lg font-medium transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>{saving ? "Menyimpan..." : "Simpan Agenda"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
