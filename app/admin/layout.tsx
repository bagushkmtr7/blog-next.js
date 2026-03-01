import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* 📌 Navigasi: Jadi Topbar di HP, Jadi Sidebar di PC */}
      <aside className="w-full md:w-64 bg-black border-b md:border-b-0 md:border-r border-gray-800 flex flex-col flex-shrink-0">
        
        {/* Header Blog */}
        <div className="p-4 md:p-6 font-black text-xl md:text-2xl tracking-wider text-blue-500 border-b border-gray-800 flex items-center justify-between">
          <span>ILHAM.LOG</span>
        </div>
        
        {/* Menu Navigasi - Horizontal scroll di HP */}
        <nav className="flex flex-row md:flex-col p-2 md:p-4 gap-2 overflow-x-auto md:overflow-y-auto">
          <Link href="/admin" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 whitespace-nowrap">
            📝 <span className="text-sm md:text-base font-medium">Postingan</span>
          </Link>
          <Link href="/admin/pages" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 whitespace-nowrap">
            📄 <span className="text-sm md:text-base font-medium">Halaman</span>
          </Link>
          <Link href="/admin/comments" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 whitespace-nowrap">
            💬 <span className="text-sm md:text-base font-medium">Komentar</span>
          </Link>
          <Link href="/admin/stats" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 whitespace-nowrap">
            📊 <span className="text-sm md:text-base font-medium">Statistik</span>
          </Link>
          <Link href="/admin/settings" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 whitespace-nowrap">
            ⚙️ <span className="text-sm md:text-base font-medium">Setelan</span>
          </Link>
        </nav>

        {/* Footer Sidebar - Cuma muncul di PC biar HP nggak penuh */}
        <div className="hidden md:block p-4 border-t border-gray-800 text-xs text-gray-500 text-center mt-auto">
          Build with Si Badak 🦏
        </div>
      </aside>

      {/* 📌 Konten Utama */}
      <main className="flex-1 overflow-y-auto bg-gray-900">
        {/* Tambahin padding dikit biar lega di HP */}
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
