import type { AcademicYear, CalendarException, ScheduleCycle, Section } from "../scheduling/types";

export const stAugustineAcademicYear: AcademicYear = {
  name: "2026-2027",
  startDate: "2026-09-08",
  endDate: "2027-06-04",
  timeZone: "America/New_York",
};

export const stAugustineCycle: ScheduleCycle = {
  labels: ["A", "B", "C", "D"],
  rotationMode: "fixed_date",
  anchorDate: "2026-09-08",
  anchorCycleLabel: "A",
};

export const stAugustineDailyPeriods: Record<string, string[]> = {
  A: ["A", "B", "C", "D", "E", "F"],
  B: ["G", "H", "A", "B", "C", "D"],
  C: ["E", "F", "G", "H", "A", "B"],
  D: ["C", "D", "E", "F", "G", "H"],
};

export const teacherCourses: Record<string, string> = {
  B: "Engineering",
  C: "AP Computer Science A",
  D: "Introduction to Computer Science",
  E: "Introduction to Computer Science",
  F: "Advanced Computer Science",
  H: "AP Computer Science Principles",
};

export function meetingDaysForPeriod(period: string): string[] {
  return Object.entries(stAugustineDailyPeriods)
    .filter(([, periods]) => periods.includes(period))
    .map(([cycleDay]) => cycleDay);
}

export function sectionForPeriod(period: string): Section {
  const courseName = teacherCourses[period];
  if (!courseName) throw new Error(`Unknown teacher period: ${period}`);
  return {
    id: `period-${period.toLowerCase()}`,
    courseName,
    sectionName: `Period ${period}`,
    periodCode: period,
    meetingCycleLabels: meetingDaysForPeriod(period),
  };
}

export const stAugustineClosures: CalendarException[] = [
  ["2026-10-02", "School Closed"],
  ["2026-10-08", "Fall Break"], ["2026-10-09", "Fall Break"], ["2026-10-12", "Fall Break"],
  ["2026-11-06", "Open House — No School"],
  ["2026-11-23", "Thanksgiving Break"], ["2026-11-24", "Thanksgiving Break"], ["2026-11-25", "Thanksgiving Break"], ["2026-11-26", "Thanksgiving Break"], ["2026-11-27", "Thanksgiving Break"],
  ["2026-12-21", "Christmas Break"], ["2026-12-22", "Christmas Break"], ["2026-12-23", "Christmas Break"], ["2026-12-24", "Christmas Break"], ["2026-12-25", "Christmas Break"], ["2026-12-28", "Christmas Break"], ["2026-12-29", "Christmas Break"], ["2026-12-30", "Christmas Break"], ["2026-12-31", "Christmas Break"],
  ["2027-01-01", "Christmas Break"], ["2027-01-18", "MLK Day — No School"],
  ["2027-02-12", "President's Day Break"], ["2027-02-15", "President's Day Break"],
  ["2027-03-24", "Easter Break"], ["2027-03-25", "Easter Break"], ["2027-03-26", "Easter Break"], ["2027-03-29", "Easter Break"], ["2027-03-30", "Easter Break"], ["2027-03-31", "Easter Break"],
  ["2027-04-01", "Easter Break"], ["2027-04-02", "Easter Break"],
  ["2027-05-19", "Study Day — Students Off"], ["2027-05-31", "Memorial Day"],
].map(([date, description]) => ({ date: date as CalendarException["date"], description, effect: "no_school" }));

export const stAugustineSpecialScheduleDates = [
  { date: "2026-10-07", description: "PSATs — 11:30 dismissal" },
  { date: "2026-10-29", description: "Academic Conferences — 12:30 dismissal" },
  { date: "2026-11-05", description: "Open House preparations — 12:30 dismissal" },
  { date: "2026-12-14", description: "Semester exams" },
  { date: "2026-12-15", description: "Semester exams" },
  { date: "2026-12-16", description: "Semester exams" },
  { date: "2026-12-17", description: "Semester exams" },
  { date: "2026-12-18", description: "Make-up exam day" },
  { date: "2027-01-15", description: "MLK Day of Service — noon dismissal" },
  { date: "2027-04-29", description: "12:30 dismissal" },
  { date: "2027-05-17", description: "Underclassmen final exams" },
  { date: "2027-05-18", description: "Underclassmen final exams" },
  { date: "2027-05-20", description: "Final exams — 12:30 dismissal" },
  { date: "2027-05-21", description: "Make-up exam day" },
] as const;

export const teacherPeriods = ["B", "C", "D", "E", "F", "H"] as const;
