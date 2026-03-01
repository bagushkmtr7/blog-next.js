import { db } from "../../../db";
import { settings } from "../../../db/schema";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function SettingsDashboard() {
  // Ambil semua data setelan, lalu pilih yang paling terakhir
  const allSettings = await db.select().from(settings);
  const currentSetting = allSettings[allSettings.length - 1] || { 
    title: "ILHAM.LOG", 
    description: "Build with Si Badak" 
  };

  async function saveSettings(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    // Simpan setelan baru ke database
    await db.insert(settings).values({
      title,
      description,
    });

    // Refresh halaman biar datanya langsung ganti
    revalidatePath("/admin/settings");
  }

  return (
    <div className="text-white max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">⚙️ Setelan Blog</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <form action={saveSettings} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-gray-400 font-medium">Judul Web (Blog Title)</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={currentSetting.title} 
              required 
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:border-blue-500" 
            />
            <p className="text-sm text-gray-500 mt-1">Nama ini bakal muncul di menu dan header web lu.</p>
          </div>
          
          <div>
            <label className="block mb-2 text-gray-400 font-medium">Deskripsi Blog</label>
            <textarea 
              name="description" 
              defaultValue={currentSetting.description} 
              rows={3} 
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">Bagus buat SEO biar Google tau blog lu bahas apa.</p>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition mt-4">
            💾 Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
