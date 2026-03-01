import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* 📌 Sidebar Kiri ala Blogger */}
      <aside className="w-64 bg-black border-r border-gray-800 flex flex-col">
        <div className="p-6 font-black text-2xl tracking-wider text-blue-500 border-b border-gray-800">
          ILHAM.LOG
        </div>
        
        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          <Link href="/admin" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
            📝 <span>Postingan</span>
          </Link>
          <Link href="/admin/pages" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
            📄 <span>Halaman</span>
          </Link>
          <Link href="/admin/comments" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
            💬 <span>Komentar</span>
          </Link>
          <Link href="/admin/stats" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
            📊 <span>Statistik</span>
          </Link>
          <Link href="/admin/settings" className="p-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
            ⚙️ <span>Setelan</span>
          </Link>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          Build with Si Badak 🦏
        </div>
      </aside>

      {/* 📌 Konten Utama di Kanan */}
      <main className="flex-1 overflow-y-auto bg-gray-900">
        {children}
      </main>
    </div>
  );
}
