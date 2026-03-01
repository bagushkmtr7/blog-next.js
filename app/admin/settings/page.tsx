import { db } from "../../../db";
import { settings } from "../../../db/schema";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function SettingsDashboard() {
  const allSettings = await db.select().from(settings);
  const currentSetting = allSettings[allSettings.length - 1] || { 
    title: "", description: "" 
  };

  // 🪄 BACA URL VERCEL OTOMATIS
  const autoUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";

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
              <label className="block mb-2 text-gray-400">Alamat URL Blog (Otomatis)</label>
              {/* SEKARANG INPUT INI OTOMATIS KEISI DAN DIKUNCI (READ-ONLY) */}
              <input type="url" name="siteUrl" value={autoUrl} readOnly className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-gray-500 cursor-not-allowed outline-none" />
            </div>
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold w-fit mt-2">Simpan Identitas</button>
          </form>
        </section>

        {/* SECTION 2 & 3: IMPORT EXPORT (COMING SOON) */}
        <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-green-400 border-b border-gray-700 pb-2">Alat Konten (Segera Rilis)</h2>
          <div className="bg-gray-900 p-4 rounded border border-gray-600 text-gray-400 text-sm">
            Fitur Import/Export JSON sedang dipersiapkan di tahap selanjutnya.
          </div>
        </section>
      </div>
    </div>
  );
}
