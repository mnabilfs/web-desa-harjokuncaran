"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function NewsSearchBox() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/berita?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      router.push(`/berita`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex mb-8">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Pencarian Berita..."
        className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-[#0088cc] text-sm text-black"
      />
      <button 
        onClick={handleSearch}
        className="bg-white border border-l-0 border-gray-300 rounded-r px-4 py-2 hover:bg-gray-50 text-gray-500 transition-colors"
      >
        <Search size={18} />
      </button>
    </div>
  );
}
