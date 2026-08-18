import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AboutBanner() {
  return (
    <div className="bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-white text-2xl font-bold mb-1 tracking-wide">
              HARJOKUNCARAN KOMANDO
            </h2>
            <p className="text-gray-400 text-sm tracking-widest">
              KUAT-OPTIMIS-MANDIRI-AGAMIS-NASIONALIS-DEMOKRATIS-OPTIMAL
            </p>
          </div>

          <div>
            <Link 
              href="/about-us" 
              className="inline-flex items-center bg-[#2d3748] hover:bg-[#4a5568] text-white px-6 py-2.5 rounded text-sm transition-colors"
            >
              Tentang Kami <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
