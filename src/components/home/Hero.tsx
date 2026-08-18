export default function Hero() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gray-200">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/DSC_2088_kecil.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Overlay Text */}
      <div className="absolute bottom-12 left-0 w-full px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-block bg-black/30 p-[5px]">
            <h1 className="text-white text-xl md:text-2xl font-bold mb-1 leading-none">Website Desa Harjokuncaran</h1>
            <p className="text-gray-100 text-sm md:text-base">
              Website Desa Harjokuncaran adalah sebuah website yang dibuat untuk menampilkan informasi Desa Harjokuncaran
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
