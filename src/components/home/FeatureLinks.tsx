import Link from "next/link";
import { Users, BarChart3, Settings, FileText } from "lucide-react";

export default function FeatureLinks() {
  const features = [
    {
      title: "Layanan",
      icon: <Users className="w-12 h-12 text-[#0088cc]" strokeWidth={1.5} />,
      href: "/layanan"
    },
    {
      title: "Potensi Desa",
      icon: <BarChart3 className="w-12 h-12 text-[#0088cc]" strokeWidth={1.5} />,
      href: "/potensi-desa"
    },
    {
      title: "Pembangunan Desa",
      icon: <Settings className="w-12 h-12 text-[#0088cc]" strokeWidth={1.5} />,
      href: "/berita"
    },
    {
      title: "Keuangan Desa",
      icon: <FileText className="w-12 h-12 text-[#0088cc]" strokeWidth={1.5} />,
      href: "/apbdesa"
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={feature.href}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-gray-500 font-medium">{feature.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
