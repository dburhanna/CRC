import type { ISODate } from "./types";

const MS_PER_DAY = 86_400_000;

export function parseISODate(value: ISODate): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function toISODate(date: Date): ISODate {
  return date.toISOString().slice(0, 10) as ISODate;
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getTime() + amount * MS_PER_DAY);
}

export function compareDates(a: Date, b: Date): number {
  return a.getTime() - b.getTime();
}

export function isWeekday(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

export function eachDateInclusive(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) dates.push(d);
  return dates;
}
