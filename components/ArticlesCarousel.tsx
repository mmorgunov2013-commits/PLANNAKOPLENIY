"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ArticleItem = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  imageUrl?: string | null;
};

const FEED_URL = "https://plan-nakopleniy.ru/articles/feed.php?limit=12";
const PAGE_SIZE = 3;

export function ArticlesCarousel() {
  const [items, setItems] = useState<ArticleItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const r = await fetch(FEED_URL, { cache: "no-store" });
        const data = (await r.json()) as { items?: ArticleItem[] };
        if (!active) return;
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch {
        if (!active) return;
        setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  const pages = useMemo(() => Math.max(1, Math.ceil(items.length / PAGE_SIZE)), [items.length]);
  const current = items.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE);

  function prev() {
    setIndex((i) => (i - 1 + pages) % pages);
  }
  function next() {
    setIndex((i) => (i + 1) % pages);
  }

  if (loading) {
    return <p className="mx-auto mt-4 max-w-2xl text-slate-500">Загружаем статьи…</p>;
  }

  if (!items.length) {
    return (
      <p className="mx-auto mt-4 max-w-2xl text-slate-600">
        Скоро здесь будут полезные статьи по накоплениям, финансовой дисциплине и планированию целей.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-3">
        {current.map((a) => (
          <a
            key={a.slug}
            href={`https://plan-nakopleniy.ru/articles/${a.slug}/`}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
          >
            {a.imageUrl ? (
              <img
                src={a.imageUrl}
                alt={a.title}
                className="mb-3 h-36 w-full rounded-xl object-cover"
                loading="lazy"
              />
            ) : null}
            <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{a.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{a.excerpt}</p>
            <p className="mt-3 text-xs text-slate-400">{a.publishedAt}</p>
          </a>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button type="button" onClick={prev} className="btn-secondary-dark !px-3 !py-2" aria-label="Назад">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-slate-500">
          {index + 1} / {pages}
        </span>
        <button type="button" onClick={next} className="btn-secondary-dark !px-3 !py-2" aria-label="Вперед">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <a
        href="https://plan-nakopleniy.ru/articles/"
        target="_blank"
        rel="noreferrer"
        className="btn-secondary-dark mt-6 inline-flex"
      >
        Все статьи
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
