import { db } from "../../../../db";
import { pages } from "../../../../db/schema";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewPage() {
  async function createPage(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    // Bikin link otomatis (slug)
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    await db.insert(pages).values({
      title,
      slug,
      content,
    });

    redirect("/admin/pages");
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Buat Halaman Baru</h1>
      <form action={createPage} className="flex flex-col gap-5 max-w-3xl">
        <div>
          <label className="block mb-2 text-gray-400 font-medium">Judul Halaman</label>
          <input type="text" name="title" required placeholder="Contoh: About Me, Contact Us..." className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 text-gray-400 font-medium">Isi Konten</label>
          <textarea name="content" required rows={10} placeholder="Ceritain tentang diri lu di sini..." className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition">
            🚀 Publish Halaman
          </button>
          <Link href="/admin/pages" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition flex items-center">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
