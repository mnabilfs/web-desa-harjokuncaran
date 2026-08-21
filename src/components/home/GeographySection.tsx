export default function GeographySection() {
  const geoInfo = [
    { label: "Kode PUM", value: "3507042010" },
    { label: "Tahun Pembentukan", value: "1949" },
    { label: "Dasar Hukum", value: "Undang-Undang Nomor 6 Tahun 2014 tentang Desa" },
    { label: "Luas Wilayah", value: "1878 ha" },
    { label: "Batas Sebelah Utara", value: "Desa Sumbermanjing" },
    { label: "Batas Sebelah Selatan", value: "Desa Argotirto" },
    { label: "Batas Sebelah Timur", value: "Desa Klepu dan Desa Ringinkembar" },
    { label: "Batas Sebelah Barat", value: "Desa Sumbermanjing Wetan dan Desa Ringinsari" },
  ];

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        {/* Google Maps Embed Placeholder */}
        <div className="h-[300px] sm:h-[400px] w-full bg-gray-200 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63162.24641617302!2d112.6582457639598!3d-8.348615462529452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd61c9ec8d0e74f%3A0x67dbb69c27f311fb!2sHarjokuncaran%2C%20Sumbermanjing%20Wetan%2C%20Malang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Desa Harjokuncaran"
            className="absolute inset-0 grayscale-[20%]"
          ></iframe>
        </div>

        {/* Informasi List */}
        <div className="bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-lg mx-auto md:mx-0">
            <ul className="space-y-3.5">
              {geoInfo.map((item, index) => (
                <li key={index} className="flex text-[13px] sm:text-sm">
                  <span className="w-36 sm:w-48 shrink-0 text-gray-700 font-semibold">{item.label}</span>
                  <span className="w-4 shrink-0 text-gray-700 font-semibold">:</span>
                  <span className="text-gray-600 leading-snug">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
