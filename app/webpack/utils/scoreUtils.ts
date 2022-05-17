import currentForm from "../currentForm";
import FormData from "../FormData";
import { ScoresState, Section } from "../types/types";

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
    let maxScore = Math.max(...row.options.map((e) => Number(e.score)));
    let containsYes = row.options.map((e) => e.score).includes("Yes");

    return total + (containsYes ? 0 : maxScore);
  }, 0);

  // Find rows whose score is N/A
  const NARows = Object.keys(sectionScores).filter(
    (key) => sectionScores[key].score === "N/A"
  );

  // Return total with N/A max scores subtracted
  return Object.keys(sectionScores).reduce((total, scoreArea) => {
    if (!NARows.includes(scoreArea)) return total; // Do not do anything on rows not marked as N/A

    // Subtract max score of given row from total
    const currRow = sectionData.rows.find((row) => row.area === scoreArea);
    const maxScore = Math.max(...currRow!.options.map((e) => Number(e.score)));
    return total - (typeof maxScore === "number" ? maxScore : 0);
  }, maxBefore);
};

export const generateScoreData = (scores: ScoresState) => {
  let score = 0;
  let possible = 0;

  const summary = rubricData.map((section) => {
    const subtotal = getSubtotal(section.sectionTitle, scores);
    score += subtotal;

    const currPossible = getMaxSubtotal(
      section.sectionTitle,
      scores,
      rubricData
    );
    possible += currPossible;

    return [section.sectionTitle, `${subtotal} / ${currPossible}`];
  });

  return { score, possible, summary };
};
