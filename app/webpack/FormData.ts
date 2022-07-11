import * as defaults from "./defaults/defaultData";
import { DataSchema, IStudentTeachingRubric } from "./types/dataTypes";
import { Section } from "./types/types";

import studentTeachingRubric from "../rubrics/studentTeaching.json";
import severePracticumRubric from "../rubrics/severePracticum.json";
import birthToFiveRubric from "../rubrics/birthToFive.json";
import readingRubric from "../rubrics/readingRubric.json";
import mathRubric from "../rubrics/mathRubric.json";
import selfEvaluationRubric from "../rubrics/selfEvaluation.json";
import studentTeachingRubricRubric from "../rubrics/studentTeachingRubric.json";
import teacherCandidateRubric from "../rubrics/teacherCandidate.json";

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
    rubric: studentTeachingRubric as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    title: "Student Teaching",
    programOptions: ["Mild/Moderate", "Severe", "Birth to 5"],
  },
  [formOptions.severeReading]: {
    rubric: severePracticumRubric as Section[],
    defaultData: defaults.defaultSevereReadingData,
    title: "Severe Reading Practicum",
  },
  [formOptions.severeMathLifeSkills]: {
    rubric: severePracticumRubric as Section[],
    defaultData: defaults.defaultSevereMathLifeSkillsData,
    title: "Severe Math/Life Skills Practicum",
  },
  [formOptions.birthToFive]: {
    rubric: birthToFiveRubric as Section[],
    defaultData: defaults.defaultBirthToFiveData,
    title: "Birth to 5",
  },
  [formOptions.mmReading]: {
    rubric: readingRubric as Section[],
    defaultData: defaults.defaultMMReadingData,
    title: "MM Reading",
  },
  [formOptions.mmMath]: {
    rubric: mathRubric as Section[],
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
    rubric: selfEvaluationRubric as Section[],
    defaultData: defaults.defaultSevereReadingData,
  },
  [formOptions.studentTeachingRubric]: {
    title: "OPTT ST Rubric",
    rubric: studentTeachingRubricRubric as Section[],
    defaultData: defaults.defaultStudentTeachingData,
    questions: defaults.defaultStudentTeachingRubricData,
  },
  [formOptions.teacherCandidate]: {
    title: "Teacher Candidate Formative Feedback",
    rubric: teacherCandidateRubric as Section[],
    defaultData: {} as DataSchema,
  },
};

export default FormData;
