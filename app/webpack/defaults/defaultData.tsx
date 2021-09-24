// ------ GENERAL ------

import {
  FormKind,
  ISeverePracticumData,
  IStudentTeachingData,
  DataSchema,
  IBT5PracticumData,
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

const instructionalSequence = {
  attention: 0,
  cue: 0,
  pause: 0,
  all: 0,
};

// ------- STUDENT TEACHING -------

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

// ------- SEVERE PRACTICUM --------

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

// -------- BT5 PRACTICUM --------

const bTo5PracticumData: IBT5PracticumData = {
  praise: defaultPraise,
  sequence: {
    correct: instructionalSequence,
    incorrect: instructionalSequence,
  },
  interactions: {
    comment: 0,
    question: 0,
    nonTargetCue: 0,
  },
  responses: {
    group: 0,
    individual: 0,
    vocal: 0,
    nonVocal: 0,
  },
  errorCorrection: {
    responseError: 0,
    prompt: 0,
    test: 0,
    delayedTest: 0,
  },
  prompts: {
    LTM: 0,
    inconsistent: 0,
  },
};

// -------- DATA FOR UNIFIED TYPE ------

export const defaultStudentTeachingData: DataSchema = {
  formKind: FormKind.studentTeaching,
  ...studentTeachingData,
};

export const defaultSeverePracticumData: DataSchema = {
  formKind: FormKind.severePracticum,
  ...severePracticumData,
};

export const defaultBT5PracticumData: DataSchema = {
  formKind: FormKind.bTo5Practicum,
  ...bTo5PracticumData,
};
