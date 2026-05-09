import { memo, useMemo } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function CalendarCard({
  diaryDates = [],
  markerTypes = {},
  selectedDate = "",
  displayDate = new Date(),
  onChangeMonth,
  onSelectDate,
}) {
  const today = new Date();
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const monthLabel = `${year} / ${String(month + 1).padStart(2, "0")}`;
  const diaryDateSet = useMemo(() => new Set(diaryDates), [diaryDates]);
  const heartDateSet = useMemo(() => new Set(markerTypes.diaryDates ?? []), [markerTypes.diaryDates]);
  const starDateSet = useMemo(() => new Set(markerTypes.tarotOnlyDates ?? []), [markerTypes.tarotOnlyDates]);
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const nextCells = [];

    for (let index = 0; index < firstDay; index += 1) nextCells.push("");
    for (let day = 1; day <= lastDate; day += 1) nextCells.push(day);
    while (nextCells.length < 42) nextCells.push("");

    return nextCells;
  }, [month, year]);

  return (
    <div className="flex h-full w-full max-w-[640px] flex-col">
      <aside className="flex min-h-0 flex-1 flex-col rounded-3xl bg-[#2a2f4d]/92 p-3 pb-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-5 sm:pb-6 md:p-7 md:pb-7">
        <div className="mb-2 flex shrink-0 items-start justify-center gap-3 sm:mb-4">
          <div>
            <h2 className="text-lg font-bold tracking-[0.08em] text-[#f7f8ff] sm:text-xl">{monthLabel}</h2>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-[auto_repeat(6,minmax(0,1fr))] gap-1 text-center text-[0.86rem] text-slate-300 sm:gap-2 sm:text-[1rem] md:gap-3 md:text-[1.05rem]">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="flex min-h-5 items-center justify-center font-semibold tracking-[0.08em] sm:min-h-6">
              {day}
            </div>
          ))}

          {cells.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const dateKey = day === "" ? "" : formatDate(year, month, day);
            const hasDiary = diaryDateSet.has(dateKey);
            const hasHeartMarker = heartDateSet.has(dateKey);
            const hasStarMarker = starDateSet.has(dateKey);
            const isSelected = selectedDate === dateKey;
            return (
              <button
                key={`${day}-${index}`}
                type="button"
                disabled={day === ""}
                onClick={() => onSelectDate?.(dateKey)}
                className={`relative isolate flex aspect-square h-full max-h-8 w-full max-w-8 items-center justify-center self-center justify-self-center rounded-full text-[0.86rem] transition sm:max-h-10 sm:max-w-10 sm:text-[1rem] md:max-h-11 md:max-w-11 md:text-[1.05rem] ${
                  day === ""
                    ? "opacity-0"
                    : isSelected
                      ? "bg-[#f4c2c2] text-[#2a2f4d]"
                      : isToday
                        ? "calendar-today overflow-hidden text-[#2a2f4d] font-bold"
                        : hasDiary
                          ? "font-semibold text-[#f7f8ff] hover:bg-white/8"
                          : "text-[#f7f8ff] hover:bg-white/8"
                }`}
              >
                {hasDiary && !isSelected ? (
                  hasHeartMarker ? (
                    <Heart
                      className="absolute inset-1/2 -z-10 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 fill-[#f4c2c2]/22 text-[#ffdbe6]/55"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  ) : hasStarMarker ? (
                    <Star
                      className="absolute inset-1/2 -z-10 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 fill-white/12 text-white/30"
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />
                  ) : null
                ) : null}
                <span className="relative z-10">{day}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex shrink-0 items-center justify-between gap-3 px-1 sm:mt-3 sm:px-2">
          <button
            type="button"
            onClick={() => onChangeMonth?.(-1)}
            aria-label="Previous month"
            className="group relative flex h-9 w-11 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(244,194,194,0.12),rgba(216,196,255,0.16))] text-[#f7f8ff] shadow-[0_8px_18px_rgba(0,0,0,0.16),0_0_14px_rgba(244,194,194,0.12)] transition hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/18 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),0_0_20px_rgba(244,194,194,0.22)] md:h-10 md:w-12"
          >
            <span className="absolute left-2 top-1.5 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => onChangeMonth?.(1)}
            aria-label="Next month"
            className="group relative flex h-9 w-11 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(244,194,194,0.12),rgba(216,196,255,0.16))] text-[#f7f8ff] shadow-[0_8px_18px_rgba(0,0,0,0.16),0_0_14px_rgba(216,196,255,0.12)] transition hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/18 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),0_0_20px_rgba(216,196,255,0.22)] md:h-10 md:w-12"
          >
            <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </aside>
    </div>
  );
}

export default memo(CalendarCard);
