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

export type ISequence = {
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

interface Mapping<T> {
  [key: string]: T;
}

interface SignalSequence extends Mapping<ISequence> {
  correct: ISequence;
  incorrect: ISequence;
}

interface ErrorCorrection extends Mapping<ICorrection> {
  correct: ICorrection;
  incorrect: ICorrection;
}

export interface ISeverePracticumData
  extends IPraiseData,
    ICues,
    Mapping<SignalSequence | ErrorCorrection | any> {
  signalSequence: SignalSequence;
  errorCorrection: ErrorCorrection;
}

enum FormName {
  studentTeaching = "STUDENT_TEACHING",
  severePracticum = "SEVERE_PRACTICUM",
}

type DataSchema =
  | ({
      formKind: FormName.studentTeaching;
    } & IStudentTeachingData)
  | ({
      formKind: FormName.severePracticum;
    } & ISeverePracticumData);
