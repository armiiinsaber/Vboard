import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";

export default async function AppPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/");

  const userId = data.user.id;

  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const { data: goals } = await supabase.from("goal_items").select("*").eq("user_id", userId);

  const { data: history } = await supabase
    .from("goal_item_history")
    .select("*")
    .eq("user_id", userId)
    .order("changed_at", { ascending: false })
    .limit(30);

  return (
    <AppShell
      email={data.user.email ?? ""}
      initialSettings={settings ?? null}
      initialGoals={goals ?? []}
      initialHistory={history ?? []}
    />
  );
}
