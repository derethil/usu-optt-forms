import currentForm, { formOptions } from "../../currentForm";
import { IData, IFormInfo } from "../../types/types";
import { formatDate } from "../../utils/pdfUtils";
import {
  insertIf,
  otherLabel,
  programTitle,
  studentTitle,
  superior,
} from "../../utils/utils";
import PDFGenerator from "./PDFGenerator";

// Function to determine what the FormInfo should contain for the report

function generateBody(formInfo: IFormInfo) {
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
    case formOptions.severeReading:
    case formOptions.severeMathLifeSkills:
    case formOptions.birthToFive:
    case formOptions.mmReading:
      main.push([programTitle(currentForm), formInfo.program]);
      return main;

    case formOptions.mmMath:
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
        ["Date", formatDate(formInfo.date)],
        ["Other", formInfo.other],
      ];

    case formOptions.teacherCandidate:
      return [
        [studentTitle(currentForm), formInfo.studentTeacher],
        [superior(currentForm), formInfo.supervisor],
        ["Observation Date", formatDate(formInfo.date)],
        [otherLabel(currentForm), formInfo.other],
      ];
  }
}

export default function generate(generator: PDFGenerator, data: IData) {
  generator.table({
    startY: 24.5,
    head: ["Information", ""],
    body: generateBody(data.formInfo),
  });
}
