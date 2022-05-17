import { formOptions } from "../currentForm";

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

export function programTitle(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.reading:
    case formOptions.severeReadingPracticum:
      return "Reading Program";
    case formOptions.severeMLSPracticum:
      return "Math/Life Skills Program";
    default:
      return "Program";
  }
}

export function studentTitle(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.studentTeaching:
    case formOptions.STRubric:
      return "Student Teacher";
    case formOptions.teacherCandidate:
      return "Teacher Candidate";
    default:
      return "Practicum Student";
  }
}

export function superior(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.practicumChecklist:
      return "District Coach";
    case formOptions.teacherCandidate:
      return "Evaluator Name and Role";
    default:
      return "Supervisor / Coach";
  }
}

export function dateLabel(currentForm: formOptions) {
  switch (currentForm) {
    case formOptions.practicumChecklist:
    case formOptions.STRubric:
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
