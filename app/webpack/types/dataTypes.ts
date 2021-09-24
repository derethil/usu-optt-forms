// ---- GENERAL ----

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

interface Mapping<T> {
  [key: string]: T;
}

// ---- STUDENT TEACHING ----

export type ISequence = {
  sequence: number;
  cue: number;
  pause: number;
  signal: number;
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

// ---- SEVERE PRACTICUM ----

export type ICorrection = {
  sequence: number;
  model: number;
  test: number;
  delayedTest: number;
};

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

// ---- BT5 PRACTICUM ----

interface IInstrucSequence extends Mapping<number> {
  attention: number;
  cue: number;
  pause: number;
  all: number;
}

interface Sequence extends Mapping<IInstrucSequence> {
  correct: IInstrucSequence;
  incorrect: IInstrucSequence;
}

export interface IBT5PracticumData extends IPraiseData, Mapping<any> {
  sequence: Sequence;
  interactions: {
    comment: number;
    question: number;
    nonTargetCue: number;
  };
  responses: {
    group: number;
    individual: number;
    vocal: number;
    nonVocal: number;
  };
  errorCorrection: {
    responseError: number;
    prompt: number;
    test: number;
    delayedTest: number;
  };
  prompts: {
    LTM: number;
    inconsistent: number;
  };
}

// ---- UNIFIED TYPE ----

export enum FormKind {
  studentTeaching = "studentTeaching",
  severePracticum = "severePracticum",
  bTo5Practicum = "bTo5Practicum",
}

export type DataSchema =
  | ({
      formKind: FormKind.studentTeaching;
    } & IStudentTeachingData)
  | ({
      formKind: FormKind.severePracticum;
    } & ISeverePracticumData)
  | ({
      formKind: FormKind.bTo5Practicum;
    } & IBT5PracticumData);
