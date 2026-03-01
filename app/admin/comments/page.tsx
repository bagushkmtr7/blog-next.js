export default function CommentsDashboard() {
  return (
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Moderasi Komentar</h1>
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
        <span className="text-5xl mb-4 block">💬</span>
        <h2 className="text-xl font-semibold mb-2">Belum Ada Komentar</h2>
        <p className="text-gray-400">Nanti lu bisa ngehapus komentar spam atau balesin komentar pengunjung dari sini.</p>
      </div>
    </div>
  );
}
