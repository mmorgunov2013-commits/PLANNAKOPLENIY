import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Планировщик накоплений в Excel — цель, график, прогресс",
  description:
    "Простой Excel для накоплений на любую цель: телефон, отпуск, ремонт. Рассчитывает сколько откладывать в неделю, строит график, показывает прогресс. +3 бонусных файла.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Планировщик накоплений в Excel — на цель, график, прогресс",
    description:
      "План накоплений на цель без хаоса: сумма, срок, недельный взнос и визуальный прогресс в одном файле.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
