import currentForm, { formOptions } from "../currentForm";
import { IPracticumChecklist } from "../types/dataTypes";
import { IFormInfo, Location } from "../types/types";
import getNotebookCheck from "../utils/notebookCheckUtils";

export const defaultComments = {
  strengths: "",
  suggestions: "",
  nextFocus: "",
};

export type IComments = typeof defaultComments;

export const defaultFormInfo: IFormInfo = {
  studentTeacher: "",
  cooperatingTeacher: "",
  supervisor: "",
  date: new Date().toUTCString(),
  nextDate: new Date().toUTCString(),
  observation: 1,
  other: "",
  program: currentForm === formOptions.studentTeaching ? "Mild/Moderate" : "",
  location: Location.logan,
  goal1: "",
  goal2: "",
};

export const defaultNotebookCheck = {
  numbered: getNotebookCheck(true, 1),
  final: getNotebookCheck(true),
};

// -------- PRACTICUM CHECKLIST --------

const defaultChecklistRow = {
  score: "No",
  comment: "",
};

export const defaultChecklistData: IPracticumChecklist = {
  schedule: defaultChecklistRow,
  targetGroup: defaultChecklistRow,
  lessonInfo: "",
  curriculum: defaultChecklistRow,
  communicationProcedure: defaultChecklistRow,
  paraProcedure: defaultChecklistRow,
  observationDate: defaultChecklistRow,
  additionalInfo: "",
};
