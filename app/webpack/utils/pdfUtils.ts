import { defaultData } from "../defaults";
import { ITimer, ScoresState } from "../types";

import { formatTime } from "./timerUtils";
import * as data from "./dataUtils";
import * as utils from "./utils";
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
      utils.getPercent(
        observData.praise.academic + observData.praise.behavioral,
        data.getPraiseSum(observData)
      ),
    ],
    [
      "Percent Correct",
      utils.getPercent(
        observData.corrections.correct,
        data.getCorrectionsSum(observData)
      ),
    ],
    [
      "Percent Engaged",
      utils.getPercent(
        observData.engagement.engaged,
        observData.engagement.engaged + observData.engagement.notEngaged
      ),
    ],
    ["Transition Count", observData.misc.transitionCount],
    ["Scanning Count", observData.misc.scanningCount],
  ];
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

type rowInfoType = { score: string; comment: string };

export const getScore = (
  rowInfo: rowInfoType,
  sectionIdx: number,
  rowIdx: number
) => {
  if (
    rowInfo.score === "Yes" ||
    rowInfo.score === "N/A" ||
    Number(rowInfo.score) < 0
  ) {
    return rowInfo.score;
  } else {
    const maxScore = rubricData[sectionIdx].rows[rowIdx].options[0].score;
    return `${rowInfo.score} / ${maxScore}`;
  }
};
