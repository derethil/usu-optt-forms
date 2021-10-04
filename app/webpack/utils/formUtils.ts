import { Section } from "../types/types";
import currentForm, { formOptions } from "../currentForm";
import studentTeachingRubric from "../../rubrics/studentTeaching.json";
import severePracticumRubric from "../../rubrics/severePracticum.json";
import bTo5PracticumRubric from "../../rubrics/bTo5Practicum.json";
import readingRubric from "../../rubrics/readingRubric.json";
import mathRubric from "../../rubrics/mathRubric.json";

import {
  defaultStudentTeachingData,
  defaultSeverePracticumData,
  defaultBT5PracticumData,
  defaultReadingData,
  defaultMathData,
} from "../defaults/defaultData";
import { DataSchema } from "../types/dataTypes";

export const getRubric = (): Section[] => {
  switch (currentForm) {
    case formOptions.studentTeaching:
      return studentTeachingRubric as Section[];
    case formOptions.severePracticum:
      return severePracticumRubric as Section[];
    case formOptions.bTo5Practicum:
      return bTo5PracticumRubric as Section[];
    case formOptions.reading:
      return readingRubric as Section[];
    case formOptions.math:
      return mathRubric as Section[];
  }
};

export const getDefaultData = (): DataSchema => {
  switch (currentForm) {
    case formOptions.studentTeaching:
      return defaultStudentTeachingData;
    case formOptions.severePracticum:
      return defaultSeverePracticumData;
    case formOptions.bTo5Practicum:
      return defaultBT5PracticumData;
    case formOptions.reading:
      return defaultReadingData;
    case formOptions.math:
      return defaultMathData;
  }
};

export const getTitle = (): string => {
  switch (currentForm) {
    case formOptions.studentTeaching:
      return "Student Teaching Form";
    case formOptions.severePracticum:
      return "Severe Practicum Form";
    case formOptions.bTo5Practicum:
      return "Birth to 5 Form";
    case formOptions.reading:
      return "MM Reading Form";
    case formOptions.math:
      return "MM Math Form";
  }
};
