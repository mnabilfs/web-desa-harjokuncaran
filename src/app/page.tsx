import Hero from "@/components/home/Hero";
import FeatureLinks from "@/components/home/FeatureLinks";
import NewsSection from "@/components/home/NewsSection";
import GalleryStructureSection from "@/components/home/GalleryStructureSection";
import AboutBanner from "@/components/home/AboutBanner";
import GeographySection from "@/components/home/GeographySection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeatureLinks />
      <NewsSection />
      <GalleryStructureSection />
      <AboutBanner />
      <GeographySection />
    </div>
  );
}
