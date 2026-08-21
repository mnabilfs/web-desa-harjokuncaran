"use client";

import { Phone, Mail, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [clicks, setClicks] = useState(0);

  if (pathname.startsWith("/admin")) return null;

  const handleSecretClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 3) {
      const randomAccess = Math.floor(Math.random() * 900000) + 100000;
      router.push(`/auth/akses-kades-${randomAccess}`);
      setClicks(0);
    } else {
      setTimeout(() => setClicks(0), 1000);
    }
  };

  return (
    <div className="bg-[#0088cc] text-white py-1.5 sm:py-2 text-[11px] sm:text-sm w-full border-b border-blue-600/30">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center max-w-6xl gap-1.5 sm:gap-0">
        
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-1 sm:space-y-0 w-full sm:w-auto text-center">
          <div className="flex items-center space-x-1.5">
            <Phone size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>-</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Mail size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">harjokuncaran.sumbermanjingwetan@malangkab.go.id</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1.5 mt-0.5 sm:mt-0 justify-center">
          <Globe size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
          <span onClick={handleSecretClick} className="cursor-default select-none tracking-wide">KAB. MALANG</span>
        </div>

      </div>
    </div>
  );
}
