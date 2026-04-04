"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ITEMS = [
  {
    q: "Подойдёт ли мне, если я никогда не вёл бюджет?",
    a: "Да. Файл рассчитан на простой старт: задали цель и срок — сразу видно, сколько откладывать.",
  },
  {
    q: "Если доход нестабильный?",
    a: "Можно планировать в удобном темпе и подстраивать суммы под свои реальные недели.",
  },
  {
    q: "Сложно ли пользоваться?",
    a: "Нет. Это готовый шаблон с понятной логикой — открыли в Excel и внесли свои цифры.",
  },
  {
    q: "Можно ли использовать для любой цели?",
    a: "Да: покупка, отпуск, обучение, подушка безопасности, ремонт и другие цели.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="px-1">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-slate-900">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
