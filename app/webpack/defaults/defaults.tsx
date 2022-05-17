import currentForm, { formOptions } from "../currentForm";
import { IPracticumChecklist } from "../types/dataTypes";
import { IFormInfo, Location } from "../types/types";
import getNotebookCheck from "../utils/notebookCheckUtils";

export const defaultComments = {
  strengths: "",
  suggestions: "",
  nextFocus: "",
  goal1: "",
  goal2: "",
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
  isLastObservation: false,
  narrative: "",
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

export const afterGradedLists = [
  [
    "Schedule a conference with the student teacher to review the assessment and reinforcement.",
    "Student teacher shared artifacts with the supervisor/district coach and discussed the effectiveness and/or changes needed during the scheduled conference.",
  ],
  [
    "Schedule a conference with the student teacher to review the collaborations.",
    "Share artifacts (logs, forms, lesson plans, etc.) with supervisor/district coach and discuss the effectiveness and/or changes needed during the scheduled conference.",
  ],
  [
    "Schedule a conference with the student teacher to review the IEP/IFSP planning.",
    "Student Teacher shared artifacts (IEP/IFSP forms, testing results, copy of assessment results, observation data and graph related to the area of need addressed, copy of student’s schedule, lesson plan listing accommodations, IEP/IFSP meeting, etc.) with supervisor/district coach and discuss the effectiveness and/or changes needed during the scheduled conference.",
  ],
];
