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
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const diaryDateSet = new Set(diaryDates);
  const cells = [];

  for (let index = 0; index < firstDay; index += 1) cells.push("");
  for (let day = 1; day <= lastDate; day += 1) cells.push(day);

  return (
    <aside className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#5c3a3a]">Calendar</h2>
          <p className="mt-1 text-sm text-[#8b6870]">
            {year} / {String(month + 1).padStart(2, "0")}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onChangeMonth?.(-1)}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f1cbd3] text-[#5c3a3a] hover:bg-[#fff4f7]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeMonth?.(1)}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f1cbd3] text-[#5c3a3a] hover:bg-[#fff4f7]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-[#8b6870]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="py-2 font-semibold">
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
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                day === ""
                  ? "opacity-0"
                  : isSelected
                    ? "bg-[#5c3a3a] text-white"
                    : hasDiary
                      ? "bg-[#f8e1e7] font-semibold text-[#5c3a3a] hover:bg-[#f4c2c2]"
                  : isToday
                    ? "calendar-today text-[#5c3a3a]"
                    : "text-[#5c3a3a] hover:bg-[#fff4f7]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
