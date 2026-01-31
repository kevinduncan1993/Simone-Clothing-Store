"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-black uppercase tracking-tight">
            <span className="text-dark">SIM</span>
            <span className="text-accent">ONE</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-2 border-warm/20 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border-2 border-warm/20 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-dark to-charcoal text-white py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:from-accent hover:to-accent-light transition-all disabled:opacity-50"
          >
            {loading ? "..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
