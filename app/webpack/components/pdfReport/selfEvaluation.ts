import PDFGenerator from "./PDFGenerator";
import { DataSchema } from "../../types/dataTypes";
import {
  getOTRRate,
  getPraiseRatio,
  getPraiseSum,
} from "../../utils/dataUtils";
import { getPercent } from "../../utils/utils";
import Color from "../../styledComponents/colors";
import { ITimerState } from "../../slices/timersSlice";
import { formOptions } from "../../currentForm";

const selfEvaluationSection = (
  generator: PDFGenerator,
  data: DataSchema,
  timer: ITimerState,
  title: string = "Observation Data"
) => {
  if (data.currentForm === formOptions.severePracticum) {
    const correct = data.signalSequence.correct;
    const errorCorrect = data.errorCorrection.correct;
    const errorIncorrect = data.errorCorrection.incorrect;

    generator.dualNestedTables({
      startY: (generator.pdf as any).lastAutoTable.finalY + 2,
      head: [title, "                             "],
      headStyles: { fillColor: Color.blues.blue },
      nestedTableHeight: 54,
      nestedHeads: [
        ["Signal Sequences", "Correct"],
        ["Error Corrections", "Total | % Correct"],
      ],
      nestedBodies: [
        [
          ["Correct Cue", `${correct.cue}`],
          ["Correct Pause", `${correct.pause}`],
          ["Correct Signal", `${correct.signal}`],
          ["All Correct", `${correct.sequence}`],
          ["Total Sequences", correct.sequence + errorIncorrect.sequence],
          [
            "% Correct",
            `${getPercent(correct.sequence, errorIncorrect.sequence)}`,
          ],
        ],
        [
          [
            "Model",
            `${errorCorrect.model} / ${getPercent(
              errorCorrect.model,
              errorIncorrect.sequence + errorCorrect.model
            )}`,
          ],
          [
            "Test",
            `${errorCorrect.test} / ${getPercent(
              errorCorrect.test,
              errorIncorrect.sequence + errorCorrect.test
            )}`,
          ],
          [
            "Delayed Test",
            `${errorCorrect.delayedTest} / ${getPercent(
              errorCorrect.delayedTest,
              errorIncorrect.sequence + errorCorrect.delayedTest
            )}`,
          ],
        ],
      ],
    });

    generator.table({
      head: ["Praise Statements", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["General Praise", data.praise.general],
        ["Academic Praise", data.praise.academic],
        ["Behavior Praise", data.praise.behavioral],
        ["Redirect/Reprimant", data.praise.reprimand],
        ["Total Praise Statements", getPraiseSum({ praise: data.praise })],
        ["Praise Ratio", getPraiseRatio({ praise: data.praise })],
        [
          "Percent Specific",
          getPercent(
            data.praise.academic + data.praise.behavioral,
            getPraiseSum({ praise: data.praise })
          ),
        ],
      ],
    });

    generator.table({
      head: ["Opportunities to Respond", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Group Responses", data.cues.group],
        ["Individual Responses", data.cues.individual],
        ["Total OTR", data.cues.individual + data.cues.group],
        ["Responses/min", getOTRRate({ cues: data.cues }, timer)],
      ],
    });
  }
};

export default selfEvaluationSection;
