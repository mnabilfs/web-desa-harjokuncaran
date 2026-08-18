import { Phone, Mail, Globe } from "lucide-react";

export default function TopBar() {
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
          <span>MALANG</span>
        </div>
      </div>
    </div>
  );
}
