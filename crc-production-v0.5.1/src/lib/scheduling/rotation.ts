import { addDays, isWeekday, parseISODate, toISODate } from "./date";
import type { CalendarException, ScheduleCycle } from "./types";

function mod(value: number, length: number): number {
  return ((value % length) + length) % length;
}

function noSchoolDates(exceptions: CalendarException[]): Set<string> {
  return new Set(exceptions.filter((x) => x.effect === "no_school").map((x) => x.date));
}

function countEligibleWeekdays(
  start: Date,
  end: Date,
  closures: Set<string>,
  pauseOnClosures: boolean,
): number {
  let count = 0;
  if (start <= end) {
    for (let d = new Date(start); d < end; d = addDays(d, 1)) {
      if (isWeekday(d) && (!pauseOnClosures || !closures.has(toISODate(d)))) count += 1;
    }
    return count;
  }

  for (let d = addDays(start, -1); d >= end; d = addDays(d, -1)) {
    if (isWeekday(d) && (!pauseOnClosures || !closures.has(toISODate(d)))) count -= 1;
  }
  return count;
}

export function getCycleLabel(
  date: Date,
  cycle: ScheduleCycle,
  exceptions: CalendarException[],
): string | null {
  if (!isWeekday(date)) return null;
  if (cycle.labels.length === 0) throw new Error("Schedule cycle must contain at least one label.");

  const anchorIndex = cycle.labels.indexOf(cycle.anchorCycleLabel);
  if (anchorIndex < 0) throw new Error("Anchor cycle label must exist in schedule cycle labels.");

  const closures = noSchoolDates(exceptions);
  const pauseOnClosures = cycle.rotationMode === "instructional_day";
  const offset = countEligibleWeekdays(
    parseISODate(cycle.anchorDate),
    date,
    closures,
    pauseOnClosures,
  );

  return cycle.labels[mod(anchorIndex + offset, cycle.labels.length)];
}
