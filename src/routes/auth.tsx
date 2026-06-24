import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Drive With Renjith" },
      { name: "description", content: "Sign in or create your Drive With Renjith account." },
    ],
  }),
  component: AuthPage,
});

type Tab = "signin" | "signup" | "phone" | "forgot";

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("signin");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onGoogle() {
    setMsg(null);
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    setBusy(false);
    if ((res as any).error) setMsg(String((res as any).error?.message ?? "Sign-in failed"));
    else if (!(res as any).redirected) navigate({ to: "/dashboard" });
  }

  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setBusy(false);
    if (error) setMsg(error.message);
    else navigate({ to: "/dashboard" });
  }

  async function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(f.get("email")),
      password: String(f.get("password")),
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { full_name: String(f.get("full_name") || "") },
      },
    });
    setBusy(false);
    if (error) setMsg(error.message);
    else setMsg("Check your email to confirm your account.");
  }

  async function onForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.resetPasswordForEmail(String(f.get("email")), {
      redirectTo: window.location.origin + "/reset-password",
    });
    setBusy(false);
    setMsg(error ? error.message : "Password reset email sent.");
  }

  const [otpStep, setOtpStep] = useState<"send" | "verify">("send");
  const [otpPhone, setOtpPhone] = useState("");
  async function onSendOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const phone = String(f.get("phone"));
    setOtpPhone(phone);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setBusy(false);
    if (error) setMsg(error.message);
    else { setOtpStep("verify"); setMsg("OTP sent."); }
  }
  async function onVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.verifyOtp({
      phone: otpPhone,
      token: String(f.get("token")),
      type: "sms",
    });
    setBusy(false);
    if (error) setMsg(error.message);
    else navigate({ to: "/dashboard" });
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "signin", label: t("auth_tab_signin") },
    { id: "signup", label: t("auth_tab_signup") },
    { id: "phone", label: t("auth_tab_phone") },
    { id: "forgot", label: t("auth_tab_forgot") },
  ];

  return (
    <Section kicker={t("nav_signin")} title={t("auth_title")} subtitle={t("auth_sub")}>
      <div className="mx-auto max-w-md">
        <button onClick={onGoogle} disabled={busy} className="mb-4 w-full rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold shadow-card transition hover:bg-secondary">
          {t("auth_google")}
        </button>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> {t("auth_or")} <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-4 flex flex-wrap gap-1 rounded-full border border-border bg-secondary p-1 text-xs font-semibold">
          {tabs.map((x) => (
            <button key={x.id} onClick={() => { setTab(x.id); setMsg(null); }} className={`flex-1 rounded-full px-3 py-1.5 transition ${tab === x.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {x.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          {tab === "signin" && (
            <form onSubmit={onSignIn} className="grid gap-3">
              <Field label={t("auth_email")} name="email" type="email" required />
              <Field label={t("auth_password")} name="password" type="password" required />
              <button disabled={busy} className="mt-2 rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("auth_signin_btn")}</button>
            </form>
          )}
          {tab === "signup" && (
            <form onSubmit={onSignUp} className="grid gap-3">
              <Field label={t("auth_full_name")} name="full_name" required />
              <Field label={t("auth_email")} name="email" type="email" required />
              <Field label={t("auth_password")} name="password" type="password" required minLength={6} />
              <button disabled={busy} className="mt-2 rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("auth_signup_btn")}</button>
            </form>
          )}
          {tab === "phone" && (otpStep === "send" ? (
            <form onSubmit={onSendOtp} className="grid gap-3">
              <Field label={t("auth_phone")} name="phone" type="tel" required placeholder="+919447480651" />
              <button disabled={busy} className="mt-2 rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("auth_send_otp")}</button>
            </form>
          ) : (
            <form onSubmit={onVerifyOtp} className="grid gap-3">
              <Field label={t("auth_otp")} name="token" required />
              <button disabled={busy} className="mt-2 rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("auth_verify_otp")}</button>
            </form>
          ))}
          {tab === "forgot" && (
            <form onSubmit={onForgot} className="grid gap-3">
              <Field label={t("auth_email")} name="email" type="email" required />
              <button disabled={busy} className="mt-2 rounded-full bg-orange-gradient px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("auth_forgot_btn")}</button>
            </form>
          )}
          {msg && <p className="mt-3 text-center text-sm text-muted-foreground">{msg}</p>}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to home</Link>
        </p>
      </div>
    </Section>
  );
}

function Field({ label, name, type = "text", required, minLength, placeholder }: { label: string; name: string; type?: string; required?: boolean; minLength?: number; placeholder?: string }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} minLength={minLength} placeholder={placeholder} maxLength={255}
        className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </label>
  );
}
