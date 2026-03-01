import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  async function handleLogin(formData: FormData) {
    "use server";
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // 1. Cek apakah database users masih kosong
    const allUsers = await db.select().from(users);
    
    if (allUsers.length === 0) {
      // 🪄 AUTO-INSTALLER: Kalau kosong, jadikan ini akun Admin Pertama!
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.insert(users).values({
        username,
        password: hashedPassword,
      });
      
      // Kasih tiket masuk (cookie) berlaku 7 hari
      cookies().set("admin_session", "tiket_rahasia_ilham", { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });
      redirect("/admin");
    }

    // 2. Kalau akun udah ada, cocokkin datanya!
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    
    if (user.length > 0) {
      const isValid = await bcrypt.compare(password, user[0].password);
      if (isValid) {
        // Password benar! Kasih tiket masuk
        cookies().set("admin_session", "tiket_rahasia_ilham", { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });
        redirect("/admin");
      }
    }
    
    // Kalau salah, tendang balik ke form dengan pesan error
    redirect("/login?error=true");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-500 tracking-wider">ILHAM.LOG</h1>
          <p className="text-gray-400 mt-2">Masuk ke Dashboard Admin</p>
        </div>
        
        {searchParams.error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
            ⚠️ Username atau Password salah, Bre! Coba lagi.
          </div>
        )}
        
        <form action={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
            <input type="text" name="username" required placeholder="Contoh: bagushkmtr7" className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input type="password" name="password" required placeholder="••••••••" className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-4 transition duration-200">
            Masuk ke Dashboard 🚀
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-600">
          <p>Sistem Keamanan by Si Badak 🦏</p>
        </div>
      </div>
    </div>
  );
}
