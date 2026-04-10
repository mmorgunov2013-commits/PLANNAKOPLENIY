"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const paymentApiBase = (process.env.NEXT_PUBLIC_PAYMENT_API_URL ?? "").replace(/\/$/, "");
const paymentUrlLegacy = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "";

export default function OplataPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    if (mode !== "api") return undefined;

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(`${paymentApiBase}/payments/tbank/init`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        });
        const data = (await r.json().catch(() => ({}))) as { paymentUrl?: string; error?: string };
        if (!r.ok) throw new Error(data.error || `Ошибка ${r.status}`);
        if (!data.paymentUrl) throw new Error("Нет ссылки на оплату в ответе сервера");
        if (!cancelled) window.location.href = data.paymentUrl;
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Не удалось создать платёж");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Переход к оплате</h1>
        {mode === "api" ? (
          <>
            <p className="mt-4 text-slate-300">
              {loading && !error
                ? "Создаём безопасную сессию оплаты…"
                : error
                  ? "Не получилось открыть оплату."
                  : "Перенаправляем на страницу банка…"}
            </p>
            {error ? (
              <>
                <p className="mt-3 text-sm text-red-300/90">{error}</p>
                <button
                  type="button"
                  className="btn-primary mt-6 inline-flex"
                  onClick={() => window.location.reload()}
                >
                  Повторить
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
              После деплоя бэкенда на Render добавьте переменную
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_API_URL</code>
              (URL сервиса на Render) в настройках репозитория → Actions variables, затем пересоберите
              сайт. Либо временно используйте
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_URL</code>
              для прямой ссылки «оплата по ссылке».
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
