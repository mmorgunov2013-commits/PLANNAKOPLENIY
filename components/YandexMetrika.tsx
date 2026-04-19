"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function getMetrikaId(): number {
  const raw = process.env.NEXT_PUBLIC_YM_ID;
  const fallback = 108609817;
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

/**
 * Загрузка tag.js + init один раз в onLoad, первый hit там же.
 * Смена маршрута (SPA) — отдельный hit в useEffect, когда ym уже есть.
 * Раньше был useSearchParams + один useEffect до появления ym — первый визит часто терялся.
 */
export function YandexMetrika() {
  const id = getMetrikaId();
  const pathname = usePathname();
  const readyRef = useRef(false);

  useEffect(() => {
    if (!readyRef.current || typeof window.ym !== "function") return;
    const path = `${window.location.pathname}${window.location.search}`;
    window.ym(id, "hit", path);
  }, [id, pathname]);

  return (
    <>
      <Script
        id="yandex-metrika-tag"
        src="https://mc.yandex.ru/metrika/tag.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window.ym !== "function") return;
          window.ym(id, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
          });
          readyRef.current = true;
          window.ym(
            id,
            "hit",
            `${window.location.pathname}${window.location.search}`,
          );
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
