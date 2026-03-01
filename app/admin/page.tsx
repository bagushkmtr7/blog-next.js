import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const allPosts = await db.select().from(posts);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin - ILHAM.LOG</h1>
      <Link href="/admin/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 inline-block">
        + Tulis Artikel Baru
      </Link>
      <div className="mt-4 bg-gray-900 p-4 rounded-lg">
        {allPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-700 py-3 flex justify-between items-center">
            <span className="font-medium">{post.title}</span>
            <span className="text-gray-400 text-sm">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Baru saja'}
            </span>
          </div>
        ))}
        {allPosts.length === 0 && (
          <p className="text-gray-400">Belum ada artikel. Yuk tulis satu!</p>
        )}
      </div>
    </div>
  );
}
