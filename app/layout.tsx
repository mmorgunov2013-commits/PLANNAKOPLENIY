import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { YandexMetrika } from "@/components/YandexMetrika";
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

const site =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site.endsWith("/") ? site : `${site}/`),
  title: "Планировщик накоплений — понятный план к цели",
  description:
    "Система накоплений на конкретную цель: расчёт ритма, прогресс и остаток. Личный файл-планировщик и материалы в поддержку — без сложных приложений.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Планировщик накоплений — маршрут к вашей цели",
    description:
      "Цель, срок, сколько откладывать и наглядный прогресс в одном месте. Спокойные накопления без хаоса.",
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
      <body className="font-sans">
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
