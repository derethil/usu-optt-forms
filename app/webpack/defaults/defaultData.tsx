// Module interfaces

import {
  FormKind,
  ISeverePracticumData,
  IStudentTeachingData,
  DataSchema,
} from "../types/dataTypes";

const defaultSequence = {
  sequence: 0,
  cue: 0,
  pause: 0,
  signal: 0,
};

const defaultCorrection = {
  sequence: 0,
  model: 0,
  test: 0,
  delayedTest: 0,
};

const defaultPraise = {
  general: 0,
  academic: 0,
  behavioral: 0,
  reprimand: 0,
};

const defaultCues = {
  individual: 0,
  group: 0,
};

// Data interfaces

const studentTeachingData: IStudentTeachingData = {
  cues: defaultCues,
  praise: defaultPraise,
  corrections: {
    correct: 0,
    incorrect: 0,
    none: 0,
  },
  engagement: {
    engaged: 0,
    notEngaged: 0,
  },
  misc: {
    scanningCount: 0,
    transitionCount: 0,
  },
};

const severePracticumData: ISeverePracticumData = {
  signalSequence: {
    correct: defaultSequence,
    incorrect: defaultSequence,
  },
  errorCorrection: {
    correct: defaultCorrection,
    incorrect: defaultCorrection,
  },
  corrections: {
    correct: 0,
    incorrect: 0,
    none: 0,
  },
  praise: defaultPraise,
  cues: defaultCues,
};

export const defaultStudentTeachingData: DataSchema = {
  formKind: FormKind.studentTeaching,
  ...studentTeachingData,
};

export const defaultSeverePracticumData: DataSchema = {
  formKind: FormKind.severePracticum,
  ...severePracticumData,
};
