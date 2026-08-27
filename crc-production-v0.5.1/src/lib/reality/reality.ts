export interface CurriculumUnit {
  title: string;
  estimatedPeriods: number;
}

export type RiskStatus = "comfortable" | "tight" | "exact" | "at_risk" | "impossible_as_planned";

export interface RealityResult {
  availablePeriods: number;
  plannedPeriods: number;
  instructionalMargin: number;
  riskStatus: RiskStatus;
}

export function plannedCurriculumPeriods(units: CurriculumUnit[]): number {
  return units.reduce((sum, unit) => {
    if (!Number.isFinite(unit.estimatedPeriods) || unit.estimatedPeriods < 0) {
      throw new Error(`Invalid period estimate for ${unit.title}.`);
    }
    return sum + unit.estimatedPeriods;
  }, 0);
}

export function riskStatusForMargin(margin: number): RiskStatus {
  if (margin >= 3) return "comfortable";
  if (margin >= 1) return "tight";
  if (margin === 0) return "exact";
  if (margin >= -2) return "at_risk";
  return "impossible_as_planned";
}

export function calculateReality(availablePeriods: number, units: CurriculumUnit[]): RealityResult {
  const plannedPeriods = plannedCurriculumPeriods(units);
  const instructionalMargin = availablePeriods - plannedPeriods;
  return {
    availablePeriods,
    plannedPeriods,
    instructionalMargin,
    riskStatus: riskStatusForMargin(instructionalMargin),
  };
}
