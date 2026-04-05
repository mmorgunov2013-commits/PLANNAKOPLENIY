import { TrendingUp } from "lucide-react";

export function SpreadsheetMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 text-[10px] font-medium tracking-wide text-slate-400">
          План накоплений
        </span>
      </div>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-px bg-slate-700/50 p-2 text-[10px] sm:text-xs">
        <div className="bg-slate-800 p-1.5 text-slate-500" />
        <div className="bg-slate-800 p-1.5 font-medium text-slate-400">A</div>
        <div className="bg-slate-800 p-1.5 font-medium text-slate-400">B</div>
        <div className="bg-slate-800 p-1.5 font-medium text-slate-400">C</div>

        <div className="bg-slate-800 p-1.5 text-center text-slate-500">1</div>
        <div className="bg-emerald-500/20 p-1.5 font-semibold text-emerald-300">Цель</div>
        <div className="bg-slate-800/90 p-1.5 text-white">Отпуск</div>
        <div className="bg-slate-800/90 p-1.5" />

        <div className="bg-slate-800 p-1.5 text-center text-slate-500">2</div>
        <div className="bg-slate-800/90 p-1.5 text-slate-300">Сумма</div>
        <div className="bg-slate-800/90 p-1.5 font-mono text-gold">120 000 ₽</div>
        <div className="bg-slate-800/90 p-1.5" />

        <div className="bg-slate-800 p-1.5 text-center text-slate-500">3</div>
        <div className="bg-slate-800/90 p-1.5 text-slate-300">Срок</div>
        <div className="bg-slate-800/90 p-1.5 font-mono text-white">24 нед.</div>
        <div className="bg-slate-800/90 p-1.5" />

        <div className="bg-slate-800 p-1.5 text-center text-slate-500">4</div>
        <div className="bg-slate-800/90 p-1.5 text-slate-300">В неделю</div>
        <div className="bg-slate-800/90 p-1.5 font-mono text-gold">5 000 ₽</div>
        <div className="bg-slate-800/90 p-1.5" />

        <div className="bg-slate-800 p-1.5 text-center text-slate-500">5</div>
        <div className="col-span-3 bg-gradient-to-r from-emerald-500/15 to-transparent p-2">
          <div className="mb-0.5 flex justify-between text-[9px] text-slate-500 sm:text-[10px]">
            <span>Осталось собрать</span>
            <span className="font-mono text-slate-300">45 600 ₽</span>
          </div>
          <div className="mb-1 flex items-center justify-between text-slate-400">
            <span>Прогресс</span>
            <span className="font-mono text-emerald-400">62%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-500 to-accent-glow animate-pulse-soft"
              style={{ animationDuration: "2.8s" }}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-accent/20 px-2 py-1 text-[10px] font-semibold text-accent-glow">
        <TrendingUp className="h-3 w-3" aria-hidden />
        рост
      </div>
    </div>
  );
}
