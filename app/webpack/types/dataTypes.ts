// ---- GENERAL ----
import { formOptions } from "../currentForm";

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
    nonDirected?: number;
  };
}

interface IEngagement {
  engaged: number;
  notEngaged: number;
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
  engagement: IEngagement;
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
    ltm: number;
    inconsistent: number;
  };
}

// ---- MM READING ----

export interface IReadingData
  extends IPraiseData,
    ICues,
    Mapping<SignalSequence | ErrorCorrection | any> {
  signalSequence: SignalSequence;
  errorCorrection: ErrorCorrection;
}

// ---- MM MATH ----

export interface IMathData extends IPraiseData, ICues {
  engagement: IEngagement;
  response: {
    correct: number;
    incorrect: number;
  };
  feedback: {
    mtg: number;
    notCorrected: number;
  };
}

// ---- UNIFIED TYPE ----

export type DataSchema =
  | ({
      currentForm: formOptions.studentTeaching;
    } & IStudentTeachingData)
  | ({
      currentForm: formOptions.severePracticum;
    } & ISeverePracticumData)
  | ({
      currentForm: formOptions.bTo5Practicum;
    } & IBT5PracticumData)
  | ({
      currentForm: formOptions.reading;
    } & IReadingData)
  | ({
      currentForm: formOptions.math;
    } & IMathData);

// ------ NOTEBOOK CHECK ------

export interface CheckRow {
  content: string;
  score: number;
}

export interface INotebookCheck {
  numbered: CheckRow[];
  final: CheckRow[];
}

export interface NotebookCheckContent {
  logan: number[];
  nonLogan: number[];
  content: string;
}

// ------ PRACTICUM CHECKLIST ------

export interface IChecklistRow {
  score: string;
  comment: string;
}

export interface IPracticumChecklist {
  schedule: IChecklistRow;
  targetGroup: IChecklistRow;
  lessonInfo: string;
  curriculum: IChecklistRow;
  communicationProcedure: IChecklistRow;
  paraProcedure: IChecklistRow;
  observationDate: IChecklistRow;
  additionalInfo: string;
}
