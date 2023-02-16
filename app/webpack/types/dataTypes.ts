// ---- GENERAL ----
import { formOptions } from "../currentForm";
import { Location } from "./types";

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

export interface SignalSequence extends Mapping<ISequence> {
  correct: ISequence;
  incorrect: ISequence;
}

export interface ErrorCorrection extends Mapping<ICorrection> {
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

// ---- BIRTH TO FIVE  ----

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

export interface IBirthToFiveData extends IPraiseData, Mapping<any> {
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
      currentForm: formOptions.severeReading;
    } & ISeverePracticumData)
  | ({
      currentForm: formOptions.severeMathLifeSkills;
    } & ISeverePracticumData)
  | ({
      currentForm: formOptions.birthToFive;
    } & IBirthToFiveData)
  | ({
      currentForm: formOptions.mmReading;
    } & IReadingData)
  | ({
      currentForm: formOptions.mmMath;
    } & IMathData)
  | ({
      currentForm: formOptions.battelle;
    } & IBattelleObservation);

// ------ NOTEBOOK CHECK ------

export interface CheckRow {
  content: string;
  score: string;
  maxScore: number;
  isNA: boolean;
}

export type INotebookCheck = CheckRow[];

export interface LocationCheckData {
  "1"?: number;
  "2"?: number;
  "3"?: number;
  "4"?: number;
  "5"?: number;
}

export interface NotebookCheckContent {
  content: string;
  [Location.logan]?: LocationCheckData;
  [Location.optt]?: LocationCheckData;
}

// ------ PRACTICUM CHECKLIST ------

export interface IChecklistRow {
  score: string;
  comment: string;
}

export interface IChecklistJSONRow {
  content: string;
  textOnly?: boolean;
}

export interface IOPTTChecklist {
  schedule: IChecklistRow;
  targetGroup: IChecklistRow;
  lessonInfo: string;
  curriculum: IChecklistRow;
  communicationProcedure: IChecklistRow;
  paraProcedure: IChecklistRow;
  observationDate: IChecklistRow;
  additionalInfo: string;
}

export interface IOPTTChecklistJSON {
  schedule: IChecklistJSONRow;
  targetGroup: IChecklistJSONRow;
  lessonInfo: IChecklistJSONRow;
  curriculum: IChecklistJSONRow;
  communicationProcedure: IChecklistJSONRow;
  paraProcedure: IChecklistJSONRow;
  observationDate: IChecklistJSONRow;
  additionalInfo: IChecklistJSONRow;
}

// ------ OTT ST RUBRIC ------

interface Test {
  [index: string]: string;
}

export interface IStudentTeachingRubric {
  behaviorConferenced: string;
  collaborationConferenced: string;
  IEPConferenced: string;
}

// ---- BATTELLE OBSERVATION ----

interface Correctness {
  correct: number;
  incorrect: number;
}

export interface IBattelleObservation extends IPraiseData, Mapping<any> {
  scoring: {
    agreement: number;
    noAgreement: number;
    immediate: number;
    delayed: number;
  };

  interview: {
    instruction: Correctness;
  };

  structured: {
    materials: Correctness;
    secureAttention: Correctness;
    instruction: Correctness;
    allowTimeForResponse: Correctness;
    allowWithoutPrompt: Correctness;
    arrangeMaterials: Correctness;
  };

  notes: string;
}
