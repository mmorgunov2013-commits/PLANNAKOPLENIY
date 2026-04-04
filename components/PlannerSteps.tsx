"use client";

import { Reveal } from "@/components/Reveal";
import { Calendar, CreditCard, Goal, TrendingUp, type LucideIcon } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STEPS: {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    step: "1",
    title: "Оплата удобным способом",
    desc: "Оплатите картой или другим доступным способом — и сразу получите доступ к файлам.",
    icon: CreditCard,
  },
  {
    step: "2",
    title: "Сумма и старт",
    desc: "Введите сумму цели и дату начала.",
    icon: Goal,
  },
  {
    step: "3",
    title: "Срок в неделях",
    desc: "Укажите, за сколько недель хотите накопить.",
    icon: Calendar,
  },
  {
    step: "4",
    title: "График и контроль",
    desc: "Получите график пополнений и отслеживайте прогресс.",
    icon: TrendingUp,
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
          Как работает планировщик: 4 шага — и у вас уже есть план накоплений
        </h2>
      </Reveal>

      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden overflow-visible lg:block"
          aria-hidden
        >
          {/* Декоративная анимация: обычный img + CSS keyframes */}
          {/* eslint-disable-next-line @next/next/no-img-element -- анимация transform, не LCP */}
          <img src={rublSrc} alt="" className="steps-coin steps-coin-a" />
          {/* eslint-disable-next-line @next/next/no-img-element -- анимация transform, не LCP */}
          <img src={rublSrc} alt="" className="steps-coin steps-coin-b" />
          {/* eslint-disable-next-line @next/next/no-img-element -- анимация transform, не LCP */}
          <img src={rublSrc} alt="" className="steps-coin steps-coin-c" />
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
          Никакой сложной настройки, регистрации и обучения. Просто открыли файл и начали.
        </p>
        <a href={buyUrl} className="btn-primary mt-6">
          Получить планировщик
        </a>
      </Reveal>
    </>
  );
}
