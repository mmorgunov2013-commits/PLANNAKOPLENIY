"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ITEMS = [
  {
    q: "Подойдёт ли, если я вообще не умею вести бюджет?",
    a: "Да. Планировщик рассчитан на мягкий старт: вы задаёте цель и срок — дальше подсказывает, сколько откладывать, без сложных терминов.",
  },
  {
    q: "Подойдёт ли при нестабильном доходе?",
    a: "Можно вести план в комфортном темпе и подстраивать суммы под реальные недели, когда доход плавает.",
  },
  {
    q: "Смогу ли я менять цель и сумму?",
    a: "Да. Параметры можно менять — планировщик пересчитает ритм накоплений под новые вводные.",
  },
  {
    q: "Это сложно?",
    a: "Нет. Внутри — понятная структура: старт, цель, план, прогресс. Вы вносите свои цифры в готовые поля.",
  },
  {
    q: "Что я получу после оплаты?",
    a: "Файл с планировщиком накоплений и дополнительные материалы (гайд, чек-лист, шаблон для разговора в семье), чтобы проще дойти до цели.",
  },
  {
    q: "Подойдёт ли для семейных целей?",
    a: "Да: отпуск, крупная покупка, цель для ребёнка. В бонусах есть шаблон, как обсудить общую цель в семье.",
  },
  {
    q: "Можно ли начать с маленьких сумм?",
    a: "Да. Важен регулярный ритм, а не размер с первой недели — планировщик покажет темп под вашу сумму и срок.",
  },
  {
    q: "Нужно ли устанавливать отдельное приложение?",
    a: "Нет. Файл открывается в привычной программе для работы с таблицами на компьютере, без регистрации и подписки.",
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
