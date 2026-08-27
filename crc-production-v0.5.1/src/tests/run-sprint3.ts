import { curriculumByCourse } from "../lib/fixtures/curriculumPresets";
import { buildCourseReality, buildTeacherReality, type CurriculumOverrides } from "../lib/reality/courseReality";
import type { SpecialScheduleOverride } from "../lib/scheduling/types";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

// S3 must preserve S2 totals when no edits are supplied.
const baseline = buildTeacherReality();
const expectedCounts: Record<string, number> = { B: 121, C: 124, D: 124, E: 120, F: 120, H: 118 };
for (const [period, expected] of Object.entries(expectedCounts)) {
  assert(baseline.find((x) => x.period === period)?.meetingCount === expected, `S3 preserves Period ${period} baseline count ${expected}`);
}

// A special schedule is authoritative for that date and can include/exclude a period regardless of normal rotation.
const special: SpecialScheduleOverride[] = [
  { date: "2026-10-07", description: "PSAT custom test schedule", meetingPeriods: ["C", "H"] },
];
const csaSpecial = buildCourseReality("C", { specialScheduleOverrides: special });
const introDSpecial = buildCourseReality("D", { specialScheduleOverrides: special });
const cDecision = csaSpecial.includedDates.find((x) => x.date === "2026-10-07");
const dDecision = introDSpecial.excludedDates.find((x) => x.date === "2026-10-07");
assert(cDecision?.sourceRule === "special_schedule", "special schedule can explicitly include Period C");
assert(dDecision?.sourceRule === "special_schedule" && dDecision.included === false, "special schedule can explicitly exclude Period D");

// Curriculum edits must feed the same Reality Engine and immediately change margin.
const csaPreset = curriculumByCourse["AP Computer Science A"]!;
const csaEditedUnits = csaPreset.units.map((unit, index) => index === 0 ? { ...unit, estimatedPeriods: 20 } : { ...unit });
const curriculumOverrides: CurriculumOverrides = { "AP Computer Science A": csaEditedUnits };
const csaEdited = buildCourseReality("C", { curriculumOverrides });
assert(csaEdited.plannedPeriods === 121, "editing AP CSA unit duration changes planned total from 110 to 121");
assert(csaEdited.instructionalMargin === 3, "edited AP CSA plan recalculates instructional margin from +14 to +3");

// Shared course curriculum must apply to both Intro CS sections while keeping separate calendars.
const introPreset = curriculumByCourse["Introduction to Computer Science"]!;
const introEdited: CurriculumOverrides = {
  "Introduction to Computer Science": introPreset.units.map((unit, index) => index === 8 ? { ...unit, estimatedPeriods: 6 } : { ...unit }),
};
const introD = buildCourseReality("D", { curriculumOverrides: introEdited });
const introE = buildCourseReality("E", { curriculumOverrides: introEdited });
assert(introD.plannedPeriods === 126 && introE.plannedPeriods === 126, "one Intro CS curriculum edit updates both D and E sections");
assert(introD.meetingCount !== introE.meetingCount, "shared Intro CS curriculum preserves section-specific meeting calendars");

console.log("Sprint S3 checks complete.");
