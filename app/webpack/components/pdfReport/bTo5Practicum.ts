import PDFGenerator from "./PDFGenerator";
import { getPercent } from "../../utils/utils";
import { PDFDataProps } from "./PDFData";
import * as dataUtils from "../../utils/dataUtils";
import Color from "../../styledComponents/colors";
import { formOptions } from "../../currentForm";
import { DataSchema } from "../../types/dataTypes";
import { ITimerState } from "../../slices/timersSlice";

// generator.table({
//   head: ["Opportunities to Respond", ""],
//   columnStyles: { 1: { cellWidth: 50 } },
//   body: [
//     ["Group Responses", data.cues.group],
//     ["Individual Responses", data.cues.individual],
//     ["Total OTR", data.cues.individual + data.cues.group],
//     ["Responses/min", getOTRRate({ cues: data.cues }, props.timer1)],
//   ],
// });

const bTo5PracticumSection = (
  generator: PDFGenerator,
  data: DataSchema,
  timer: ITimerState
) => {
  if (data.currentForm === formOptions.bTo5Practicum) {
    const correct = data.sequence.correct;
    const incorrect = data.sequence.incorrect;

    const totalInteractions =
      data.interactions.comment +
      data.interactions.question +
      data.interactions.nonTargetCue +
      correct.cue +
      correct.all;

    const incorrectCount = (
      (incorrect.attention + incorrect.cue + incorrect.pause) /
      3
    ).toFixed(2);

    const errorTotal =
      data.errorCorrection.prompt +
      data.errorCorrection.test +
      data.errorCorrection.delayedTest;

    generator.table({
      startY: (generator.pdf as any).lastAutoTable.finalY + 2,
      head: ["Instructional Sequence", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Attention", `${correct.attention} | ${incorrect.attention}`],
        ["Cue", `${correct.cue} | ${incorrect.cue}`],
        ["Pause", `${correct.pause} | ${incorrect.pause}`],
        ["All Correct", data.sequence.correct.all],
        ["Total Sequences", correct.all + Number(incorrectCount)],
        [
          "Percent Correct",
          getPercent(correct.all, correct.all + Number(incorrectCount)),
        ],
      ],
    });

    generator.table({
      head: ["instructional Interactions", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Comment", data.interactions.comment],
        ["Question", data.interactions.question],
        ["Non-Target Cue", data.interactions.nonTargetCue],
        ["Cue", correct.cue + correct.all],
        [
          "Rate of Interaction",
          ((totalInteractions / timer.value) * 60).toFixed(2),
        ],
      ],
    });

    generator.table({
      head: ["Response Format", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Group", data.responses.group],
        ["Individual", data.responses.individual],
        ["Vocal", data.responses.vocal],
        ["Non-Vocal", data.responses.nonVocal],
      ],
    });

    generator.table({
      head: ["Reinforcement", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["General Praise", data.praise.general],
        ["Academic Praise", data.praise.academic],
        ["Behavioral Praise", data.praise.behavioral],
        ["Redirect/Reprimand", data.praise.reprimand],
        ["Praise Ratio", dataUtils.getPraiseRatio(data)],
        [
          "Percent Specific",
          getPercent(
            data.praise.academic + data.praise.behavioral,
            dataUtils.getPraiseSum(data)
          ),
        ],
        [
          "Balanced Varied Praise",
          getPercent(
            data.praise.academic,
            data.praise.academic + data.praise.behavioral
          ),
        ],
      ],
    });

    generator.table({
      head: ["Error Correction", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Response Error", data.errorCorrection.responseError],
        ["Prompt", data.errorCorrection.prompt],
        ["Test", data.errorCorrection.test],
        ["Delayed Test", data.errorCorrection.delayedTest],
        [
          "Error Correction",
          Math.round(
            (errorTotal / (data.errorCorrection.responseError * 3)) * 100
          ) + "%",
        ],
      ],
    });

    generator.table({
      head: ["Prompting", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["LTM/ID'ed Prompt", data.prompts.ltm],
        ["Inconsistent Prompt", data.prompts.inconsistent],
        [
          "Prompt",
          getPercent(
            data.prompts.ltm,
            data.prompts.ltm + data.prompts.inconsistent
          ),
        ],
      ],
    });
  }
};

export default bTo5PracticumSection;
