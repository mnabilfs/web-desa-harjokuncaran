import imageCompression from 'browser-image-compression';

/**
 * Mengompresi file gambar agar ukurannya lebih kecil sebelum di-upload ke Supabase.
 * @param imageFile File gambar asli
 * @returns File gambar yang sudah dikompresi
 */
export async function compressImage(imageFile: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5, // Target ukuran maksimum: 500KB
    maxWidthOrHeight: 1920, // Tidak lebih dari resolusi HD untuk menjaga kualitas
    useWebWorker: true,
    fileType: 'image/webp' // Konversi ke WebP sangat direkomendasikan untuk web modern
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Gagal mengompresi gambar:", error);
    // Jika gagal kompresi, kembalikan file asli agar proses upload tetap bisa berjalan
    return imageFile;
  }
}
