import { curriculumByCourse } from "../fixtures/curriculumPresets";
import {
  sectionForPeriod,
  stAugustineAcademicYear,
  stAugustineClosures,
  stAugustineCycle,
  teacherPeriods,
} from "../fixtures/stAugustine2026";
import { evaluateScheduleRange, getInstructionalMeetings } from "../scheduling/evaluate";
import type { ScheduleDecision, SpecialScheduleOverride } from "../scheduling/types";
import { calculateReality, type CurriculumUnit, type RealityResult } from "./reality";
import { projectCurriculum, type UnitProjection } from "./projection";

export interface CourseRealitySummary {
  period: string;
  courseName: string;
  meetingDays: string[];
  meetingCount: number;
  plannedPeriods: number | null;
  instructionalMargin: number | null;
  riskStatus: RealityResult["riskStatus"] | "not_loaded";
  estimateNote: string | null;
}

export interface CourseRealityDetail extends CourseRealitySummary {
  units: CurriculumUnit[];
  projection: UnitProjection[];
  includedDates: ScheduleDecision[];
  excludedDates: ScheduleDecision[];
}

export type CurriculumOverrides = Record<string, CurriculumUnit[]>;

export function buildCourseReality(
  period: string,
  options: { curriculumOverrides?: CurriculumOverrides; specialScheduleOverrides?: SpecialScheduleOverride[] } = {},
): CourseRealityDetail {
  const section = sectionForPeriod(period);
  const input = {
    academicYear: stAugustineAcademicYear,
    cycle: stAugustineCycle,
    calendarExceptions: stAugustineClosures,
    sectionExceptions: [],
    specialScheduleOverrides: options.specialScheduleOverrides ?? [],
    section,
    rangeStart: stAugustineAcademicYear.startDate,
    rangeEnd: stAugustineAcademicYear.endDate,
  };

  const evaluations = evaluateScheduleRange(input);
  const meetings = getInstructionalMeetings(input);
  const preset = curriculumByCourse[section.courseName];
  const units = options.curriculumOverrides?.[section.courseName] ?? preset?.units;

  if (!units) {
    return {
      period,
      courseName: section.courseName,
      meetingDays: section.meetingCycleLabels,
      meetingCount: meetings.length,
      plannedPeriods: null,
      instructionalMargin: null,
      riskStatus: "not_loaded",
      estimateNote: null,
      units: [],
      projection: [],
      includedDates: meetings,
      excludedDates: evaluations.filter((x) => !x.included),
    };
  }

  const reality = calculateReality(meetings.length, units);
  return {
    period,
    courseName: section.courseName,
    meetingDays: section.meetingCycleLabels,
    meetingCount: meetings.length,
    plannedPeriods: reality.plannedPeriods,
    instructionalMargin: reality.instructionalMargin,
    riskStatus: reality.riskStatus,
    estimateNote: preset?.estimateNote ?? "Custom curriculum plan.",
    units,
    projection: projectCurriculum(units, meetings),
    includedDates: meetings,
    excludedDates: evaluations.filter((x) => !x.included),
  };
}

export function buildTeacherReality(
  options: { curriculumOverrides?: CurriculumOverrides; specialScheduleOverrides?: SpecialScheduleOverride[] } = {},
): CourseRealityDetail[] {
  return teacherPeriods.map((period) => buildCourseReality(period, options));
}
