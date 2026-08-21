import Hero from "@/components/home/Hero";
import FeatureLinks from "@/components/home/FeatureLinks";
import NewsSection from "@/components/home/NewsSection";
import GalleryStructureSection from "@/components/home/GalleryStructureSection";
import AboutBanner from "@/components/home/AboutBanner";
import GeographySection from "@/components/home/GeographySection";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeatureLinks />
      <Suspense fallback={
        <div className="py-20 flex flex-col items-center justify-center bg-white text-[#0088cc]">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Memuat berita dan agenda desa...</p>
        </div>
      }>
        <NewsSection />
      </Suspense>
      <GalleryStructureSection />
      <AboutBanner />
      <GeographySection />
    </div>
  );
}
