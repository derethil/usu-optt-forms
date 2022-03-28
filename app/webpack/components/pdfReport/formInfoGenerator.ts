import currentForm, { formOptions } from "../../currentForm";
import { IFormInfo } from "../../types/types";
import { formatDate } from "../../utils/pdfUtils";
import { insertIf, programTitle, studentTitle } from "../../utils/utils";

// Function to determine what the FormInfo should contain for the report

export default function generateFormInfoBody(formInfo: IFormInfo) {
  const main = [
    [studentTitle(currentForm), formInfo.studentTeacher],
    ["Cooperating Teacher", formInfo.cooperatingTeacher],
    ["Supervisor / Coach", formInfo.supervisor],
    ["Observation Date", formatDate(formInfo.date)],
    ...insertIf(!formInfo.isLastObservation, [
      "Next Observation Date",
      formatDate(formInfo.nextDate),
    ]),
    ["Observation Number", formInfo.observation],
    ["Other", formInfo.other],
  ];

  switch (currentForm) {
    case formOptions.studentTeaching:
    case formOptions.severeReadingPracticum:
    case formOptions.severeMLSPracticum:
    case formOptions.bTo5Practicum:
    case formOptions.reading:
      main.push([programTitle(currentForm), formInfo.program]);
      return main;

    case formOptions.math:
      return main;

    case formOptions.practicumChecklist:
      return [
        [studentTitle(currentForm), formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["District Coach", formInfo.supervisor],
        ["Date", formInfo.date],
        ["Program", formInfo.program],
        ["Other", formInfo.other],
      ];

    case formOptions.selfEvaluation:
      return [
        [studentTitle(currentForm), formInfo.studentTeacher],
        ["Observation Date", formInfo.date],
        ["Program", formInfo.program],
        ["Goal 1", formInfo.goal1],
        ["Goal 2", formInfo.goal2],
        ["Observation Number", formInfo.observation],
      ];

    case formOptions.STRubric:
      return [
        [studentTitle(currentForm), formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["Supervisor / Coach", formInfo.supervisor],
        ["Other", formInfo.other],
      ];
  }
}
