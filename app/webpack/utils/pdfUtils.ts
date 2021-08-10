import { defaultData } from "../defaults";
import { ITimer, ScoresState } from "../types";

import { formatTime } from "./timerUtils";
import * as data from "./dataUtils";
import * as scoreUtils from "./scoreUtils";
import _rubricData from "../../rubrics/studentTeaching.json";
import { Section } from "../types";

const rubricData = _rubricData as Section[];

export const generateObsBody = (
  observData: typeof defaultData,
  timer: ITimer
) => {
  return [
    ["Time", formatTime(timer.time)],
    ["OTR Rate", data.getOTRRate(observData, timer)],
    ["Praise Ratio", data.getPraiseRatio(observData)],
    [
      "Percent Specific",
      data.getPercent(
        observData.praise.academic + observData.praise.behavioral,
        data.getPraiseSum(observData)
      ),
    ],
    [
      "Percent Correct",
      data.getPercent(
        observData.corrections.correct,
        data.getCorrectionsSum(observData)
      ),
    ],
    [
      "Percent Engaged",
      data.getPercent(
        observData.engagement.engaged,
        observData.engagement.engaged + observData.engagement.notEngaged
      ),
    ],
    ["Transition Count", observData.misc.transitionCount],
    ["Scanning Count", observData.misc.scanningCount],
  ];
};

export const generateScoreData = (scores: ScoresState) => {
  let correct = 0;
  let possible = 0;

  const summary = rubricData.map((section) => {
    const subtotal = scoreUtils.getSubtotal(section.sectionTitle, scores);
    correct += subtotal;

    const currPossible = scoreUtils.getMaxSubtotal(
      section.sectionTitle,
      scores,
      rubricData
    );
    possible += currPossible;

    return [section.sectionTitle, `${subtotal} / ${currPossible}`];
  });

  return { correct, possible, summary };
};

export const getLetterGrade = (percent: number): string => {
  if (percent >= 93) {
    return "A";
  } else if (percent >= 90) {
    return "A-";
  } else if (percent >= 87) {
    return "B+";
  } else if (percent >= 83) {
    return "B";
  } else if (percent >= 80) {
    return "B-";
  } else {
    return "At-risk";
  }
};
