import { Home } from "lucide-react";
import Link from "next/link";

export default function DemografiDesaPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 px-4 rounded flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#0088cc] flex items-center">
            <Home size={16} className="text-[#0088cc]" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">Demografi Desa</span>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-[#0088cc] mb-10">Demografi Desa</h1>
          
          <div className="text-gray-700 text-[15px] leading-relaxed">
            <h2 className="text-3xl font-light text-gray-800 mb-6">What is Lorem Ipsum?</h2>
            <p className="mb-10 text-justify text-gray-500">
              <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <h2 className="text-3xl font-light text-gray-800 mb-6">Where does it come from?</h2>
            <p className="text-justify text-gray-500">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
