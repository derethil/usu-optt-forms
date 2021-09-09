// Module interfaces

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

export const defaultStudentTeachingData = {
  cues: {
    individual: 0,
    group: 0,
  },
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

export type studentTeachingDataI = typeof defaultStudentTeachingData;

export const defaultSeverePracticumData = {
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
  otr: {
    group: 0,
    individual: 0,
  },
};

export type severePracticumDataI = typeof defaultSeverePracticumData;
