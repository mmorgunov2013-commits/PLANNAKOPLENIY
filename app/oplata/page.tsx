"use client";

import { useEffect } from "react";

/** Куда вести с лендинга GitHub Pages — оплата на plan-nakopleniy.ru (тот же хостинг, что PHP API). */
const PAYMENT_PAGE =
  (process.env.NEXT_PUBLIC_PAYMENT_PAGE_URL ?? "").trim() || "https://plan-nakopleniy.ru/oplata/";
const paymentUrlLegacy = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "";

export default function OplataPage() {
  useEffect(() => {
    if (paymentUrlLegacy.length > 0 && !paymentUrlLegacy.includes("вашсайт.ru")) {
      window.location.replace(paymentUrlLegacy);
      return;
    }
    window.location.replace(PAYMENT_PAGE.endsWith("/") ? PAYMENT_PAGE : `${PAYMENT_PAGE}/`);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <p className="text-center text-slate-300">Переход к оплате…</p>
    </main>
  );
}
