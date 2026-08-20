"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Upload, Image as ImageIcon, Save, Loader2, CheckCircle2 } from "lucide-react";

export default function StrukturOrganisasiAdmin() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchStruktur();
  }, []);

  const fetchStruktur = async () => {
    setFetching(true);
    const { data } = await supabase.from('pengaturan_desa').select('value').eq('key', 'struktur_organisasi').single();
    if (data) setImageUrl(data.value);
    setFetching(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setSuccessMsg("");

    const fileExt = file.name.split('.').pop();
    const fileName = `struktur_organisasi_${Math.random()}.${fileExt}`;

    // Upload to bucket
    const { error: uploadError } = await supabase.storage
      .from('public_assets')
      .upload(fileName, file);

    if (uploadError) {
      alert("Gagal mengunggah gambar: " + uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('public_assets').getPublicUrl(fileName);
    const newUrl = publicUrlData.publicUrl;

    // Save to database
    const { error: dbError } = await supabase.from('pengaturan_desa').upsert({
      key: 'struktur_organisasi',
      value: newUrl
    });

    if (dbError) {
      alert("Gagal menyimpan ke database: " + dbError.message);
    } else {
      setImageUrl(newUrl);
      setSuccessMsg("Bagan struktur organisasi berhasil diperbarui!");
      setFile(null);
      setPreview(null);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Struktur Organisasi</h1>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Upload Bagan / Gambar Struktur</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih File Gambar (PNG/JPG)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {preview && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar Baru:</p>
            <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg border border-gray-200" />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="flex items-center space-x-2 bg-[#0088cc] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          <span>{loading ? "Menyimpan..." : "Simpan Gambar"}</span>
        </button>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <ImageIcon className="mr-2 text-blue-500" /> Gambar Struktur Saat Ini (Publik)
        </h2>
        {fetching ? (
          <div className="flex items-center text-gray-500"><Loader2 size={18} className="animate-spin mr-2" /> Memuat gambar...</div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Struktur Organisasi" className="max-w-full h-auto rounded-lg border border-gray-200" />
        ) : (
          <div className="p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
            Belum ada gambar struktur organisasi yang diunggah.
          </div>
        )}
      </div>
    </div>
  );
}
