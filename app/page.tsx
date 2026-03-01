import { db } from '../db';
import { posts, settings } from '../db/schema';
import { desc } from 'drizzle-orm';

export default async function Home() {
  const [config] = await db.select().from(settings).limit(1);
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <header className="max-w-2xl mx-auto pt-20 pb-12 px-6">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
          {config?.title || 'ILHAM.LOG'}
        </h1>
        <p className="text-slate-500 text-sm font-medium">{config?.description || 'Build with Si Badak'}</p>
      </header>
      
      <main className="max-w-2xl mx-auto px-6 space-y-12 pb-32">
        {allPosts.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <time className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3 block">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Just Now'}
            </time>
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight mb-4">
              {post.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
              {post.content}
            </p>
            <div className="h-[1px] w-full bg-slate-900 group-hover:bg-blue-900/50 transition-colors"></div>
          </article>
        ))}
      </main>
    </div>
  );
}
