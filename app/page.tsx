import { FaqAccordion } from "@/components/FaqAccordion";
import { ArticlesCarousel } from "@/components/ArticlesCarousel";
import { PlannerSteps } from "@/components/PlannerSteps";
import { Reveal } from "@/components/Reveal";
import { SpreadsheetMockup } from "@/components/SpreadsheetMockup";
import {
  ArrowRight,
  Baby,
  Brain,
  Check,
  EyeOff,
  Gift,
  GraduationCap,
  Home,
  Layers,
  Lightbulb,
  Plane,
  Quote,
  RotateCw,
  Shield,
  Smartphone,
  TabletSmartphone,
  Target,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";

const buyUrl = "/oplata/";
const articlesUrl = "https://plan-nakopleniy.ru/articles/";
const PRICE = "590 ₽";

export const metadata: Metadata = {
  title: `Планировщик накоплений — понятный план к цели за ${PRICE}`,
  description:
    "Готовая система накоплений: цель, срок, сколько откладывать каждую неделю и наглядный прогресс. Без сложных приложений — личный файл с планировщиком и материалами в поддержку.",
};

const pains = [
  { icon: Wallet, text: "Зарплата приходит, а к концу месяца снова пусто." },
  { icon: Brain, text: "Непонятно, сколько реально откладывать." },
  { icon: RotateCw, text: "Начинаете — и быстро сбиваетесь." },
  { icon: Target, text: "В голове цель есть, а плана нет." },
  { icon: EyeOff, text: "Без прогресса мотивация быстро пропадает." },
  { icon: TabletSmartphone, text: "Сложные приложения только раздражают." },
];

const goals = [
  { icon: Smartphone, label: "Телефон или техника" },
  { icon: Plane, label: "Отпуск" },
  { icon: Home, label: "Ремонт" },
  { icon: GraduationCap, label: "Обучение" },
  { icon: Gift, label: "Подарок" },
  { icon: Shield, label: "Подушка безопасности" },
  { icon: Baby, label: "Цель для ребёнка" },
  { icon: Lightbulb, label: "Небольшой личный проект" },
];

const heroBenefits = [
  "Не нужно считать самому — планировщик подскажет недельный ритм",
  "Видно, сколько осталось до суммы и как движется прогресс",
  "Без регистрации и перегруза: открываете файл и вносите свои цифры",
];

const reviews = [
  {
    text: "Раньше копила «как получится» — теперь вижу сумму в неделю и не чувствую, что всё бессмысленно.",
    tag: "отпуск",
  },
  {
    text: "Для меня важно не приложение, а чтобы было спокойно и наглядно. Зашло.",
    tag: "техника",
  },
  {
    text: "Впервые не бросил через две недели: полоска прогресса реально держит.",
    tag: "подушка",
  },
  {
    text: "С женой задали общую цель по шаблону из бонусов — меньше споров про траты.",
    tag: "семья",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            План<span className="text-accent">накоплений</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#kak-rabotaet" className="transition hover:text-white">
              Как работает
            </a>
            <a href="#vnutri" className="transition hover:text-white">
              Что внутри
            </a>
            <a href="#otzyvy" className="transition hover:text-white">
              Отзывы
            </a>
            <a href="#faq" className="transition hover:text-white">
              Вопросы
            </a>
            <a href={articlesUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Полезные статьи
            </a>
          </nav>
          <a href={buyUrl} className="btn-primary !py-2.5 !px-5 !text-xs sm:!text-sm">
            Забрать за {PRICE}
          </a>
        </div>
      </header>

      <main>
        <section
          id="top"
          className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-hero-gradient pb-16 pt-[5.75rem] sm:pb-24 sm:pt-28 md:pt-32"
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
          <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-12">
              <div className="animate-fade-up">
                <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                  Накопите на важную цель{" "}
                  <span className="bg-gradient-to-r from-gold to-accent-glow bg-clip-text text-transparent">
                    без хаоса
                  </span>{" "}
                  и лишнего напряжения
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Готовый планировщик, который помогает не просто хотеть, а реально двигаться к сумме:
                  с расчётом, наглядным прогрессом и понятным ритмом накоплений.
                </p>
                <p className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {PRICE}{" "}
                  <span className="text-base font-normal text-slate-400 sm:text-lg">
                    — полный комплект
                  </span>
                </p>
                <ul className="mt-6 max-w-xl space-y-2.5 text-sm text-slate-200 sm:text-base">
                  {heroBenefits.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-glow" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={buyUrl} className="btn-primary">
                    Получить планировщик
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a href="#kak-rabotaet" className="btn-secondary">
                    Как это работает
                  </a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-md animate-float-slow lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-gold/10 blur-2xl" />
                <SpreadsheetMockup className="relative z-10 rotate-1 shadow-black/50 transition-transform duration-500 hover:rotate-0" />
                <div className="absolute -right-2 top-6 z-20 flex flex-col gap-2 sm:-right-4">
                  {["Без подписки", "Сразу после оплаты", "Подходит новичкам"].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-white/15 bg-deep-muted/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-200 shadow-lg backdrop-blur sm:text-xs"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-deep-muted/95 px-4 py-3 text-xs text-slate-300 shadow-xl backdrop-blur sm:block">
                  <div className="font-mono text-gold">5 000 ₽ / нед.</div>
                  <div className="text-slate-500">ритм к цели</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="boli" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display mx-auto max-w-3xl text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Если у вас уже было: «хочу накопить, но всё время не получается» — вы не один
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
                Хочу понятный план
              </a>
            </Reveal>
          </div>
        </section>

        <section id="reshenie" className="bg-section-warm py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Не просто файл, а готовая система накоплений под вашу цель
                </h2>
                <p className="mt-4 text-slate-600">
                  Планировщик связывает цель, срок и пополнения: вы не гадаете «сколько отложить», а
                  видите темп и остаток — и можете спокойно скорректировать путь, если неделя вышла
                  не по плану.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Задать цель и сумму",
                    "Указать срок и дату старта",
                    "Увидеть, сколько откладывать регулярно",
                    "Следить за прогрессом",
                    "Корректировать план, если что-то изменилось",
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
                  Что внутри комплекта
                </a>
              </Reveal>
              <Reveal className="relative">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                    В одном взгляде
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-800 sm:text-sm">
                    {["Цель", "Сумма", "Срок", "В неделю", "Прогресс", "Сколько осталось"].map(
                      (label) => (
                        <span
                          key={label}
                          className="rounded-full bg-slate-100 px-3 py-1.5 ring-1 ring-slate-200/80"
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="mt-6 text-center text-sm text-slate-500">
                    Маршрут к сумме: от намерения — к недельному ритму и наглядному движению.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="kak-rabotaet" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <PlannerSteps buyUrl={buyUrl} />
          </div>
        </section>

        <section id="vnutri" className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Внутри всё, чтобы начать без лишних раздумий
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Вы получаете личный файл с планировщиком накоплений — не «просто таблицу», а
                структуру под старт, цель, план и прогресс.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-white p-2 lg:p-3">
                  <SpreadsheetMockup className="border-slate-200 bg-slate-900/80 shadow-lg" />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <ul className="flex flex-col justify-center gap-4">
                  {[
                    "Стартовая страница с понятной логикой",
                    "Блок постановки цели",
                    "Расчёт плана накоплений",
                    "Трекер прогресса",
                    "История пополнений",
                    "Остаток до цели и темп",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-slate-700 shadow-sm"
                    >
                      <Layers className="h-5 w-5 text-accent" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="#bonusy" className="btn-secondary-dark mt-8 inline-flex">
                  Смотреть бонусы
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="bonusy" className="bg-emerald-50/60 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Чтобы вы не просто скачали, а реально дошли до цели
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Три материала в комплекте — про первые недели, мягкие находки в бюджете и разговор в
                паре или семье.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "1",
                  title: "Мини-гайд «Как не сорваться в первые недели»",
                  desc: "Коротко и по делу: как удержать ритм, когда хочется сорваться.",
                },
                {
                  n: "2",
                  title: "Чек-лист «Где найти 500–2000 ₽ в месяц без боли»",
                  desc: "Идеи, где смягчить траты без ощущения жёсткой экономии.",
                },
                {
                  n: "3",
                  title: "Шаблон «Как обсуждать общую цель в семье»",
                  desc: "Структура разговора, чтобы договориться и не спорить из угла в угол.",
                },
              ].map((b, i) => (
                <Reveal key={b.n} delay={i * 70}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                    <span className="absolute right-4 top-4 rotate-3 rounded bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-deep">
                      в подарок
                    </span>
                    <Gift className="h-8 w-8 text-accent" aria-hidden />
                    <p className="mt-3 text-xs font-semibold text-accent-dim">Материал №{b.n}</p>
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
                Забрать комплект за {PRICE}
              </a>
            </Reveal>
          </div>
        </section>

        <section id="dlya-kogo" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Подходит не для абстрактного «копить», а для реальных жизненных целей
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Задаёте свою сумму и срок — планировщик подстроится под задачу, большую или
                небольшую.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {goals.map((g, i) => (
                <Reveal key={g.label} delay={i * 40}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-100">
                      <g.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-medium text-slate-800">{g.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <a href={buyUrl} className="btn-secondary-dark">
                Это про мою цель
              </a>
            </Reveal>
          </div>
        </section>

        <section id="izmeneniya" className="bg-milk py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                После покупки у вас появится не мотивация на один день, а понятный маршрут
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {[
                "Станет ясно, сколько откладывать",
                "Цель перестанет быть абстрактной",
                "Появится ориентир на каждую неделю",
                "Будет легче отказываться от лишних трат",
                "Вы увидите прогресс — меньше шансов бросить",
                "Накопления станут спокойнее и понятнее",
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

        <section id="otzyvy" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Люди хотят так же, как вы: ясность и движение, а не очередное приложение
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500">
                Примеры формулировок в духе отзывов — иллюстрация, как обычно описывают опыт. Когда
                появятся реальные отзывы с площадки или почты, их можно заменить один к одному.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Как выглядит прогресс
                  </p>
                  <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>К цели</span>
                      <span className="font-mono text-slate-700">62%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-500 to-accent" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Осталось</span>
                      <span className="font-mono font-medium text-slate-800">45 600 ₽</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    Мини-кейсы: коплю на телефон · коплю на отпуск · впервые откладываю системно
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((r, i) => (
                  <Reveal key={r.tag} delay={i * 60}>
                    <blockquote className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                      <Quote className="h-8 w-8 text-accent/40" aria-hidden />
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.text}</p>
                      <footer className="mt-3 text-xs font-medium text-slate-400">
                        — пример: {r.tag}
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="mt-12 text-center">
              <a href={buyUrl} className="btn-primary">
                Хочу такой же порядок в накоплениях
              </a>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-20 sm:py-28">
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
                Забрать планировщик
              </a>
            </Reveal>
          </div>
        </section>

        <section id="articles-soon" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
                Интересные статьи
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">Свежие материалы из раздела статей.</p>
              <ArticlesCarousel />
            </Reveal>
          </div>
        </section>

        <section
          id="order"
          className="relative overflow-hidden bg-hero-gradient py-24 sm:py-32"
        >
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Начните двигаться к своей цели уже сегодня
                </h2>
                <p className="mt-5 text-lg text-slate-300">
                  Получите готовый планировщик накоплений и дополнительные материалы, которые помогут
                  не просто начать, а дойти до результата.
                </p>
                <p className="mt-4 font-display text-2xl text-white">{PRICE}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={buyUrl} className="btn-primary">
                    Забрать комплект
                  </a>
                  <a href="#vnutri" className="btn-secondary">
                    Что входит в комплект
                  </a>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-end">
                  <SpreadsheetMockup className="max-w-sm flex-1" />
                  <div className="flex shrink-0 flex-col gap-2">
                    {["Гайд", "Чек-лист", "Шаблон для семьи"].map((label) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 backdrop-blur"
                      >
                        <Gift className="h-4 w-4 text-gold" aria-hidden />
                        {label}
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
        <p>© {new Date().getFullYear()} План накоплений. Все права защищены.</p>
        <p className="mt-2 text-xs">
          Информация на странице носит ознакомительный характер и не является финансовой
          консультацией.
        </p>
      </footer>
    </>
  );
}
