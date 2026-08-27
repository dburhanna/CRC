import type { ScheduleDecision } from "../scheduling/types";
import type { CurriculumUnit } from "./reality";

export interface UnitProjection {
  title: string;
  estimatedPeriods: number;
  scheduledPeriods: number;
  firstMeeting: string | null;
  lastMeeting: string | null;
  overflowPeriods: number;
}

export function projectCurriculum(units: CurriculumUnit[], meetings: ScheduleDecision[]): UnitProjection[] {
  let cursor = 0;
  return units.map((unit) => {
    const available = Math.max(0, meetings.length - cursor);
    const scheduledPeriods = Math.min(unit.estimatedPeriods, available);
    const firstMeeting = scheduledPeriods > 0 ? meetings[cursor]?.date ?? null : null;
    const lastMeeting = scheduledPeriods > 0 ? meetings[cursor + scheduledPeriods - 1]?.date ?? null : null;
    cursor += scheduledPeriods;
    return {
      title: unit.title,
      estimatedPeriods: unit.estimatedPeriods,
      scheduledPeriods,
      firstMeeting,
      lastMeeting,
      overflowPeriods: unit.estimatedPeriods - scheduledPeriods,
    };
  });
}
