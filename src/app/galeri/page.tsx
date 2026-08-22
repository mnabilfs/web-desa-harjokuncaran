import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0; // Disable caching

export default async function GaleriPage() {
  const supabase = await createClient();
  const { data: galleries } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Informasi</span>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Galeri</span>
        </div>

        <div className="w-full">
          <h1 className="text-[28px] font-bold text-[#337ab7] mb-8">Galeri</h1>

        {(!galleries || galleries.length === 0) ? (
          <div className="text-center p-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
            Belum ada foto yang diunggah ke Galeri.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleries.map((item, index) => {
              const cardContent = (
                <>
                  <Image 
                    src={item.image_url} 
                    alt={item.title} 
                    fill 
                    priority={index < 4}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <p className="text-white font-semibold text-xs md:text-sm leading-snug drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </>
              );

              return item.drive_url ? (
                <a 
                  key={item.id}
                  href={item.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-lg overflow-hidden group cursor-pointer aspect-square bg-gray-100 border border-gray-200 shadow-sm block"
                >
                  {cardContent}
                </a>
              ) : (
                <div key={item.id} className="relative rounded-lg overflow-hidden group cursor-pointer aspect-square bg-gray-100 border border-gray-200 shadow-sm">
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
