import * as defaults from "./defaults/defaultData";
import { DataSchema, ISTRubric } from "./types/dataTypes";
import { Section } from "./types/types";

import studentTeachingRubric from "../rubrics/studentTeaching.json";
import severePracticumRubric from "../rubrics/severePracticum.json";
import bTo5PracticumRubric from "../rubrics/bTo5Practicum.json";
import readingRubric from "../rubrics/readingRubric.json";
import mathRubric from "../rubrics/mathRubric.json";
import selfEvaluationRubric from "../rubrics/selfEvaluation.json";
import STRubric from "../rubrics/STRubric.json";
import { formOptions } from "./currentForm";

type IFormData = {
  [key in formOptions]: {
    rubric: Section[];
    defaultData: DataSchema;
    title: string;
    programOptions?: string[];
    questions?: ISTRubric;
  };
};

const FormData: IFormData = {
  [formOptions.studentTeaching]: {
    rubric: studentTeachingRubric as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    title: "Student Teaching",
    programOptions: ["Mild/Moderate", "Severe", "Birth to 5"],
  },
  [formOptions.severeReadingPracticum]: {
    rubric: severePracticumRubric as Section[],
    defaultData: defaults.defaultSevereReadingPracticumData,
    title: "Severe Reading Practicum",
  },
  [formOptions.severeMLSPracticum]: {
    rubric: severePracticumRubric as Section[],
    defaultData: defaults.defaultSevereMLSPracticumData,
    title: "Severe Math/Life Skills Practicum",
  },
  [formOptions.bTo5Practicum]: {
    rubric: bTo5PracticumRubric as Section[],
    defaultData: defaults.defaultBT5PracticumData,
    title: "Birth to 5",
  },
  [formOptions.reading]: {
    rubric: readingRubric as Section[],
    defaultData: defaults.defaultReadingData,
    title: "MM Reading",
  },
  [formOptions.math]: {
    rubric: mathRubric as Section[],
    defaultData: defaults.defaultMathData,
    title: "MM Math",
  },
  [formOptions.practicumChecklist]: {
    title: "Practicum Classroom Checklist",
    programOptions: ["Mild/Moderate", "Severe", "Birth to 5"],
    rubric: [],
    defaultData: {} as DataSchema,
  },
  [formOptions.selfEvaluation]: {
    title: "Self Evaluation",
    rubric: selfEvaluationRubric as Section[],
    defaultData: defaults.defaultSevereReadingPracticumData,
  },
  [formOptions.STRubric]: {
    title: "OPTT ST Rubric",
    rubric: STRubric as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    questions: defaults.defaultSTRData,
  },
};

export default FormData;
