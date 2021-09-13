import { Section } from "../types/types";
import currentForm from "../currentForm";
import _studentTeachingRubric from "../../rubrics/studentTeaching.json";
import _severePracticumRubric from "../../rubrics/severePracticum.json";

import {
  defaultStudentTeachingData,
  defaultSeverePracticumData,
} from "../defaults/defaultData";

export const getRubric = (): Section[] => {
  const studentTeachingRubric = _studentTeachingRubric as Section[];
  const severePracticumRubric = _severePracticumRubric as Section[];

  if (currentForm === "studentTeaching") return studentTeachingRubric;
  else return severePracticumRubric;
};

type defaultData =
  | typeof defaultStudentTeachingData
  | typeof defaultSeverePracticumData;

export const getDefaultData = () => {
  if (currentForm === "studentTeaching") return defaultStudentTeachingData;
  else return defaultSeverePracticumData;
};
