import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  // 🪄 FUNGSI LOGOUT (Ngehapus Cookies)
  async function handleLogout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* 📌 Sidebar */}
      <aside className="w-16 md:w-64 bg-black border-r border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0">
        
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-800 text-blue-500 font-black tracking-wider">
          <span className="text-xl md:hidden">IL</span>
          <span className="text-2xl hidden md:inline">ILHAM.LOG</span>
        </div>
        
        {/* Menu Navigasi */}
        <nav className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto">
          <Link href="/admin" className="p-3 mx-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center md:justify-start gap-3" title="Postingan">
            <span className="text-xl">📝</span>
            <span className="hidden md:inline font-medium">Postingan</span>
          </Link>
          <Link href="/admin/pages" className="p-3 mx-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center md:justify-start gap-3" title="Halaman">
            <span className="text-xl">📄</span>
            <span className="hidden md:inline font-medium">Halaman</span>
          </Link>
          <Link href="/admin/comments" className="p-3 mx-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center md:justify-start gap-3" title="Komentar">
            <span className="text-xl">💬</span>
            <span className="hidden md:inline font-medium">Komentar</span>
          </Link>
          <Link href="/admin/stats" className="p-3 mx-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center md:justify-start gap-3" title="Statistik">
            <span className="text-xl">📊</span>
            <span className="hidden md:inline font-medium">Statistik</span>
          </Link>
          <Link href="/admin/settings" className="p-3 mx-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center md:justify-start gap-3" title="Setelan">
            <span className="text-xl">⚙️</span>
            <span className="hidden md:inline font-medium">Setelan</span>
          </Link>
        </nav>

        {/* Footer Sidebar & Tombol Logout */}
        <div className="p-2 md:p-4 border-t border-gray-800 flex flex-col gap-2 mt-auto">
          <form action={handleLogout}>
            <button type="submit" className="w-full flex items-center justify-center md:justify-start gap-3 p-2 md:p-3 rounded-lg hover:bg-red-900/50 text-red-500 transition" title="Keluar">
              <span className="text-xl">🚪</span>
              <span className="hidden md:inline font-medium">Keluar</span>
            </button>
          </form>
          <div className="hidden md:block text-xs text-gray-500 text-center mt-2">
            Build with Si Badak 🦏
          </div>
        </div>
      </aside>

      {/* 📌 Konten Utama */}
      <main className="flex-1 overflow-y-auto bg-gray-900">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
