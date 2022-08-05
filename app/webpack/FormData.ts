import * as defaults from "./defaults/defaultData";
import { DataSchema, IStudentTeachingRubric } from "./types/dataTypes";
import { Section } from "./types/types";

import * as RUBRICS from "../rubrics";

import { formOptions } from "./currentForm";

type IFormData = {
  [key in formOptions]: {
    rubric: Section[];
    defaultData: DataSchema;
    title: string;
    programOptions?: string[];
    questions?: IStudentTeachingRubric;
  };
};

const FormData: IFormData = {
  [formOptions.studentTeaching]: {
    rubric: RUBRICS.studentTeaching as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    title: "Student Teaching",
    programOptions: ["Mild/Moderate", "Severe", "Birth to 5"],
  },
  [formOptions.severeReading]: {
    rubric: RUBRICS.severePracticum as Section[],
    defaultData: defaults.defaultSevereReadingData,
    title: "Severe Reading Practicum",
  },
  [formOptions.severeMathLifeSkills]: {
    rubric: RUBRICS.severePracticum as Section[],
    defaultData: defaults.defaultSevereMathLifeSkillsData,
    title: "Severe Math/Life Skills Practicum",
  },
  [formOptions.birthToFive]: {
    rubric: RUBRICS.birthToFive as Section[],
    defaultData: defaults.defaultBirthToFiveData,
    title: "Birth to 5",
  },
  [formOptions.mmReading]: {
    rubric: RUBRICS.mmReading as Section[],
    defaultData: defaults.defaultMMReadingData,
    title: "MM Reading",
  },
  [formOptions.mmMath]: {
    rubric: RUBRICS.mmMath as Section[],
    defaultData: defaults.defaultMathData,
    title: "MM Math",
  },
  [formOptions.OPTTChecklist]: {
    title: "Practicum Classroom Checklist",
    programOptions: ["Mild/Moderate", "Severe", "Birth to 5"],
    rubric: [],
    defaultData: {} as DataSchema,
  },
  [formOptions.severeSelfEvaluation]: {
    title: "Self Evaluation",
    rubric: RUBRICS.severeSelfEvaluation as Section[],
    defaultData: defaults.defaultSevereReadingData,
  },
  [formOptions.studentTeachingRubric]: {
    title: "OPTT ST Rubric",
    rubric: RUBRICS.studentTeachingRubric as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    questions: defaults.defaultStudentTeachingRubricData,
  },
  [formOptions.teacherCandidate]: {
    title: "Teacher Candidate Formative Feedback",
    rubric: RUBRICS.teacherCandidate as Section[],
    defaultData: {} as DataSchema,
  },
  [formOptions.cooperatingTeacherChecklist]: {
    title: "Cooperating Teacher Checklist",
    rubric: RUBRICS.cooperatingTeacherChecklist as Section[],
    defaultData: {} as DataSchema,
  },
  [formOptions.earlyIntervention]: {
    title: "Early Intervention Practicum",
    rubric: RUBRICS.earlyIntervention as Section[],
    defaultData: {} as DataSchema,
  },
  [formOptions.EICooperatingProviderChecklist]: {
    title: "EI Cooperating Provider Checklist",
    rubric: RUBRICS.EICooperatingProviderChecklist as Section[],
    defaultData: {} as DataSchema,
  },
  [formOptions.birthToFiveCooperatingTeacherChecklist]: {
    title: "Cooperating Teacher Checklist",
    rubric: RUBRICS.birthToFiveCooperatingTeacherChecklist as Section[],
    defaultData: {} as DataSchema,
  },
  [formOptions.battelle]: {
    title: "Battelle Observation",
    rubric: RUBRICS.battelle as Section[],
    defaultData: {} as DataSchema,
  },
};

export default FormData;
