
// Creates a new type object where each key is optional
export type Partial<T> = {
  [K in keyof T]?: T[K];
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface FormInfo {
  studentTeacher: string,
  cooperatingTeacher: string,
  supervisor: string,
  date: string,
  observation: number
}

export interface Section {
  sectionTitle: string,
  tooltip?: string,
  rows: [{
    area: string,
    tooltip?: string,
    options: [{
      content: string,
      score: number,
    }]
  }]
}

export interface ScoresState {
  [key: string]: {
    [key: string]: string
  }
}

export interface STOData {
  cues: {
    individual: number,
    group: number
  },
  praise: {
    general: number,
    academic: number,
    behavioral: number,
    reprimand: number
  },
  corrections: {
    correct: number,
    incorrect: number,
    none: number
  },
  engagement: {
    engaged: number,
    notEngaged: number
  },
  misc: {
    scanningCount: number,
    transitionCount: number
  }
}

export interface ITimer {
  timer: number;
  isActive: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleReset: () => void;
}

export interface IFormInfo {
  studentTeacher: string,
  cooperatingTeacher: string,
  supervisor: string,
  date: string,
  observation: number,
  other: string,
  program: string
}


export const defaultData = {
  cues: {
    individual: 0,
    group: 0
  },
  praise: {
    general: 0,
    academic: 0,
    behavioral: 0,
    reprimand: 0
  },
  corrections: {
    correct: 0,
    incorrect: 0,
    none: 0
  },
  engagement: {
    engaged: 0,
    notEngaged: 0
  },
  misc: {
    scanningCount: 0,
    transitionCount: 0
  }
}
