import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Drive With Renjith" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Reset,
});

function Reset() {
  const { t } = useI18n();
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.updateUser({ password: String(f.get("password")) });
    setBusy(false);
    setMsg(error ? error.message : t("reset_success"));
  }

  return (
    <Section title={t("reset_title")}>
      <form onSubmit={onSubmit} className="mx-auto grid max-w-md gap-3 rounded-3xl border border-border bg-card p-6 shadow-card">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("auth_password")} *</span>
          <input name="password" type="password" required minLength={6} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30" />
        </label>
        <button disabled={busy} className="rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("reset_btn")}</button>
        {msg && <p className="text-center text-sm text-muted-foreground">{msg}</p>}
      </form>
    </Section>
  );
}
