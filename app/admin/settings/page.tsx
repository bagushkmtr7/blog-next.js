import { db } from "../../../db";
import { settings } from "../../../db/schema";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function SettingsDashboard() {
  // Ambil data (untuk sementara ambil basic-nya dulu)
  const allSettings = await db.select().from(settings);
  const currentSetting = allSettings[allSettings.length - 1] || { 
    title: "", description: "" 
  };

  return (
    <div className="text-white max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">⚙️ Setelan Lanjutan (Advanced)</h1>
      
      <div className="flex flex-col gap-8">
        {/* SECTION 1: IDENTITAS WEB */}
        <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Identitas Blog</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-gray-400">Judul Web</label>
              <input type="text" name="title" defaultValue={currentSetting.title} className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">Deskripsi (SEO)</label>
              <textarea name="description" defaultValue={currentSetting.description} rows={3} className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none"></textarea>
            </div>
            <div>
              <label className="block mb-2 text-gray-400">Alamat URL Blog</label>
              <input type="url" name="siteUrl" placeholder="https://blog-lu.vercel.app" className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
            </div>
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold w-fit mt-2">Simpan Identitas</button>
          </form>
        </section>

        {/* SECTION 2: KEAMANAN (AKUN) */}
        <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-red-400 border-b border-gray-700 pb-2">Keamanan & Login</h2>
          <div className="bg-gray-900 p-4 rounded border border-red-900/50 mb-4">
            <p className="text-sm text-gray-400">⚠️ Fitur otentikasi sedang dibangun. Nanti lu bisa ganti password dan ngunci dashboard admin dari sini.</p>
          </div>
          <form className="flex flex-col gap-4 opacity-50 pointer-events-none">
            <div>
              <label className="block mb-2 text-gray-400">Username Admin</label>
              <input type="text" defaultValue="bagushkmtr7" disabled className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-gray-500" />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">Password Baru</label>
              <input type="password" placeholder="********" disabled className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-gray-500" />
            </div>
            <button type="button" className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold w-fit mt-2 cursor-not-allowed">Update Password</button>
          </form>
        </section>

        {/* SECTION 3: MANAJEMEN KONTEN */}
        <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-green-400 border-b border-gray-700 pb-2">Alat Konten</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-600 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-lg">📥 Import Konten</h3>
                <p className="text-sm text-gray-400">Pindahan dari Blogger/WordPress? Upload file .json lu di sini.</p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-medium transition">Pilih File...</button>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-600 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-lg">📤 Export Backup</h3>
                <p className="text-sm text-gray-400">Download semua artikel lu buat cadangan.</p>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-medium transition">Download .json</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
