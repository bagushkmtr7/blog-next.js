import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const allPosts = await db.select().from(posts);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin - ILHAM.LOG</h1>
      <Link href="/admin/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        + Tulis Artikel Baru
      </Link>
      <div className="mt-4">
        {allPosts.map((post) => (
          <div key={post.id} className="border-b py-2 flex justify-between">
            <span>{post.title}</span>
            <span className="text-gray-500 text-sm">{post.createdAt?.toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
