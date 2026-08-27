import type { CurriculumUnit } from "../reality/reality";

export interface CurriculumPreset {
  sourceLabel: string;
  estimateNote: string;
  units: CurriculumUnit[];
}

export const apCsaPreset: CurriculumPreset = {
  sourceLabel: "AP Computer Science A syllabus",
  estimateNote: "Period estimates use the midpoint of the syllabus class-period ranges.",
  units: [
    { title: "Primitive Types", estimatedPeriods: 9 },
    { title: "Using Objects", estimatedPeriods: 14 },
    { title: "Boolean Expressions and if Statements", estimatedPeriods: 12 },
    { title: "Iteration", estimatedPeriods: 15 },
    { title: "Writing Classes", estimatedPeriods: 13 },
    { title: "Array", estimatedPeriods: 7 },
    { title: "ArrayList", estimatedPeriods: 11 },
    { title: "2D Array", estimatedPeriods: 11 },
    { title: "Inheritance", estimatedPeriods: 14 },
    { title: "Recursion", estimatedPeriods: 4 },
  ],
};

export const apCspPreset: CurriculumPreset = {
  sourceLabel: "AP Computer Science Principles syllabus",
  estimateNote: "The syllabus gives durations in weeks; CRC converts them at 4 class meetings per week for this initial planning baseline.",
  units: [
    { title: "Digital Information", estimatedPeriods: 12 },
    { title: "The Internet", estimatedPeriods: 8 },
    { title: "Intro to App Design", estimatedPeriods: 12 },
    { title: "Variables, Conditionals, Functions", estimatedPeriods: 16 },
    { title: "Lists, Loops and Traversals", estimatedPeriods: 16 },
    { title: "Algorithms", estimatedPeriods: 12 },
    { title: "Parameters, Return, Libraries", estimatedPeriods: 12 },
    { title: "Create PT Prep / Performance Task", estimatedPeriods: 12 },
    { title: "Data", estimatedPeriods: 8 },
    { title: "Cybersecurity and Global Impacts", estimatedPeriods: 12 },
  ],
};

export const introCsPreset: CurriculumPreset = {
  sourceLabel: "Computer Science 1 syllabus",
  estimateNote: "The syllabus gives durations in weeks; CRC converts them at 4 class meetings per week. The final project is assigned 12 periods as an initial editable planning estimate.",
  units: [
    { title: "Introduction to Python with Turtle Graphics", estimatedPeriods: 24 },
    { title: "Basic Python and Console Interaction", estimatedPeriods: 12 },
    { title: "Boolean Expressions and if Statements", estimatedPeriods: 12 },
    { title: "Iteration / Loops", estimatedPeriods: 12 },
    { title: "Functions", estimatedPeriods: 16 },
    { title: "Strings", estimatedPeriods: 16 },
    { title: "Data Structures", estimatedPeriods: 20 },
    { title: "Further Topics: Classes & Specialized Libraries", estimatedPeriods: 8 },
    { title: "Final Project", estimatedPeriods: 12 },
  ],
};

export const curriculumByCourse: Record<string, CurriculumPreset | undefined> = {
  "AP Computer Science A": apCsaPreset,
  "AP Computer Science Principles": apCspPreset,
  "Introduction to Computer Science": introCsPreset,
};
