"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "";

export default function OplataPage() {
  const canRedirect = useMemo(() => {
    return paymentUrl.length > 0 && !paymentUrl.includes("вашсайт.ru");
  }, []);

  useEffect(() => {
    if (!canRedirect) return;
    const timer = window.setTimeout(() => {
      window.location.href = paymentUrl;
    }, 800);
    return () => window.clearTimeout(timer);
  }, [canRedirect]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Переход к оплате</h1>
        {canRedirect ? (
          <>
            <p className="mt-4 text-slate-300">
              Сейчас автоматически откроем защищенную страницу оплаты.
            </p>
            <a
              href={paymentUrl}
              className="btn-primary mt-6 inline-flex"
            >
              Перейти сейчас
            </a>
          </>
        ) : (
          <>
            <p className="mt-4 text-slate-300">
              Оплата еще не активирована: банк проверяет данные магазина.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Как только появится рабочая платежная ссылка, добавим ее в переменную
              <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_PAYMENT_URL</code>
              и кнопка начнет переводить на оплату.
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
