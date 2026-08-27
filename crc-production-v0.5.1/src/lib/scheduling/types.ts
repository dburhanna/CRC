export type ISODate = `${number}-${number}-${number}`;
export type RotationMode = "fixed_date" | "instructional_day";

export interface AcademicYear {
  name: string;
  startDate: ISODate;
  endDate: ISODate;
  timeZone: string;
}

export interface ScheduleCycle {
  labels: string[];
  rotationMode: RotationMode;
  anchorDate: ISODate;
  anchorCycleLabel: string;
}

export interface CalendarException {
  date: ISODate;
  description: string;
  effect: "no_school" | "informational";
}

export interface SectionException {
  date: ISODate;
  description: string;
  effect: "cancel_meeting";
}

export interface SpecialScheduleOverride {
  date: ISODate;
  description: string;
  meetingPeriods: string[];
}

export interface Section {
  id: string;
  courseName: string;
  sectionName: string;
  periodCode?: string;
  meetingCycleLabels: string[];
}

export type SourceRule =
  | "academic_year"
  | "weekday_rule"
  | "school_closure"
  | "special_schedule"
  | "meeting_pattern"
  | "section_exception";

export interface ScheduleDecision {
  date: ISODate;
  cycleLabel: string | null;
  included: boolean;
  reason: string;
  sourceRule: SourceRule;
}

export interface ScheduleEvaluationInput {
  academicYear: AcademicYear;
  cycle: ScheduleCycle;
  calendarExceptions: CalendarException[];
  sectionExceptions: SectionException[];
  specialScheduleOverrides?: SpecialScheduleOverride[];
  section: Section;
  rangeStart: ISODate;
  rangeEnd: ISODate;
}
