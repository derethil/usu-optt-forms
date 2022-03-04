import currentForm, { formOptions } from "../../currentForm";
import { IFormInfo } from "../../types/types";
import { formatDate } from "../../utils/pdfUtils";

export default function generateFormInfoBody(formInfo: IFormInfo) {
  const typeOfStudent =
    currentForm === formOptions.studentTeaching
      ? "Student Teacher"
      : "Practicum Student";

  const main = [
    [typeOfStudent, formInfo.studentTeacher],
    ["Cooperating Teacher", formInfo.cooperatingTeacher],
    ["Supervisor / Coach", formInfo.supervisor],
    ["Observation Date", formatDate(formInfo.date)],
    ["Next Observation Date", formatDate(formInfo.nextDate)],
    ["Observation Number", formInfo.observation],
    ["Other", formInfo.other],
  ];

  switch (currentForm) {
    case formOptions.studentTeaching:
    case formOptions.severePracticum:
    case formOptions.bTo5Practicum:
      main.push(["Program", formInfo.program]);
      return main;

    case formOptions.reading:
      main.push(["Reading Program", formInfo.program]);
      return main;

    case formOptions.math:
      return main;

    case formOptions.practicumChecklist:
      return [
        [typeOfStudent, formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["District Coach", formInfo.supervisor],
        ["Date", formInfo.date],
        ["Program", formInfo.program],
        ["Other", formInfo.other],
      ];

    case formOptions.selfEvaluation:
      return [
        [typeOfStudent, formInfo.studentTeacher],
        ["Observation Date", formInfo.date],
        ["Program", formInfo.program],
        ["Goal 1", formInfo.goal1],
        ["Goal 2", formInfo.goal2],
        ["Observation Number", formInfo.observation],
      ];

    case formOptions.STRubric:
      return [
        [typeOfStudent, formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["Supervisor / Coach", formInfo.supervisor],
        ["Other", formInfo.other],
      ];
  }
}
