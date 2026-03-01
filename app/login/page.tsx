import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function LoginPage() {
  async function login(formData: FormData) {
    'use server';
    const password = formData.get('password');
    if (password === 'ilham123') { // Ganti password lu di sini
      (await cookies()).set('admin_session', 'true', { httpOnly: true });
      redirect('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <form action={login} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-black mb-6 text-center text-blue-600">ADMIN LOGIN</h1>
        <input name="password" type="password" placeholder="Password..." className="w-full p-4 border rounded-2xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none" required />
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all">MASUK DASHBOARD</button>
      </form>
    </div>
  );
}
