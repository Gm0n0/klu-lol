"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      router.push("/login?registered=true");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-8 bg-black border border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Join KLU.LOL</h2>
      
      {error && <div className="text-red-500 text-sm p-2 bg-red-500/10 border border-red-500/50 rounded">{error}</div>}
      
      <input
        type="email"
        placeholder="Email"
        required
        className="p-3 bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-cyan-500 transition-colors"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      
      <div className="relative">
        <span className="absolute left-3 top-3.5 text-zinc-500">klu.lol/</span>
        <input
          type="text"
          placeholder="username"
          required
          maxLength={8}
          pattern="^[A-Za-z0-9_]{2,8}$"
          title="2-8 characters, letters, numbers, and underscores only"
          className="w-full p-3 pl-16 bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-cyan-500 transition-colors"
          onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase() })}
        />
      </div>

      <input
        type="password"
        placeholder="Password"
        required
        minLength={8}
        className="p-3 bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-cyan-500 transition-colors"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      
      <button 
        disabled={loading}
        className="mt-4 p-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "Claim Username"}
      </button>
    </form>
  );
}
