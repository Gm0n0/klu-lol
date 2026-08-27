import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <h1 className="text-6xl font-bold text-cyan-500 mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">KLU.LOL</h1>
      <p className="text-xl text-zinc-400 mb-8">Secure your unique bio link today.</p>
      <div className="flex gap-4">
        <Link href="/signup" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 transition-colors">
          Claim your link
        </Link>
        <Link href="/login" className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded hover:border-cyan-500 transition-colors">
          Login
        </Link>
      </div>
    </main>
  );
}
