import { ITimer, ScoresState, Section } from "./types"
import { defaultData } from "./defaults"

// TIMER FUNCTIONS

export const formatTime = (timer: number): string => {
  const getSeconds = `0${(timer % 60)}`.slice(-2)
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${Number(minutes) % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

  return `${getHours} : ${getMinutes} : ${getSeconds}`
}

// SCORE FUNCTIONS

export const getSubtotal = (section: string, scores: ScoresState): number => {
  const sectionScores = scores[section];
  return Object.values(sectionScores).reduce((total, value) => {
    if (isNaN(Number(value))) return total;
    return total + Number(value)
  }, 0);
}

export const getMaxSubtotal = (section: string, scores: ScoresState, rubricData: Section[]): number => {
  const sectionData = rubricData.find(el => el.sectionTitle === section)!;
  const sectionScores = scores[section];

  // Find max score based on raw json data
  const maxBefore = sectionData.rows.reduce((total, row) => {
    // If max score is "Yes", etc. do not add to the total
    return total + (typeof row.options[0].score === "number" ? row.options[0].score : 0)
  }, 0);

  // Find rows whose score is N/A
  const NARows = Object.keys(sectionScores).filter(key => sectionScores[key] === "N/A");

  // Return total with N/A max scores subtracted
  return Object.keys(sectionScores).reduce((total, scoreArea) => {
    if (!NARows.includes(scoreArea)) return total; // Do not do anything on rows not marked as N/A

    // Subtract max score of given row from total
    const maxAreaScore = sectionData.rows.find(row => row.area === scoreArea)?.options[0].score! // Get max score
    return total - (typeof maxAreaScore === "number" ? maxAreaScore : 0);
  }, maxBefore);
}

// DATA FUNCTIONS

export const getPraiseSum = (data: typeof defaultData): number => {
  const praises = Object.values(data.praise);
  return praises.reduce((total, value) => total + value, 0) - data.praise.reprimand;
}

export const getCorrectionsSum = (data: typeof defaultData): number => {
  const corrections = Object.values(data.corrections);
  return corrections.reduce((total, value) => total + value, 0);
}

export const getPraiseRatio = (data: typeof defaultData): string => {
  const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
  }

  const praiseSum = getPraiseSum(data);
  const num1 = praiseSum / gcd(praiseSum, data.praise.reprimand);
  const num2 = data.praise.reprimand / gcd(praiseSum, data.praise.reprimand);

  return `${isNaN(num1) ? 0 : num1} : ${isNaN(num2) ? 0 : num2}`
}

export const getPercent = (subtotal: number, total: number): string => {
  const percent = (subtotal / total) * 100;
  return `${!isNaN(percent) ? percent.toFixed(0) : 0}%`;
}