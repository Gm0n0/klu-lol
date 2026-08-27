"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-cyan-400">
          Login to KLU.LOL
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-950/50 border border-red-800 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-600 focus:border-cyan-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-600 focus:border-cyan-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}