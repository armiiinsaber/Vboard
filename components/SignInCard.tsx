"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignInCard() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : `${process.env.APP_URL}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-950">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <p className="text-zinc-300 mt-2">Enter your email. You will get a magic link.</p>

      <form onSubmit={sendLink} className="mt-4 space-y-3">
        <input
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 outline-none"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <button
          disabled={loading}
          className="w-full rounded-xl bg-white text-black px-4 py-3 font-medium disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send magic link"}
        </button>
      </form>

      {sent ? <div className="mt-4 text-sm text-emerald-300">Link sent. Check your inbox.</div> : null}
      {error ? <div className="mt-4 text-sm text-red-300">{error}</div> : null}
    </div>
  );
}
