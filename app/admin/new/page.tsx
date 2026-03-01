import { db } from "../../../db";
import { posts } from "../../../db/schema";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    // Bikin link url (slug) otomatis dari judul
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    await db.insert(posts).values({
      title,
      slug,
      content,
    });

    redirect("/admin");
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tulis Artikel Baru</h1>
      <form action={createPost} className="flex flex-col gap-5">
        <div>
          <label className="block mb-2 text-gray-400">Judul Artikel</label>
          <input type="text" name="title" required placeholder="Ketik judul di sini..." className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Isi Artikel</label>
          <textarea name="content" required rows={8} placeholder="Tulis isi pikiran lu di sini..." className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div className="flex gap-4 mt-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors">
            🚀 Publish
          </button>
          <Link href="/admin" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition-colors">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
