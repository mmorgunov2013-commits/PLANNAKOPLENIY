"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const paymentApiBase = (process.env.NEXT_PUBLIC_PAYMENT_API_URL ?? "").replace(/\/$/, "");
const paymentInitPath =
  (process.env.NEXT_PUBLIC_PAYMENT_INIT_PATH ?? "").trim() || "/payments/tbank/init";
const paymentUrlLegacy = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "";

export default function OplataPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const mode = useMemo(() => {
    if (paymentApiBase.length > 0) return "api" as const;
    if (paymentUrlLegacy.length > 0 && !paymentUrlLegacy.includes("вашсайт.ru")) return "link" as const;
    return "none" as const;
  }, []);

  useEffect(() => {
    if (mode === "link") {
      const timer = window.setTimeout(() => {
        window.location.href = paymentUrlLegacy;
      }, 800);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [mode]);

  async function startPayment() {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch(`${paymentApiBase}${paymentInitPath.startsWith("/") ? "" : "/"}${paymentInitPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await r.json().catch(() => ({}))) as { paymentUrl?: string; error?: string };
      if (!r.ok) throw new Error(data.error || `Ошибка ${r.status}`);
      if (!data.paymentUrl) throw new Error("Нет ссылки на оплату в ответе сервера");
      window.location.href = data.paymentUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось создать платёж");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Переход к оплате</h1>
        {mode === "api" ? (
          <>
            <p className="mt-4 text-slate-300">
              Укажите email — на него отправим материалы после успешной оплаты. Дальше откроется страница банка.
            </p>
            <label className="mt-6 block text-sm text-slate-400">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none ring-accent/30 focus:ring-2"
                placeholder="you@example.com"
                disabled={loading}
              />
            </label>
            <button
              type="button"
              className="btn-primary mt-6 inline-flex w-full justify-center sm:w-auto"
              disabled={loading || email.trim().length < 5}
              onClick={() => void startPayment()}
            >
              {loading ? "Создаём оплату…" : "Перейти к оплате"}
            </button>
            {error ? (
              <>
                <p className="mt-4 text-sm text-red-300/90">{error}</p>
                <button
                  type="button"
                  className="btn-secondary mt-4 inline-flex"
                  onClick={() => {
                    setError(null);
                    setLoading(false);
                  }}
                >
                  Закрыть ошибку
                </button>
              </>
            ) : null}
          </>
        ) : mode === "link" ? (
          <>
            <p className="mt-4 text-slate-300">
              Сейчас автоматически откроем защищенную страницу оплаты.
            </p>
            <a href={paymentUrlLegacy} className="btn-primary mt-6 inline-flex">
              Перейти сейчас
            </a>
          </>
        ) : (
          <>
            <p className="mt-4 text-slate-300">
              Оплата еще не активирована: не настроен адрес платёжного API на GitHub Pages.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              В переменных репозитория задайте
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_API_URL</code>
              (например <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">https://plan-nakopleniy.ru</code>) и
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_INIT_PATH</code>
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">/api/tbank_init.php</code>
              , затем пересоберите сайт. Либо используйте
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_URL</code> для прямой
              ссылки от банка.
            </p>
            <Link href="/" className="btn-secondary mt-6 inline-flex">
              Вернуться на сайт
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
