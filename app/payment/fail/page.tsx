import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата не прошла",
  description: "Платёж не завершён или отменён.",
};

export default function PaymentFailPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Оплата не прошла</h1>
        <p className="mt-4 text-slate-300">
          Карта могла быть отклонена банком, не хватило средств или окно оплаты закрыли до завершения.
          Можно попробовать ещё раз — деньги обычно не списываются, если оплата не подтверждена.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/oplata/" className="btn-primary inline-flex">
            Попробовать снова
          </Link>
          <Link href="/" className="btn-secondary inline-flex">
            На главную
          </Link>
        </div>
      </section>
    </main>
  );
}
