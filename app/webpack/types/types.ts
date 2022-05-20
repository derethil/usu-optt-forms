import { css, FlattenSimpleInterpolation } from "styled-components";
import { SignalSequence } from "./dataTypes";

export interface Row {
  area: string;
  info?: string;
  options: [
    {
      content: string | string[];
      score: string | number;
      continued?: boolean;
    }
  ];
}

export interface Section {
  sectionTitle: string;
  tooltip?: string;
  rows: Row[];
}

export interface ScoresState {
  [key: string]: {
    [key: string]: {
      score: string;
      comment: string;
      maxScore?: string;
    };
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
  observation: number;
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

export type LocationObservationType = Pick<
  IFormInfo,
  "location" | "observation"
>;

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
