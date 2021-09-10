import { Section } from "../types/types";
import CURR_FORM from "../currentForm";
import _studentTeachingRubric from "../../rubrics/studentTeaching.json";
import _severePracticumRubric from "../../rubrics/severePracticum.json";

import {
  defaultStudentTeachingData,
  defaultSeverePracticumData,
} from "../defaults/defaultData";

export const getRubric = (): Section[] => {
  const studentTeachingRubric = _studentTeachingRubric as Section[];
  const severePracticumRubric = _severePracticumRubric as Section[];

  if (CURR_FORM === "studentTeaching") return studentTeachingRubric;
  else return severePracticumRubric;
};

type defaultData =
  | typeof defaultStudentTeachingData
  | typeof defaultSeverePracticumData;

export const getDefaultData = () => {
  if (CURR_FORM === "studentTeaching") return defaultStudentTeachingData;
  else return defaultSeverePracticumData;
};
