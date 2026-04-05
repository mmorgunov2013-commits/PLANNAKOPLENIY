"use client";

import { Reveal } from "@/components/Reveal";
import {
  Activity,
  Calendar,
  LineChart,
  Target,
  type LucideIcon,
} from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STEPS: {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    step: "1",
    title: "Задаёте цель и сумму",
    desc: "Формулируете, на что копите и какую сумму хотите собрать — без лишних терминов.",
    icon: Target,
  },
  {
    step: "2",
    title: "Указываете срок и старт",
    desc: "Выбираете, за какой срок хотите дойти до цели, и от какой даты вести отсчёт.",
    icon: Calendar,
  },
  {
    step: "3",
    title: "Получаете понятный ритм",
    desc: "Видите, сколько откладывать регулярно, чтобы уложиться в срок — без ручных расчётов.",
    icon: Activity,
  },
  {
    step: "4",
    title: "Отмечаете пополнения и прогресс",
    desc: "Фиксируете взносы и смотрите, как растёт запас — мотивация держится дольше.",
    icon: LineChart,
  },
];

type PlannerStepsProps = {
  buyUrl: string;
};

export function PlannerSteps({ buyUrl }: PlannerStepsProps) {
  const rublSrc = `${basePath}/rubl.png`;

  return (
    <>
      <Reveal>
        <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
          4 шага — и у вас уже есть понятный план
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          Сначала — ясность и простота. Оплата займёт пару минут, когда вы уже захотите забрать
          планировщик.
        </p>
      </Reveal>

      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden overflow-visible lg:block"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративная анимация */}
          <img src={rublSrc} alt="" className="steps-coin steps-coin--chain" />
        </div>

        <div className="relative z-0 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 70}>
              <div className="relative h-full rounded-2xl border border-slate-100 bg-slate-50/50 p-8 pt-12 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <span className="absolute left-8 top-6 font-display text-5xl font-bold text-slate-200/90">
                  {s.step}
                </span>
                <s.icon className="mb-4 h-8 w-8 text-accent" aria-hidden />
                <h3 className="font-display text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-10 text-center">
        <p className="text-sm text-slate-500">
          Без сложной настройки: открыли файл с планировщиком и внесли свои цифры в понятные поля.
        </p>
        <a href={buyUrl} className="btn-primary mt-6">
          Получить планировщик
        </a>
      </Reveal>
    </>
  );
}
