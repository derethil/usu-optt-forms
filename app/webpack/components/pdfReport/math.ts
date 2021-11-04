import PDFGenerator from "./PDFGenerator";
import { DataSchema } from "../../types/dataTypes";

import { getPercent } from "../../utils/utils";
import Color from "../../styledComponents/colors";
import { ITimer } from "../../types/types";
import { formOptions } from "../../currentForm";
import { formatTime } from "../../utils/timerUtils";

export default function mathGuidedPractice(
  generator: PDFGenerator,
  data: DataSchema,
  openingTimer: ITimer,
  guidedTimer: ITimer,
  independentTimer: ITimer
) {
  if (data.currentForm !== formOptions.math) return;
  generator.table({
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    head: ["Time Summary", ""],
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Opening Time", formatTime(openingTimer.time)],
      ["New Material Time", formatTime(guidedTimer.time)],
      ["Independent Time", formatTime(independentTimer.time)],
      [
        "Total Time",
        formatTime(
          independentTimer.time + guidedTimer.time + openingTimer.time
        ),
      ],
    ],
  });

  generator.table({
    head: ["New Material - Guided Practice"],
  });

  generator.table({
    head: ["Engagement", ""],
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Engaged", data.engagement.engaged],
      ["Not Engaged", data.engagement.notEngaged],
      [
        "Percent Engaged",
        getPercent(
          data.engagement.engaged,
          data.engagement.engaged + data.engagement.notEngaged
        ),
      ],
    ],
  });

  generator.table({
    head: ["Cues / Directions / Opportunities to Respond", ""],
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Non Directed", data.cues.nonDirected!],
      ["Individual", data.cues.individual],
      ["Group", data.cues.group],
      [
        "Total",
        data.cues.group + data.cues.individual + data.cues.nonDirected!,
      ],
    ],
  });

  generator.table({
    head: ["Responses", ""],
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Correct", data.response.correct],
      ["Incorrect", data.response.incorrect],
      [
        "Percent Correct",
        getPercent(
          data.response.correct,
          data.response.correct + data.response.incorrect
        ),
      ],
    ],
  });

  generator.table({
    head: ["Feedback for Errors", ""],
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Model/Test or Guided", data.feedback.mtg],
      ["Not Corrected", data.feedback.notCorrected],
      [
        "Percent Corrected",
        getPercent(
          data.feedback.mtg,
          data.feedback.mtg + data.feedback.notCorrected
        ),
      ],
    ],
  });

  const praiseDivided = (
    (data.praise.academic + data.praise.behavioral + data.praise.general) /
    data.praise.reprimand
  ).toFixed(2);

  generator.table({
    head: ["Praise Type", ""],
    startY: (generator.pdf as any).lastAutoTable.finalY + 2,
    headStyles: { fillColor: Color.blues.blue },
    columnStyles: { 1: { cellWidth: 50 } },
    body: [
      ["Academic", data.praise.academic],
      ["Behavioral", data.praise.behavioral],
      ["General", data.praise.general],
      ["Redirect/Reprimand", data.praise.reprimand],
      ["Praise / Corrections", praiseDivided],
    ],
  });
}
