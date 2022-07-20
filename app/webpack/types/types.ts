import { css, FlattenSimpleInterpolation } from "styled-components";
import { formOptions } from "../currentForm";
import { ITimerState } from "../slices/timersSlice";
import {
  DataSchema,
  INotebookCheck,
  IStudentTeachingRubric,
  SignalSequence,
} from "./dataTypes";

export interface Row {
  area: string;
  info?: string;
  options: [
    {
      content: string | string[];
      score: string | number;
      continued?: boolean;
      default?: boolean;
    }
  ];
}

export interface Section {
  sectionTitle: string;
  tooltip?: string;
  rows: Row[];
}

export interface RubricScore {
  score: string | string[];
  comment: string;
  maxScore?: string;
}
export interface ScoresState {
  [key: string]: {
    [key: string]: RubricScore;
  };
}

export interface ITimer {
  time: number;
  isActive: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handleResume: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

export enum Location {
  logan = "Logan",
  optt = "OPTT",
}

export interface IFormInfo {
  studentTeacher: string;
  cooperatingTeacher: string;
  supervisor: string;
  date: string;
  nextDate: string;
  observation: string;
  other: string;
  program: string;
  location: Location;
  goal1: string;
  goal2: string;
  isLastObservation: boolean;
  narrative: string;
}

export interface CSSMixin {
  mixin?: FlattenSimpleInterpolation;
}

export type LocationObservationType = Pick<IFormInfo, "location" | "observation">;

export interface DataProps<T> {
  data: T;
  setData: (sequenceKey: string, groupKey: string, newValue: object) => void;
}

export const WrapperMixin = css<{ oneRow: boolean }>`
  ${(props) => (props.oneRow ? "height: 6em;" : "")};
`;

export const ColMixin = css<{ oneRow: boolean }>`
  & > * {
    ${(props) => (props.oneRow ? "height: 100%;" : "")};
  }
`;

// Type to pass OptionRow
export interface Option {
  content: string | string[];
  score?: string;
  continued?: boolean;
  default?: boolean;
}

// Type to update state values
export type NewValues = { [key: string]: string };

export interface IData {
  formInfo: IFormInfo;
  feedback: {
    area1: string;
    area2: string;
    area3: string;
    area4: string;
    area5: string;
  };
  checks: INotebookCheck;
  data1: DataSchema;
  data2: DataSchema;
  timerState1: ITimerState;
  timerState2: ITimerState;
  timerState3: ITimerState;
  rubricScores: ScoresState;
  questions: IStudentTeachingRubric;
}
