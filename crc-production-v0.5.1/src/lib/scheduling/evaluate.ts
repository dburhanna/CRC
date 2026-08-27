import { eachDateInclusive, isWeekday, parseISODate, toISODate } from "./date";
import { getCycleLabel } from "./rotation";
import type { ScheduleDecision, ScheduleEvaluationInput } from "./types";

export function evaluateScheduleRange(input: ScheduleEvaluationInput): ScheduleDecision[] {
  const schoolStart = parseISODate(input.academicYear.startDate);
  const schoolEnd = parseISODate(input.academicYear.endDate);
  const rangeStart = parseISODate(input.rangeStart);
  const rangeEnd = parseISODate(input.rangeEnd);

  if (rangeEnd < rangeStart) throw new Error("Range end cannot be before range start.");

  const calendarByDate = new Map(input.calendarExceptions.map((x) => [x.date, x]));
  const sectionByDate = new Map(input.sectionExceptions.map((x) => [x.date, x]));
  const specialByDate = new Map((input.specialScheduleOverrides ?? []).map((x) => [x.date, x]));

  return eachDateInclusive(rangeStart, rangeEnd).map((date): ScheduleDecision => {
    const iso = toISODate(date);

    if (date < schoolStart || date > schoolEnd) {
      return { date: iso, cycleLabel: null, included: false, reason: "Outside academic year", sourceRule: "academic_year" };
    }

    if (!isWeekday(date)) {
      return { date: iso, cycleLabel: null, included: false, reason: "Weekend", sourceRule: "weekday_rule" };
    }

    const cycleLabel = getCycleLabel(date, input.cycle, input.calendarExceptions);
    const schoolException = calendarByDate.get(iso);
    if (schoolException?.effect === "no_school") {
      return {
        date: iso,
        cycleLabel,
        included: false,
        reason: `No school — ${schoolException.description}`,
        sourceRule: "school_closure",
      };
    }

    // A section-specific cancellation is more specific than a school-wide special schedule.
    const sectionException = sectionByDate.get(iso);
    if (sectionException?.effect === "cancel_meeting") {
      return {
        date: iso,
        cycleLabel,
        included: false,
        reason: `Class canceled — ${sectionException.description}`,
        sourceRule: "section_exception",
      };
    }

    // An explicit special schedule replaces the normal A/B/C/D meeting pattern for this date.
    const special = specialByDate.get(iso);
    if (special && input.section.periodCode) {
      const included = special.meetingPeriods.includes(input.section.periodCode);
      return {
        date: iso,
        cycleLabel,
        included,
        reason: included
          ? `Special schedule — ${input.section.sectionName} meets (${special.description})`
          : `Special schedule — ${input.section.sectionName} does not meet (${special.description})`,
        sourceRule: "special_schedule",
      };
    }

    if (!cycleLabel || !input.section.meetingCycleLabels.includes(cycleLabel)) {
      return {
        date: iso,
        cycleLabel,
        included: false,
        reason: `${input.section.sectionName} does not meet on ${cycleLabel ?? "this"} day`,
        sourceRule: "meeting_pattern",
      };
    }

    return {
      date: iso,
      cycleLabel,
      included: true,
      reason: `${input.section.sectionName} meets`,
      sourceRule: "meeting_pattern",
    };
  });
}

export function getInstructionalMeetings(input: ScheduleEvaluationInput): ScheduleDecision[] {
  return evaluateScheduleRange(input).filter((x) => x.included);
}
