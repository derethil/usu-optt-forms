
// Creates a new type object where each key is optional
export type Partial<T> = {
  [K in keyof T]?: T[K];
};

export type RecursivePartial<T> = {
  [K in keyof T]?: RecursivePartial<T[K]>;
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
    [key: string]: number
  }
}