import { db } from "../../../db";
import { pages } from "../../../db/schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PagesDashboard() {
  const allPages = await db.select().from(pages);

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Halaman Statis</h1>
        <Link href="/admin/pages/new" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition">
          + Halaman Baru
        </Link>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        {allPages.length === 0 ? (
          <p className="text-gray-400 text-center py-6">Belum ada halaman. Yuk bikin halaman "About Me"!</p>
        ) : (
          allPages.map((page) => (
            <div key={page.id} className="border-b border-gray-700 py-3 flex justify-between items-center last:border-0">
              <span className="font-medium text-lg">{page.title}</span>
              <span className="text-gray-400 text-sm bg-gray-900 px-3 py-1 rounded-full">/{page.slug}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
