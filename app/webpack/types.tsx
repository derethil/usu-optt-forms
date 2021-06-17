
// Creates a new type object where each key is optional
export type Partial<T> = {
  [K in keyof T]?: T[K];
};

export interface FormInfo {
  studentTeacher: string,
  cooperatingTeacher: string,
  supervisor: string,
  date: string,
  observation: number
}