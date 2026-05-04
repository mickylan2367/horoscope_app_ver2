import { ChevronLeft, ChevronRight } from "lucide-react";

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarCard({
  diaryDates = [],
  selectedDate = "",
  displayDate = new Date(),
  onChangeMonth,
  onSelectDate,
}) {
  const today = new Date();
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const monthLabel = `${year} / ${String(month + 1).padStart(2, "0")}`;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const diaryDateSet = new Set(diaryDates);
  const cells = [];

  for (let index = 0; index < firstDay; index += 1) cells.push("");
  for (let day = 1; day <= lastDate; day += 1) cells.push(day);

  return (
    <aside className="flex h-full w-full max-w-[640px] flex-col rounded-3xl bg-[#2a2f4d]/92 p-7 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm md:p-8">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-[0.08em] text-[#f7f8ff]">{monthLabel}</h2>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onChangeMonth?.(-1)}
            aria-label="Previous month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#f7f8ff] hover:bg-white/8"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeMonth?.(1)}
            aria-label="Next month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#f7f8ff] hover:bg-white/8"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-7 gap-3 text-center text-[1.05rem] text-slate-300 md:gap-4">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="py-2 font-semibold tracking-[0.08em]">
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
          const isSelected = selectedDate === dateKey;
          return (
            <button
              key={`${day}-${index}`}
            type="button"
            disabled={day === ""}
            onClick={() => onSelectDate?.(dateKey)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[1.05rem] transition md:h-12 md:w-12 ${
                day === ""
                  ? "opacity-0"
                : isSelected
                  ? "bg-[#f4c2c2] text-[#2a2f4d]"
                    : hasDiary
                      ? "bg-white/10 font-semibold text-[#f7f8ff] hover:bg-white/14"
                  : isToday
                    ? "calendar-today relative isolate overflow-hidden text-[#2a2f4d] font-bold"
                    : "text-[#f7f8ff] hover:bg-white/8"
              }`}
            >
              <span className="relative z-10">{day}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
