import {
  ICorrection,
  ISequence,
  ISeverePracticumData,
  IStudentTeachingData,
} from "../types/dataTypes";
import { ITimerState } from "../slices/timersSlice";

import { formatTime } from "./timerUtils";
import * as data from "./dataUtils";
import * as utils from "./utils";
import { getPercent } from "./utils";
import currentForm from "../currentForm";
import FormData from "../FormData";

const rubricData = FormData[currentForm].rubric;

export const genSTObservationBody = (
  observData: IStudentTeachingData,
  timer: ITimerState
) => {
  return [
    ["Time", formatTime(timer.value)],
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

export const genSPObservationBody = (
  data: ISeverePracticumData,
  timer: ITimerState
) => {
  const signalCorrect = data.signalSequence.correct;
  const signalIncorrect = data.signalSequence.incorrect;

  const totalSequences = signalCorrect.sequence + signalIncorrect.sequence;

  const errorCorrect = data.errorCorrection.correct;
  const errorIncorrect = data.errorCorrection.incorrect;

  const totalErrors = errorCorrect.sequence + errorIncorrect.sequence;

  return [
    ["Signal Sequence", "Correct | Incorrect"],
    ["    Cue", `${signalCorrect.cue} | ${signalIncorrect.cue}`],
    ["    Pause", `${signalCorrect.pause} | ${signalIncorrect.pause}`],
    ["    Signal", `${signalCorrect.signal} | ${signalIncorrect.signal}`],
    ["    All Correct", `${signalCorrect.sequence}`],
    ["    Total Sequences", totalSequences],
    ["    % Correct", `${getPercent(signalCorrect.sequence, totalSequences)}`],
    ["Error Correction", ""],
    ["    Model", `${errorCorrect.model} | ${errorIncorrect.model}`],
    ["    Test", `${errorCorrect.test} | ${errorIncorrect.test}`],
    [
      "    Delayed Test",
      `${errorCorrect.delayedTest} | ${errorIncorrect.delayedTest}`,
    ],
    ["    All Correct", `${errorCorrect.sequence}`],
    ["    Total Sequences", totalErrors],
    ["    % Correct", `${getPercent(errorCorrect.sequence, totalErrors)}`],
  ];
};

interface ISequences {
  correct: ISequence;
  incorrect: ISequence;
}

export const genSPSequence = (data: ISequences) => {
  const correct = data.correct;
  const incorrect = data.incorrect;

  const total = correct.sequence + incorrect.sequence;

  return [
    ["Correct Cue", `${correct.cue}`],
    ["Correct Pause", `${correct.pause}`],
    ["Correct Signal", `${correct.signal}`],
    ["All Correct", `${correct.sequence}`],
    ["Total Sequences", total],
    ["% Correct", `${getPercent(correct.sequence, total)}`],
  ];
};

interface ICorrections {
  correct: ICorrection;
  incorrect: ICorrection;
}

export const genSPError = (data: ICorrections) => {
  const correct = data.correct;
  const incorrect = data.incorrect;

  const total = correct.sequence + incorrect.sequence;

  return [
    ["Model", `${correct.model} | ${incorrect.model}`],
    ["Test", `${correct.test} | ${incorrect.test}`],
    ["Delayed Test", `${correct.delayedTest} | ${incorrect.delayedTest}`],
    ["All Correct", `${correct.sequence}`],
    ["Total Sequences", total],
    ["% Correct", `${getPercent(correct.sequence, total)}`],
  ];
};
