import { evaluateScheduleRange, getInstructionalMeetings } from "../lib/scheduling/evaluate";
import { getCycleLabel } from "../lib/scheduling/rotation";
import { parseISODate } from "../lib/scheduling/date";
import { calculateReality } from "../lib/reality/reality";
import {
  meetingDaysForPeriod,
  sectionForPeriod,
  stAugustineAcademicYear,
  stAugustineClosures,
  stAugustineCycle,
} from "../lib/fixtures/stAugustine2026";

function fail(message: string): never { throw new Error(message); }
function equal<T>(actual: T, expected: T, message = "values differ"): void {
  if (actual !== expected) fail(`${message}: expected ${String(expected)}, got ${String(actual)}`);
}
function deepEqual(actual: unknown, expected: unknown, message = "structures differ"): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) fail(`${message}: expected ${e}, got ${a}`);
}
function exists<T>(value: T | null | undefined, message = "expected value to exist"): T {
  if (value == null) fail(message);
  return value;
}
function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("09/08/2026 is A day", () => {
  equal(getCycleLabel(parseISODate("2026-09-08"), stAugustineCycle, stAugustineClosures), "A");
});

test("fixed-date rotation advances across a no-school weekday", () => {
  const closures = [{ date: "2026-09-09" as const, description: "Test closure", effect: "no_school" as const }];
  equal(getCycleLabel(parseISODate("2026-09-08"), stAugustineCycle, closures), "A");
  equal(getCycleLabel(parseISODate("2026-09-09"), stAugustineCycle, closures), "B");
  equal(getCycleLabel(parseISODate("2026-09-10"), stAugustineCycle, closures), "C");
});

test("weekends do not consume A/B/C/D rotation positions", () => {
  equal(getCycleLabel(parseISODate("2026-09-11"), stAugustineCycle, []), "D");
  equal(getCycleLabel(parseISODate("2026-09-14"), stAugustineCycle, []), "A");
});

test("teacher period mapping matches school rotation", () => {
  deepEqual(meetingDaysForPeriod("B"), ["A", "B", "C"]);
  deepEqual(meetingDaysForPeriod("C"), ["A", "B", "D"]);
  deepEqual(meetingDaysForPeriod("E"), ["A", "C", "D"]);
  deepEqual(meetingDaysForPeriod("H"), ["B", "C", "D"]);
});

test("school closure is excluded but retains its fixed cycle label", () => {
  const input = {
    academicYear: stAugustineAcademicYear,
    cycle: stAugustineCycle,
    calendarExceptions: stAugustineClosures,
    sectionExceptions: [],
    section: sectionForPeriod("C"),
    rangeStart: "2026-10-01" as const,
    rangeEnd: "2026-10-05" as const,
  };
  const decisions = evaluateScheduleRange(input);
  const oct2 = exists(decisions.find((x) => x.date === "2026-10-02"));
  equal(oct2.included, false);
  equal(oct2.sourceRule, "school_closure");
  if (oct2.cycleLabel === null) fail("closure should retain fixed rotation label");
});

test("section-specific cancellation removes only that meeting", () => {
  const base = {
    academicYear: stAugustineAcademicYear,
    cycle: stAugustineCycle,
    calendarExceptions: [],
    section: sectionForPeriod("B"),
    rangeStart: "2026-09-08" as const,
    rangeEnd: "2026-09-08" as const,
  };
  equal(getInstructionalMeetings({ ...base, sectionExceptions: [] }).length, 1);
  equal(getInstructionalMeetings({
    ...base,
    sectionExceptions: [{ date: "2026-09-08", description: "Field trip", effect: "cancel_meeting" }],
  }).length, 0);
});

test("meeting count derives from included decisions", () => {
  const input = {
    academicYear: stAugustineAcademicYear,
    cycle: stAugustineCycle,
    calendarExceptions: stAugustineClosures,
    sectionExceptions: [],
    section: sectionForPeriod("H"),
    rangeStart: "2026-09-08" as const,
    rangeEnd: "2026-10-31" as const,
  };
  const all = evaluateScheduleRange(input);
  const included = all.filter((x) => x.included);
  equal(getInstructionalMeetings(input).length, included.length);
});

test("reality engine classifies -3 as impossible as planned", () => {
  deepEqual(calculateReality(17, [{ title: "Unit 1", estimatedPeriods: 20 }]), {
    availablePeriods: 17,
    plannedPeriods: 20,
    instructionalMargin: -3,
    riskStatus: "impossible_as_planned",
  });
});

console.log("\nCRC Sprint S1 engine checks complete.");
