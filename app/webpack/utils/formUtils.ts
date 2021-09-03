import { Section } from "../types";
import CURR_FORM from "../currentForm";
import _studentTeachingRubric from "../../rubrics/studentTeaching.json";
import _severePracticumRubric from "../../rubrics/severePracticum.json";

export const getRubric = (): Section[] => {
  const studentTeachingRubric = _studentTeachingRubric as Section[];
  const severePracticumRubric = _severePracticumRubric as Section[];

  if (CURR_FORM === "studentTeaching") return studentTeachingRubric;
  else return severePracticumRubric;
};
