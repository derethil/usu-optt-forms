import { ITimerState } from "../slices/timersSlice";
import { IPraiseData, IStudentTeachingData, ICues, DataSchema } from "../types/dataTypes";
import currentForm, { formOptions } from "../currentForm";
import FormData from "../FormData";

const defaultData = FormData[currentForm].defaultData;

// DATA FUNCTIONS

export const getOTRRate = (data: ICues, timer: ITimerState): string => {
  const total =
    data.cues.individual +
    data.cues.group +
    (data.cues.nonDirected ? data.cues.nonDirected : 0);
  const OTRRate = (total / timer.value) * 60;
  return OTRRate.toFixed(2);
};

export const getPraiseSum = (data: IPraiseData): number => {
  const praises = Object.values(data.praise);
  return praises.reduce((total, value) => total + value, 0) - data.praise.reprimand;
};

export const getCorrectionsSum = (data: IStudentTeachingData): number => {
  const corrections = Object.values(data.corrections);
  return corrections.reduce((total, value) => total + value, 0);
};

export const getPraiseRatio = (data: IPraiseData): string => {
  const ratio = getPraiseSum(data) / data.praise.reprimand;
  return `${ratio.toFixed(2)} : 1`;
};

export const battellePraiseRatio = (data: DataSchema) => {
  if (data.currentForm === formOptions.battelle) {
    return `${
      data.interview.instruction.correct + data.interview.instruction.incorrect
    } : ${data.praise.general + data.praise.academic}`;
  }
};
