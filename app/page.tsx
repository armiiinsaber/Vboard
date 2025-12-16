import SignInCard from "@/components/SignInCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-950">
          <h1 className="text-2xl font-semibold">You are signed in</h1>
          <p className="text-zinc-300 mt-2">Go to your vision board.</p>
          <Link className="inline-block mt-4 rounded-xl bg-white text-black px-4 py-2" href="/app">
            Open app
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-950">
        <h1 className="text-3xl font-semibold">Vision Board</h1>
        <p className="text-zinc-300 mt-2">
          Set 5 goals. Update them as life changes. Still win the year.
        </p>
      </div>

      <div className="mt-6">
        <SignInCard />
      </div>

      <div className="mt-10 text-sm text-zinc-500">Built with Supabase and Vercel.</div>
    </main>
  );
}
