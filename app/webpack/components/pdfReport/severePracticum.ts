import PDFGenerator from "./PDFGenerator";
import { FormKind } from "../../types/dataTypes";
import {
  getOTRRate,
  getPraiseRatio,
  getPraiseSum,
} from "../../utils/dataUtils";
import { genSPError, genSPSequence } from "../../utils/pdfUtils";
import { getPercent } from "../../utils/utils";
import { PDFDataProps } from "./PDFData";
import Color from "../../styledComponents/colors";

const severePracticumSection = (
  generator: PDFGenerator,
  props: PDFDataProps
) => {
  if (props.data1.formKind === FormKind.severePracticum) {
    generator.table({
      // startY: 18,
      head: ["Data"],
    });

    generator.dualNestedTables({
      startY: "RELATIVE",
      head: ["Observation Data", "                             "],
      headStyles: { fillColor: Color.blues.blue },
      nestedTableHeight: 54,
      nestedHeads: [
        ["Signal Sequences", "Correct | Incorrect"],
        ["Error Corrections", "Correct | Incorrect"],
      ],
      nestedBodies: [
        genSPSequence(props.data1.signalSequence),
        genSPError(props.data1.errorCorrection),
      ],
    });

    generator.table({
      head: ["Praise Statements", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["General Praise", props.data1.praise.general],
        ["Academic Praise", props.data1.praise.academic],
        ["Behavior Praise", props.data1.praise.behavioral],
        ["Redirect/Reprimant", props.data1.praise.reprimand],
        [
          "Total Praise Statements",
          getPraiseSum({ praise: props.data1.praise }),
        ],
        ["Praise Ratio", getPraiseRatio({ praise: props.data1.praise })],
        [
          "Percent Specific",
          getPercent(
            props.data1.praise.academic + props.data1.praise.behavioral,
            getPraiseSum({ praise: props.data1.praise })
          ),
        ],
      ],
    });

    generator.table({
      head: ["Opportunities to Respond", ""],
      headStyles: { fillColor: Color.blues.blue },
      columnStyles: { 1: { cellWidth: 50 } },
      body: [
        ["Group Responses", props.data1.cues.group],
        ["Individual Responses", props.data1.cues.individual],
        ["Total OTR", props.data1.cues.individual + props.data1.cues.group],
        ["Responses/min", getOTRRate({ cues: props.data1.cues }, props.timer1)],
      ],
    });
  }
};

export default severePracticumSection;
