// ------ GENERAL ------

import { formOptions } from "../currentForm";

import {
  ISeverePracticumData,
  IStudentTeachingData,
  DataSchema,
  IBirthToFiveData as IBirthToFiveData,
  IReadingData,
  IMathData,
  IStudentTeachingRubric,
  IBattelleObservation,
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

const defaultEngagement = {
  engaged: 0,
  notEngaged: 0,
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
  engagement: defaultEngagement,
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

// -------- BIRTH TO FIVE  --------

const birthToFiveData: IBirthToFiveData = {
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
    ltm: 0,
    inconsistent: 0,
  },
};

// -------- MM READING --------

const readingData: IReadingData = {
  praise: defaultPraise,
  signalSequence: {
    correct: defaultSequence,
    incorrect: defaultSequence,
  },
  errorCorrection: {
    correct: defaultCorrection,
    incorrect: defaultCorrection,
  },
  cues: defaultCues,
};

// -------- MM MATH --------

const mathData: IMathData = {
  engagement: defaultEngagement,
  cues: { nonDirected: 0, ...defaultCues },
  response: {
    correct: 0,
    incorrect: 0,
  },
  feedback: {
    mtg: 0,
    notCorrected: 0,
  },
  praise: defaultPraise,
};

// ------ BATTELLE ------

const correctness = {
  correct: 0,
  incorrect: 0,
};

const battelleData: IBattelleObservation = {
  item: "",
  childScore: 0,
  examinerScore: 0,

  interview: {
    instruction: correctness,
  },

  structured: {
    materials: correctness,
    secureAttention: correctness,
    instruction: correctness,
    allowTimeForResponse: correctness,
    allowWithoutPrompt: correctness,
    arrangeMaterials: correctness,
  },

  praise: defaultPraise,

  notes: "",
};

// -------- DATA FOR UNIFIED TYPE ------

export const defaultStudentTeachingData: DataSchema = {
  currentForm: formOptions.studentTeaching,
  ...studentTeachingData,
};

export const defaultSevereReadingData: DataSchema = {
  currentForm: formOptions.severeReading,
  ...severePracticumData,
};

export const defaultSevereMathLifeSkillsData: DataSchema = {
  currentForm: formOptions.severeReading,
  ...severePracticumData,
};

export const defaultBirthToFiveData: DataSchema = {
  currentForm: formOptions.birthToFive,
  ...birthToFiveData,
};

export const defaultMMReadingData: DataSchema = {
  currentForm: formOptions.mmReading,
  ...readingData,
};

export const defaultMathData: DataSchema = {
  currentForm: formOptions.mmMath,
  ...mathData,
};

export const defaultBattelleData: DataSchema = {
  currentForm: formOptions.battelle,
  ...battelleData,
};

export const defaultStudentTeachingRubricData: IStudentTeachingRubric = {
  behaviorConferenced: "No",
  collaborationConferenced: "No",
  IEPConferenced: "No",
};
