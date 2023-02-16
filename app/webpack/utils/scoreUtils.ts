import currentForm from "../currentForm";
import FormData from "../FormData";
import { CheckRow } from "../types/dataTypes";
import { ScoresState, Section } from "../types/types";
import { findMaxScore } from "./utils";

const rubricData = FormData[currentForm].rubric;

export const getSubtotal = (section: string, scores: ScoresState): number => {
  const sectionScores = scores[section];
  return Object.values(sectionScores).reduce((total, { score, comment }) => {
    if (isNaN(Number(score))) return total;
    return total + Number(score);
  }, 0);
};

export const getMaxSubtotal = (
  section: string,
  scores: ScoresState,
  rubricData: Section[]
): number => {
  const sectionData = rubricData.find((el) => el.sectionTitle === section)!;
  const sectionScores = scores[section];

  // Find max score based on raw json data
  const maxBefore = sectionData.rows.reduce((total, row) => {
    // If max score is "Yes", etc. do not add to the total
    let maxScore = findMaxScore(row);
    maxScore = isNaN(maxScore) ? 0 : maxScore;

    let nonNumeric =
      row.options.filter((e) => typeof e.score === "number").length < row.options.length;

    return total + (nonNumeric ? 0 : maxScore);
  }, 0);

  // Find rows whose score is N/A
  const NARows = Object.keys(sectionScores).filter(
    (key) => sectionScores[key].score === "N/A"
  );

  // Return total with N/A max scores subtracted by looping through rows with N/A scores
  return Object.keys(sectionScores).reduce((total, scoreArea) => {
    if (!NARows.includes(scoreArea)) return total; // Do not do anything on rows not marked as N/A

    // Subtract max score of given row from total
    const currRow = sectionData.rows.find((row) => row.area === scoreArea);
    const maxScore = findMaxScore(currRow!);
    return total - (isNaN(maxScore) ? 0 : maxScore);
  }, maxBefore);
};

export const generateScoreData = (scores: ScoresState) => {
  let score = 0;
  let possible = 0;

  const summary = rubricData.map((section) => {
    const subtotal = getSubtotal(section.sectionTitle, scores);
    score += subtotal;

    const currPossible = getMaxSubtotal(section.sectionTitle, scores, rubricData);
    possible += currPossible;

    return [section.sectionTitle, `${subtotal} / ${currPossible}`];
  });

  return { score, possible, summary };
};

export const notebookCheckTotal = (observation: string, checks: CheckRow[]) => {
  const total = checks.reduce((total, { score, maxScore, isNA }) => {
    if (isNA) return total;
    return total + Number(score);
  }, 0);

  const maxTotal = checks.reduce((total, { maxScore, isNA }) => {
    if (isNA) return total;
    return total + Number(maxScore);
  }, 0);

  const rowTitle = `Notebook Check #${observation}`;

  return [rowTitle, `${total} / ${maxTotal}`];
};
