import { FaqAccordion } from "@/components/FaqAccordion";
import { PlannerSteps } from "@/components/PlannerSteps";
import { Reveal } from "@/components/Reveal";
import { SpreadsheetMockup } from "@/components/SpreadsheetMockup";
import {
  ArrowRight,
  Calendar,
  Check,
  FileSpreadsheet,
  Gift,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Plane,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const buyUrl = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "#order";

export const metadata: Metadata = {
  title: "Планировщик накоплений в Excel — на цель за 690₽ | График, прогресс",
  description:
    "Простой Excel для накоплений на любую цель: телефон, отпуск, ремонт. Рассчитывает сколько откладывать в неделю, строит график, показывает прогресс.",
};

const pains = [
  {
    icon: Wallet,
    text: "Зарплата приходит, а к концу месяца почти ничего не остаётся.",
  },
  {
    icon: Target,
    text: "Непонятно, сколько откладывать, чтобы реально накопить к сроку.",
  },
  {
    icon: Calendar,
    text: "Начинаешь копить — и через неделю всё сбивается.",
  },
  {
    icon: FileSpreadsheet,
    text: "В приложениях сложно, а в заметках неудобно и хаотично.",
  },
  {
    icon: TrendingUp,
    text: "Хочется видеть прогресс, чтобы не бросать.",
  },
];

const goals = [
  { icon: Smartphone, label: "Техника или телефон" },
  { icon: Plane, label: "Отпуск или поездка" },
  { icon: GraduationCap, label: "Образование или курс" },
  { icon: Wrench, label: "Ремонт, подарок, крупная покупка" },
  { icon: Shield, label: "Подушка безопасности" },
  { icon: HeartHandshake, label: "Цель для ребёнка или семьи" },
];

export default function HomePage() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-white"
          >
            План<span className="text-accent">накоплений</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#kak-rabotaet" className="transition hover:text-white">
              Как работает
            </a>
            <a href="#vnutri" className="transition hover:text-white">
              Что внутри
            </a>
            <a href="#faq" className="transition hover:text-white">
              Вопросы
            </a>
          </nav>
          <a href={buyUrl} className="btn-primary !py-2.5 !px-5 !text-xs sm:!text-sm">
            Купить
          </a>
        </div>
      </header>

      <main>
        {/* Блок 1 — Hero */}
        <section
          id="top"
          className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-hero-gradient pb-16 pt-[5.75rem] sm:pb-24 sm:pt-28 md:pt-32"
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
          <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-12">
            <div className="animate-fade-up">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
                Excel + 3 бонусных файла
              </p>
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Планируйте накопления на цель в Excel —{" "}
                <span className="bg-gradient-to-r from-gold to-accent-glow bg-clip-text text-transparent">
                  сколько откладывать
                </span>
                , когда и как быстро придёте к сумме
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Простой шаблон для тех, у кого деньги «утекают», нет системы и хочется наконец
                накопить без хаоса, стресса и сложных приложений.{" "}
                <strong className="font-semibold text-white">
                  Не таблица ради таблицы — а контроль, ясность и ощущение движения к цели.
                </strong>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                Если вы искали,{" "}
                <span className="text-slate-200">как накопить деньги</span> на конкретную покупку
                или подушку, — <span className="text-slate-200">план накоплений на цель</span> в
                привычном <span className="text-slate-200">Excel для накоплений</span> помогает
                удержать фокус: сумма, срок и недельный ритм в одном месте.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={buyUrl} className="btn-primary">
                  Перейти к покупке
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#kak-rabotaet" className="btn-secondary">
                  Посмотреть, как работает
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md animate-float-slow lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-gold/10 blur-2xl" />
              <SpreadsheetMockup className="relative z-10 rotate-1 shadow-black/50 transition-transform duration-500 hover:rotate-0" />
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-deep-muted/95 px-4 py-3 text-xs text-slate-300 shadow-xl backdrop-blur sm:block">
                <div className="font-mono text-gold">≈ 5 000 ₽ / нед.</div>
                <div className="text-slate-500">к отпуску за 24 недели</div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Блок 2 — Боль */}
        <section id="boli" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display mx-auto max-w-3xl text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Если у вас уже было: «хочу копить, но не понимаю как» — этот планировщик для вас
              </h2>
            </Reveal>
            <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {pains.map((item, i) => (
                <Reveal key={item.text} delay={i * 60}>
                  <li className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-shadow hover:shadow-md hover:shadow-slate-200/50">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-sm ring-1 ring-slate-100">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {item.text}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-12 text-center">
              <a href={buyUrl} className="btn-primary">
                Хочу такой план
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 3 — Решение */}
        <section id="reshenie" className="bg-section-warm py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Один файл — чтобы превратить «хочу накопить» в понятный план
                </h2>
                <p className="mt-4 text-slate-600">
                  <strong className="text-slate-900">Планировщик накоплений</strong> связывает цель,
                  срок и регулярные пополнения: вы не гадаете «сколько отложить», а видите цифру и
                  график — это снижает тревогу и помогает не срываться.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Задать цель накопления и желаемую сумму",
                    "Указать дату начала",
                    "Выбрать срок в неделях",
                    "Увидеть, сколько нужно откладывать",
                    "Отслеживать прогресс по неделям",
                    "Не терять мотивацию на полпути",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#vnutri"
                  className="btn-secondary-dark mt-10 inline-flex border-slate-200 bg-cream"
                >
                  Смотреть состав файла
                </a>
              </Reveal>
              <Reveal className="relative">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Логика в одном взгляде
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-800">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">Цель</span>
                    <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">Срок</span>
                    <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">Сумма</span>
                    <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-accent-dim">
                      График
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                    <span className="rounded-full bg-gold/15 px-3 py-1.5 text-amber-900">
                      Прогресс
                    </span>
                  </div>
                  <p className="mt-6 text-center text-sm text-slate-500">
                    Всё реально, если есть простой план — без давления и перегруза.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Блок 4 — Как работает */}
        <section id="kak-rabotaet" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <PlannerSteps buyUrl={buyUrl} />
          </div>
        </section>

        {/* Блок 5 — Для кого */}
        <section id="dlya-kogo" className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Для каких целей подходит: копите на то, что важно именно вам
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Подойдёт, если вы хотите копить на покупки, отдых, обучение или запас на случай
                непредвиденных расходов.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((g, i) => (
                <Reveal key={g.label} delay={i * 50}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-milk text-slate-700 ring-1 ring-slate-100">
                      <g.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-medium text-slate-800">{g.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8 text-center text-sm text-slate-500">
              Планировщик можно использовать для любой цели — от маленькой до большой.
            </Reveal>
            <Reveal className="mt-8 text-center">
              <a href={buyUrl} className="btn-secondary-dark">
                Да, это мне подходит
              </a>
            </Reveal>

            <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Накопить на телефон
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Задаёте цену модели и срок — видите недельный взнос и остаток до цели, проще не
                размывать бюджет импульсными тратами.
              </p>
              <h3 className="font-display mt-6 text-lg font-semibold text-slate-900">
                Накопить на отпуск
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Сумма поездки делится на недели: понятно, сколько откладывать, чтобы выехать в
                запланированные даты.
              </p>
              <h3 className="font-display mt-6 text-lg font-semibold text-slate-900">
                Подушка безопасности
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Фиксируете целевой запас и движетесь маленькими шагами — прогресс наглядный, меньше
                шансов бросить «на середине».
              </p>
            </div>
          </div>
        </section>

        {/* Блок 6 — Почему не получается */}
        <section
          id="pochemu"
          className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-white sm:text-3xl">
                Почему не получается копить: часто дело не в доходе, а в отсутствии системы
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
                Люди чаще всего срываются не потому, что «мало зарабатывают», а потому что копят без
                ясной цели и без картины прогресса.
              </p>
            </Reveal>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                "Копят без конкретной цели и дедлайна",
                "Не знают, сколько откладывать каждую неделю",
                "Не видят прогресса — мотивация пропадает",
                "Держат план «в голове» — он ломается от быта",
                "Не разделяют деньги по задачам — всё смешивается",
              ].map((t, i) => (
                <Reveal key={t} delay={i * 50}>
                  <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {t}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10 text-center text-sm text-slate-400">
              Планировщик помогает убрать хаос и сделать накопление привычкой — без лишней вины за
              «срывы».
            </Reveal>
            <Reveal className="mt-8 text-center">
              <a href={buyUrl} className="btn-primary">
                Хочу порядок в деньгах
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 7 — Что внутри */}
        <section id="vnutri" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Внутри — не просто таблица, а готовая система накоплений
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-2 lg:p-3">
                  <SpreadsheetMockup className="border-slate-200 bg-white shadow-lg" />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <ul className="flex flex-col justify-center gap-4">
                  {[
                    "Страница с целью и сроком",
                    "Расчёт необходимых пополнений",
                    "График накопления",
                    "Прогресс по цели",
                    "Удобные поля для изменения параметров",
                    "Визуальный контроль движения к сумме",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-slate-700 shadow-sm"
                    >
                      <FileSpreadsheet className="h-5 w-5 text-accent" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="#bonusy" className="btn-secondary-dark mt-8 inline-flex">
                  Посмотреть пример внутри
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Блок 8 — Бонусы */}
        <section id="bonusy" className="bg-emerald-50/60 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                При покупке вы получите ещё 3 бонусных файла
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Вместе с планировщиком — материалы, чтобы не просто скачать файл, а реально начать
                копить.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "1",
                  title: "Практика старта",
                  desc: "Пошагово помогает включиться в накопления без перегруза.",
                },
                {
                  n: "2",
                  title: "Лайфхаки без срывов",
                  desc: "Идеи, как удерживать ритм, если неделя выдалась дорогой.",
                },
                {
                  n: "3",
                  title: "Дисциплина и прогресс",
                  desc: "Советы, как не бросить и закрепить привычку.",
                },
              ].map((b, i) => (
                <Reveal key={b.n} delay={i * 70}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                    <span className="absolute right-4 top-4 rotate-3 rounded bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-deep">
                      в подарок
                    </span>
                    <Gift className="h-8 w-8 text-accent" aria-hidden />
                    <p className="mt-3 text-xs font-semibold text-accent-dim">Бонус №{b.n}</p>
                    <h3 className="font-display mt-1 text-lg font-semibold text-slate-900">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <a href={buyUrl} className="btn-primary">
                Забрать комплект
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 9 — Сценарии */}
        <section id="stsenarii" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Как люди обычно используют планировщик
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Коплю на телефон",
                  result: "Задаю сумму, смотрю срок, откладываю по плану — вижу, сколько осталось.",
                },
                {
                  title: "Коплю на отпуск",
                  result:
                    "Вижу, сколько нужно в неделю, и проще не тратить лишнее на импульсные покупки.",
                },
                {
                  title: "Коплю на подушку",
                  result: "Фиксирую цель и начинаю с комфортных сумм — прогресс не бросаю.",
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <article className="h-full rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm">
                    <h3 className="font-display text-lg font-semibold text-slate-900">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.result}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <a href={buyUrl} className="btn-secondary-dark">
                Начать по своему сценарию
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 10 — Почему Excel */}
        <section id="excel" className="bg-deep py-20 text-white sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Почему Excel — это удобно
                </h2>
                <p className="mt-4 text-slate-300">
                  Если сомневаетесь, зачем{" "}
                  <span className="text-white">excel для накоплений</span>, а не очередное
                  приложение — ответ простой: меньше трения, больше контроля у вас на устройстве.
                </p>
                <ul className="mt-8 space-y-3 text-slate-200">
                  {[
                    "Не нужно скачивать отдельное приложение",
                    "Не нужна регистрация",
                    "Файл открывается в привычной среде",
                    "Данные храните у себя",
                    "На экране — только то, что важно для вашей цели",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={buyUrl} className="btn-primary mt-10">
                  Хочу в Excel
                </a>
              </Reveal>
              <Reveal delay={120}>
                <div className="relative rounded-3xl border border-white/10 bg-deep-muted/50 p-8 backdrop-blur">
                  <Laptop className="mx-auto h-16 w-16 text-slate-500" aria-hidden />
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {["Без подписки", "Без регистрации", "Всегда под рукой"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Блок 11 — Что изменится */}
        <section id="izmeneniya" className="bg-milk py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Что изменится после покупки
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {[
                "Появится понятный план накоплений на конкретную цель",
                "Станет ясно, сколько откладывать каждую неделю",
                "Будет легче не тратить лишнее — есть ориентир",
                "Появится визуальный прогресс — проще держать ритм",
                "Цель ощущается реальной, а не абстрактной",
                "Проще не бросить на середине: видно, сколько уже сделано",
              ].map((t, i) => (
                <Reveal key={t} delay={i * 40}>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <p className="flex gap-3 text-sm text-slate-700 sm:text-base">
                      <span className="text-accent">✓</span>
                      {t}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12 text-center">
              <a href={buyUrl} className="btn-primary">
                Перейти к оплате
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 12 — FAQ */}
        <section id="faq" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Частые вопросы
              </h2>
            </Reveal>
            <div className="mt-10">
              <FaqAccordion />
            </div>
            <Reveal className="mt-10 text-center">
              <a href={buyUrl} className="btn-primary">
                Купить сейчас
              </a>
            </Reveal>
          </div>
        </section>

        {/* Блок 13 — Финал */}
        <section
          id="order"
          className="relative overflow-hidden bg-hero-gradient py-24 sm:py-32"
        >
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Начните копить на цель уже сегодня
                </h2>
                <p className="mt-5 text-lg text-slate-300">
                  Получите Excel-планировщик накоплений и 3 бонусных файла с практикой и лайфхаками.
                  Задайте цель, срок и начните двигаться к сумме без хаоса.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={buyUrl} className="btn-primary">
                    Перейти к оплате
                  </a>
                  <a href="#vnutri" className="btn-secondary">
                    Посмотреть, что внутри
                  </a>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-end">
                  <SpreadsheetMockup className="max-w-sm flex-1" />
                  <div className="flex shrink-0 flex-col gap-2">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 backdrop-blur"
                      >
                        <Gift className="h-4 w-4 text-gold" aria-hidden />
                        Бонус {n}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} План накоплений в Excel. Все права защищены.</p>
        <p className="mt-2 text-xs">
          Информация на странице носит ознакомительный характер и не является финансовой
          консультацией.
        </p>
      </footer>
    </>
  );
}
