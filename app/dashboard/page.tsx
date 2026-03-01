import { db } from '../../db';
import { posts, categories, settings } from '../../db/schema';
import { updateBlogSettings, addCategory, createPost, removePost } from '../actions';
import { desc } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = (await cookies()).get('admin_session');
  if (!session) redirect('/login');

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const allCats = await db.select().from(categories);
  const [config] = await db.select().from(settings).limit(1);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-300 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">I</div>
            <h1 className="font-bold text-white tracking-tight">CONSOLE v1.0</h1>
          </div>
          <a href="/" className="text-xs font-bold bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-800 transition-all">VISIT BLOG</a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sisi Kiri: Configs */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-[#111113] p-6 rounded-2xl border border-slate-800/50">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Global Settings</h2>
              <form action={updateBlogSettings} className="space-y-4">
                <input name="title" defaultValue={config?.title || ''} className="w-full bg-black border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none" placeholder="Site Name" />
                <textarea name="description" defaultValue={config?.description || ''} className="w-full bg-black border border-slate-800 rounded-xl p-3 text-sm h-20 focus:border-blue-500 outline-none" placeholder="Site Meta Description" />
                <button className="w-full bg-white text-black font-bold py-3 rounded-xl text-xs hover:bg-slate-200 transition-all">SAVE CHANGES</button>
              </form>
            </section>

            <section className="bg-[#111113] p-6 rounded-2xl border border-slate-800/50">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Taxonomy</h2>
              <form action={addCategory} className="flex gap-2 mb-4">
                <input name="name" className="flex-1 bg-black border border-slate-800 rounded-xl p-3 text-sm outline-none" placeholder="New Cat..." />
                <button className="bg-blue-600 text-white px-4 rounded-xl font-bold text-xs">ADD</button>
              </form>
              <div className="flex flex-wrap gap-2">
                {allCats.map(c => (
                  <span key={c.id} className="text-[10px] font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md uppercase">{c.name}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Sisi Kanan: CMS */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-[#111113] p-6 rounded-2xl border border-slate-800/50">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Content Editor</h2>
              <form action={createPost} className="space-y-4">
                <input name="title" className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white font-bold outline-none focus:border-blue-500" placeholder="Post Title..." />
                <textarea name="content" className="w-full bg-black border border-slate-800 rounded-xl p-4 text-sm h-40 outline-none focus:border-blue-500" placeholder="Start writing..." />
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all">PUBLISH POST</button>
              </form>
            </section>

            <section className="bg-[#111113] rounded-2xl border border-slate-800/50 overflow-hidden">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Recent Posts</h2>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded font-bold">{allPosts.length} TOTAL</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {allPosts.map(p => (
                  <div key={p.id} className="p-4 flex justify-between items-center hover:bg-slate-900/30 group">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">{p.title}</h3>
                      <p className="text-[10px] text-slate-600 font-bold uppercase">{new Date(p.createdAt!).toLocaleDateString()}</p>
                    </div>
                    <form action={async () => { 'use server'; await removePost(p.id); }}>
                      <button className="opacity-0 group-hover:opacity-100 text-[10px] font-black text-red-500 hover:text-red-400 transition-all">DELETE</button>
                    </form>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
