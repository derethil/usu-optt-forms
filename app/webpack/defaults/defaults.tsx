import currentForm, { formOptions } from "../currentForm";

export const defaultComments = {
  strengths: "",
  suggestions: "",
  nextFocus: "",
};

export type IComments = typeof defaultComments;

export const defaultFormInfo = {
  studentTeacher: "",
  cooperatingTeacher: "",
  supervisor: "",
  date: new Date(),
  nextDate: new Date(),
  observation: 1,
  other: "",
  program: currentForm === formOptions.studentTeaching ? "Mild/Moderate" : "",
};
