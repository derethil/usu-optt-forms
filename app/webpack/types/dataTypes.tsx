export interface IPraiseData {
  praise: {
    general: number;
    academic: number;
    behavioral: number;
    reprimand: number;
  };
}

export interface IStudentTeachingData extends IPraiseData {
  cues: {
    individual: number;
    group: number;
  };
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
