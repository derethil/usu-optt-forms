import { ITimer } from "../types/types";
import { IPraiseData, IStudentTeachingData, ICues } from "../types/dataTypes";
import currentForm from "../currentForm";
import FormData from "../FormData";

const defaultData = FormData[currentForm].defaultData;

// DATA FUNCTIONS

export const getOTRRate = (data: ICues, timer: ITimer): string => {
  const OTRRate = ((data.cues.group + data.cues.individual) / timer.time) * 60;
  return OTRRate.toFixed(2);
};

export const getPraiseSum = (data: IPraiseData): number => {
  const praises = Object.values(data.praise);
  return (
    praises.reduce((total, value) => total + value, 0) - data.praise.reprimand
  );
};

export const getCorrectionsSum = (data: IStudentTeachingData): number => {
  const corrections = Object.values(data.corrections);
  return corrections.reduce((total, value) => total + value, 0);
};

export const getPraiseRatio = (data: IPraiseData): string => {
  const ratio = getPraiseSum(data) / data.praise.reprimand;
  return `${ratio.toFixed(2)} : 1`;
};
