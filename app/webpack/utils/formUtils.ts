import { Section } from "../types/types";
import currentForm, { formOptions } from "../currentForm";
import _studentTeachingRubric from "../../rubrics/studentTeaching.json";
import _severePracticumRubric from "../../rubrics/severePracticum.json";
import _bTo5PracticumRubric from "../../rubrics/bTo5Practicum.json";
import _readingRubric from "../../rubrics/readingRubric.json";

import {
  defaultStudentTeachingData,
  defaultSeverePracticumData,
  defaultBT5PracticumData,
} from "../defaults/defaultData";

export const getRubric = (): Section[] => {
  const studentTeachingRubric = _studentTeachingRubric as Section[];
  const severePracticumRubric = _severePracticumRubric as Section[];
  const bTo5PracticumRubric = _bTo5PracticumRubric as Section[];
  const readingRubric = _readingRubric as Section[];

  switch (currentForm) {
    case formOptions.studentTeaching:
      return studentTeachingRubric;
    case formOptions.severePracticum:
      return severePracticumRubric;
    case formOptions.bTo5Practicum:
      return bTo5PracticumRubric;
    case formOptions.reading:
      return readingRubric;
  }
};

export const getDefaultData = () => {
  switch (currentForm) {
    case formOptions.studentTeaching:
      return defaultStudentTeachingData;
    case formOptions.severePracticum:
      return defaultSeverePracticumData;
    case formOptions.bTo5Practicum:
      return defaultBT5PracticumData;
    case formOptions.reading:
      return defaultStudentTeachingData; // TODO
  }
};

export const getTitle = () => {
  switch (currentForm) {
    case formOptions.studentTeaching:
      return "Student Teaching Form";
    case formOptions.severePracticum:
      return "Severe Practicum Form";
    case formOptions.bTo5Practicum:
      return "Birth to 5 Form";
    case formOptions.reading:
      return "MM Reading Form";
  }
};
