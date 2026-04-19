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

const site =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Номер счётчика из Метрики; в GitHub Actions можно задать NEXT_PUBLIC_YM_ID. */
function yandexMetrikaId(): string {
  const raw = (process.env.NEXT_PUBLIC_YM_ID ?? "").trim();
  if (/^\d+$/.test(raw)) return raw;
  return "108609817";
}

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
  const ymId = yandexMetrikaId();
  const ymSnippet = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");ym(${ymId}, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`;

  return (
    <html lang="ru" className={`${jakarta.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: ymSnippet }}
        />
      </head>
      <body className="font-sans">
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${ymId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
