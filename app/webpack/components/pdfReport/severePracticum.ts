import PDFGenerator from "./PDFGenerator";
import { DataSchema } from "../../types/dataTypes";
import {
  getOTRRate,
  getPraiseRatio,
  getPraiseSum,
} from "../../utils/dataUtils";
import { genSPError, genSPSequence } from "../../utils/pdfUtils";
import { getPercent } from "../../utils/utils";
import Color from "../../styledComponents/colors";
import { ITimerState, timer1 } from "../../slices/timersSlice";
import { formOptions } from "../../currentForm";
import { useAppSelector } from "../../hooks/hooks";

const severePracticumReadingSection = (
  generator: PDFGenerator,
  data: DataSchema,
  timer: ITimerState,
  title: string = "Observation Data"
) => {
  if (
    data.currentForm === formOptions.severeReadingPracticum ||
    data.currentForm === formOptions.severeMLSPracticum ||
    data.currentForm === formOptions.reading
  ) {
    generator.dualNestedTables({
      startY: (generator.pdf as any).lastAutoTable.finalY + 2,
      head: [title, "                             "],
      headStyles: { fillColor: Color.blues.blue },
      nestedTableHeight: 54,
      nestedHeads: [
        ["Signal Sequences", "Correct | Incorrect"],
        ["Error Corrections", "Correct | Incorrect"],
      ],
      nestedBodies: [
        genSPSequence(data.signalSequence),
        genSPError(data.errorCorrection),
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

export default severePracticumReadingSection;
