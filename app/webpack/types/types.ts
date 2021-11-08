import { FlattenSimpleInterpolation } from "styled-components";

export interface Section {
  sectionTitle: string;
  tooltip?: string;
  rows: [
    {
      area: string;
      tooltip?: string;
      options: [
        {
          content: string;
          score: number | string;
        }
      ];
    }
  ];
}

export interface ScoresState {
  [key: string]: {
    [key: string]: {
      score: string;
      comment: string;
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
}

export interface CSSMixin {
  mixin?: FlattenSimpleInterpolation;
}
