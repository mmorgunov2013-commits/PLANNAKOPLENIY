import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата прошла",
  description: "Платёж успешно обработан.",
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Оплата прошла</h1>
        <p className="mt-4 text-slate-300">
          Спасибо! Если после оплаты не пришло письмо со ссылкой на материалы, напишите на почту,
          которую указывали при оплате, или ответьте на письмо магазина — разберёмся.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          На главную
        </Link>
      </section>
    </main>
  );
}
