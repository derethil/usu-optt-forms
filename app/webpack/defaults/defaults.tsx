import currentForm, { formOptions } from "../currentForm";
import { CheckRow } from "../types/dataTypes";
import { IFormInfo, Location } from "../types/types";

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
};

export const defaultNotebookCheck = {
  numbered: [] as CheckRow[],
  final: [] as CheckRow[],
};
