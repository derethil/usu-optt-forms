export interface IPraiseData {
  praise: {
    general: number;
    academic: number;
    behavioral: number;
    reprimand: number;
  };
}

export interface ICues {
  cues: {
    individual: number;
    group: number;
  };
}

type ISequence = {
  sequence: number;
  cue: number;
  pause: number;
  signal: number;
};

type ICorrection = {
  sequence: number;
  model: number;
  test: number;
  delayedTest: number;
};

export interface IStudentTeachingData extends IPraiseData, ICues {
  corrections: {
    correct: number;
    incorrect: number;
    none: number;
  };
  engagement: {
    engaged: number;
    notEngaged: number;
  };
  misc: {
    scanningCount: number;
    transitionCount: number;
  };
}

export interface ISeverePracticumData extends IPraiseData, ICues {
  signalSequence: {
    correct: ISequence;
    incorrect: ISequence;
  };
  errorCorrection: {
    correct: ICorrection;
    incorrect: ICorrection;
  };
  corrections: {
    correct: number;
    incorrect: number;
    none: number;
  };
}
