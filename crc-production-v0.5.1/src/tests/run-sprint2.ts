import { curriculumByCourse } from "../lib/fixtures/curriculumPresets";
import { teacherPeriods } from "../lib/fixtures/stAugustine2026";
import { buildCourseReality, buildTeacherReality } from "../lib/reality/courseReality";
import { projectCurriculum } from "../lib/reality/projection";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

const all = buildTeacherReality();
assert(all.length === 6, "dashboard contains all six teaching periods");
assert(all.map((x) => x.period).join(",") === teacherPeriods.join(","), "dashboard preserves configured period order");

for (const period of teacherPeriods) {
  const detail = buildCourseReality(period);
  assert(detail.meetingCount === detail.includedDates.length, `Period ${period} count reconciles with authoritative meeting list`);
  assert(detail.meetingCount > 0, `Period ${period} has instructional meetings`);
}

const csa = buildCourseReality("C");
assert(csa.units.length === 10, "AP CSA preset contains 10 syllabus units");
assert(csa.plannedPeriods === 110, "AP CSA midpoint planning total is 110 periods");
assert(curriculumByCourse["AP Computer Science A"]?.units[0]?.title === "Primitive Types", "AP CSA sequence begins with Primitive Types");

const csp = buildCourseReality("H");
assert(csp.units.length === 10, "AP CSP preset contains 10 syllabus units");
assert(csp.plannedPeriods === 120, "AP CSP initial planning total is 120 periods");

const introD = buildCourseReality("D");
const introE = buildCourseReality("E");
assert(introD.units.length === 9 && introE.units.length === 9, "both Intro CS sections receive the same 9-unit preset");
assert(introD.plannedPeriods === 132, "Intro CS initial planning total is 132 periods");

const projection = projectCurriculum([{ title: "A", estimatedPeriods: 2 }], csa.includedDates.slice(0, 2));
assert(projection[0]?.scheduledPeriods === 2 && projection[0]?.overflowPeriods === 0, "projection maps periods onto meeting dates");

const expectedCounts: Record<string, number> = { B: 121, C: 124, D: 124, E: 120, F: 120, H: 118 };
for (const [period, expected] of Object.entries(expectedCounts)) {
  assert(buildCourseReality(period).meetingCount === expected, `Period ${period} provisional annual meeting count remains ${expected}`);
}
assert(csa.instructionalMargin === 14, "AP CSA provisional margin is +14 periods");
assert(introD.instructionalMargin === -8, "Period D Intro CS provisional margin is -8 periods");
assert(introE.instructionalMargin === -12, "Period E Intro CS provisional margin is -12 periods");
assert(csp.instructionalMargin === -2, "AP CSP provisional margin is -2 periods");

const counts = Object.fromEntries(all.map((x) => [x.period, x.meetingCount]));
console.log("\nAnnual meeting counts (before special-schedule overrides):", counts);
console.log("Sprint S2 checks complete.");
