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
    <div className="bg-[#0088cc] text-white py-2 text-sm w-full">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center max-w-6xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Phone size={14} />
            <span>-</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail size={14} />
            <span>harjokuncaran.sumbermanjingwetan@malangkab.go.id</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 mt-2 sm:mt-0">
          <Globe size={14} />
          <span onClick={handleSecretClick} className="cursor-default select-none">MALANG</span>
        </div>
      </div>
    </div>
  );
}
