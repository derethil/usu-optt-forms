import { ITimer } from "../types/types";
import { getDefaultData } from "./formUtils";
import { IPraiseData, IStudentTeachingData, ICues } from "../types/dataTypes";

const defaultData = getDefaultData();

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
  const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
  };

  const praiseSum = getPraiseSum(data);
  const num1 = praiseSum / gcd(praiseSum, data.praise.reprimand);
  const num2 = data.praise.reprimand / gcd(praiseSum, data.praise.reprimand);

  return `${isNaN(num1) ? 0 : num1} : ${isNaN(num2) ? 0 : num2}`;
};
