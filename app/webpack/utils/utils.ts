import { formOptions } from "../currentForm";
import { Row } from "../types/types";

export const hexToRGBA = (h: string, opacity: number) => {
  let r = "0";
  let g = "0";
  let b = "0";

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgb(" + +r + "," + +g + "," + +b + "," + opacity + ")";
};

export const getPercent = (subtotal: number, total: number): string => {
  const percent = (subtotal / total) * 100;
  return `${!isNaN(percent) ? percent.toFixed(0) : 0}%`;
};

export const overrideRegex = /(!OVERRIDE)=(\d+)/gi;

export const insertIf = (condition: boolean, ...elements: any) => {
  return condition ? elements : [];
};

export function findMaxScore(row: Row) {
  return Math.max(...row.options.map((e) => Number(e.score)));
}

export function programTitle(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.mmReading:
    case formOptions.severeReading:
      return "Reading Program";
    case formOptions.severeMathLifeSkills:
      return "Math/Life Skills Program";
    default:
      return "Program";
  }
}

export function studentTitle(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.studentTeaching:
    case formOptions.studentTeachingRubric:
    case formOptions.cooperatingTeacherChecklist:
      return "Student Teacher";
    case formOptions.teacherCandidate:
      return "Teacher Candidate";
    default:
      return "Practicum Student";
  }
}

export function superior(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.OPTTChecklist:
      return "District Coach";
    case formOptions.teacherCandidate:
      return "Evaluator Name and Role";
    case formOptions.cooperatingTeacherChecklist:
      return "Cooperating/Mentor Teacher";
    case formOptions.earlyIntervention:
      return "Observer";
    default:
      return "Supervisor / Coach";
  }
}

export function dateLabel(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.OPTTChecklist:
    case formOptions.studentTeachingRubric:
    case formOptions.earlyIntervention:
      return "Date";
    default:
      return "Observation Date";
  }
}

export function otherLabel(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.teacherCandidate:
      return "Grade and Subject";
    default:
      return "Other";
  }
}

type areaRange = 1 | 2 | 3 | 4 | 5;

export function feedbackLabel(currentForm: formOptions, area: areaRange) {
  switch (area) {
    case 1:
      switch (currentForm) {
        case formOptions.studentTeachingRubric:
          return "Behavior Assignment Comments";
        default:
          return "Strengths";
      }

    case 2:
      switch (currentForm) {
        case formOptions.studentTeachingRubric:
          return "Collaboration Assignment Comments";
        case formOptions.teacherCandidate:
          return "Areas for Improvement";
        default:
          return "Suggestions";
      }

    case 3:
      switch (currentForm) {
        case formOptions.studentTeachingRubric:
          return "IEP/IFSP Assignment Comments";
        case formOptions.teacherCandidate:
          return "Summary of Performance";
        default:
          return "Next Focus";
      }

    case 4:
      return "Goal 1";

    case 5:
      return "Goal 2";
  }
}

export function arraysEqual(a: any[], b: any[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
