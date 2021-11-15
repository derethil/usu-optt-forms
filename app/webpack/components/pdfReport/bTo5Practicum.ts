import PDFGenerator from "./PDFGenerator";
import { getPercent } from "../../utils/utils";
import { PDFDataProps } from "./PDFData";
import * as dataUtils from "../../utils/dataUtils";
import Color from "../../styledComponents/colors";
import { formOptions } from "../../currentForm";

// generator.table({
//   head: ["Opportunities to Respond", ""],
//   columnStyles: { 1: { cellWidth: 50 } },
//   body: [
//     ["Group Responses", props.data1.cues.group],
//     ["Individual Responses", props.data1.cues.individual],
//     ["Total OTR", props.data1.cues.individual + props.data1.cues.group],
//     ["Responses/min", getOTRRate({ cues: props.data1.cues }, props.timer1)],
//   ],
// });

const bTo5PracticumSection = (generator: PDFGenerator, props: PDFDataProps) => {
  if (props.data1.currentForm === formOptions.bTo5Practicum) {
    const correct = props.data1.sequence.correct;
    const incorrect = props.data1.sequence.incorrect;

    const totalInteractions =
      props.data1.interactions.comment +
      props.data1.interactions.question +
      props.data1.interactions.nonTargetCue +
      correct.cue +
      correct.all;

    const incorrectCount = (
      (incorrect.attention + incorrect.cue + incorrect.pause) /
      3
    ).toFixed(2);

    const errorTotal =
      props.data1.errorCorrection.prompt +
      props.data1.errorCorrection.test +
      props.data1.errorCorrection.delayedTest;

    generator.table({
      startY: (generator.pdf as any).lastAutoTable.finalY + 2,
      head: ["Instructional Sequence", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Attention", `${correct.attention} | ${incorrect.attention}`],
        ["Cue", `${correct.cue} | ${incorrect.cue}`],
        ["Pause", `${correct.pause} | ${incorrect.pause}`],
        ["All Correct", props.data1.sequence.correct.all],
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
        ["Comment", props.data1.interactions.comment],
        ["Question", props.data1.interactions.question],
        ["Non-Target Cue", props.data1.interactions.nonTargetCue],
        ["Cue", correct.cue + correct.all],
        [
          "Rate of Interaction",
          ((totalInteractions / props.timer1.value) * 60).toFixed(2),
        ],
      ],
    });

    generator.table({
      head: ["Response Format", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Group", props.data1.responses.group],
        ["Individual", props.data1.responses.individual],
        ["Vocal", props.data1.responses.vocal],
        ["Non-Vocal", props.data1.responses.nonVocal],
      ],
    });

    generator.table({
      head: ["Reinforcement", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["General Praise", props.data1.praise.general],
        ["Academic Praise", props.data1.praise.academic],
        ["Behavioral Praise", props.data1.praise.behavioral],
        ["Redirect/Reprimand", props.data1.praise.reprimand],
        ["Praise Ratio", dataUtils.getPraiseRatio(props.data1)],
        [
          "Percent Specific",
          getPercent(
            props.data1.praise.academic + props.data1.praise.behavioral,
            dataUtils.getPraiseSum(props.data1)
          ),
        ],
        [
          "Balanced Varied Praise",
          getPercent(
            props.data1.praise.academic,
            props.data1.praise.academic + props.data1.praise.behavioral
          ),
        ],
      ],
    });

    generator.table({
      head: ["Error Correction", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Response Error", props.data1.errorCorrection.responseError],
        ["Prompt", props.data1.errorCorrection.prompt],
        ["Test", props.data1.errorCorrection.test],
        ["Delayed Test", props.data1.errorCorrection.delayedTest],
        [
          "Error Correction",
          Math.round(
            (errorTotal / (props.data1.errorCorrection.responseError * 3)) * 100
          ) + "%",
        ],
      ],
    });

    generator.table({
      head: ["Prompting", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["LTM/ID'ed Prompt", props.data1.prompts.ltm],
        ["Inconsistent Prompt", props.data1.prompts.inconsistent],
        [
          "Prompt",
          getPercent(
            props.data1.prompts.ltm,
            props.data1.prompts.ltm + props.data1.prompts.inconsistent
          ),
        ],
      ],
    });
  }
};

export default bTo5PracticumSection;
