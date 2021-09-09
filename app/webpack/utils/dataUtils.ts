import { ITimer } from "../types";
import { defaultStudentTeachingData } from "../defaultData";

const defaultData = defaultStudentTeachingData;

// DATA FUNCTIONS

export const getOTRRate = (data: typeof defaultData, timer: ITimer): string => {
  const OTRRate = ((data.cues.group + data.cues.individual) / timer.time) * 60;
  return OTRRate.toFixed(2);
};

export const getPraiseSum = (data: typeof defaultData): number => {
  const praises = Object.values(data.praise);
  return (
    praises.reduce((total, value) => total + value, 0) - data.praise.reprimand
  );
};

export const getCorrectionsSum = (data: typeof defaultData): number => {
  const corrections = Object.values(data.corrections);
  return corrections.reduce((total, value) => total + value, 0);
};

export const getPraiseRatio = (data: typeof defaultData): string => {
  const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
  };

  const praiseSum = getPraiseSum(data);
  const num1 = praiseSum / gcd(praiseSum, data.praise.reprimand);
  const num2 = data.praise.reprimand / gcd(praiseSum, data.praise.reprimand);

  return `${isNaN(num1) ? 0 : num1} : ${isNaN(num2) ? 0 : num2}`;
};
