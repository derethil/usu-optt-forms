import PDFGenerator from "./../PDFGenerator";
import { DataSchema } from "../../../types/dataTypes";
import {
  battellePraiseRatio,
  getOTRRate,
  getPraiseRatio,
  getPraiseSum,
} from "../../../utils/dataUtils";
import { genSPError, genSPSequence } from "../../../utils/pdfUtils";
import { getPercent } from "../../../utils/utils";
import Color from "../../../styledComponents/colors";
import { ITimerState, timer1 } from "../../../slices/timersSlice";
import { formOptions } from "../../../currentForm";
import { IFormInfo } from "../../../types/types";

// Procedure to generate data section report from battelle form

// startY?: startYType;
// head: string[];
// body?: RowInput[];
// headStyles?: Partial<Styles>;
// columnStyles?: { [key: string]: Partial<Styles> };

const battelleSection = (
  generator: PDFGenerator,
  data: DataSchema,
  timer: ITimerState,
  title: string = "Observation Data"
) => {
  if (data.currentForm === formOptions.battelle) {
    generator.table({ head: ["Observation Data"] });

    generator.table({
      startY: (generator.pdf as any).autoTable.previous.finalY + 2,
      head: ["Scores", ""],
      headStyles: { fillColor: Color.blues.blue, textColor: Color.lights.grayLighter },
      body: [
        [
          "Agreement",
          getPercent(
            data.scoring.agreement,
            data.scoring.agreement + data.scoring.noAgreement
          ),
        ],
        [
          "Immediacy",
          getPercent(
            data.scoring.immediate,
            data.scoring.delayed + data.scoring.immediate
          ),
        ],
      ],
    });

    generator.table({
      startY: (generator.pdf as any).autoTable.previous.finalY + 2,
      head: ["Interview", "Score (Correct | Incorrect)"],
      headStyles: { fillColor: Color.blues.blue, textColor: Color.lights.grayLighter },
      body: [
        [
          "Correct Instruction",
          `${data.interview.instruction.correct} | ${data.interview.instruction.incorrect}`,
        ],
      ],
    });

    generator.table({
      startY: (generator.pdf as any).autoTable.previous.finalY + 2,
      head: ["Structured", "Score"],
      headStyles: { fillColor: Color.blues.blue, textColor: Color.lights.grayLighter },
      body: [
        [
          "Materials",
          getPercent(
            data.structured.materials.correct,
            data.structured.materials.correct + data.structured.materials.incorrect
          ),
        ],
        [
          "Secured Attention",
          getPercent(
            data.structured.secureAttention.correct,
            data.structured.secureAttention.correct +
              data.structured.secureAttention.incorrect
          ),
        ],
        [
          "Instruction",
          getPercent(
            data.structured.instruction.correct,
            data.structured.instruction.correct + data.structured.instruction.incorrect
          ),
        ],
        [
          "Timing / # of Opp",
          getPercent(
            data.structured.allowTimeForResponse.correct,
            data.structured.allowTimeForResponse.correct +
              data.structured.allowTimeForResponse.incorrect
          ),
        ],
        [
          "Allow Time Without Prompting",
          getPercent(
            data.structured.allowWithoutPrompt.correct,
            data.structured.allowWithoutPrompt.correct +
              data.structured.allowWithoutPrompt.incorrect
          ),
        ],
        [
          "Arranging/Manipulating Materials",
          getPercent(
            data.structured.arrangeMaterials.correct,
            data.structured.arrangeMaterials.correct +
              data.structured.arrangeMaterials.incorrect
          ),
        ],
      ],
    });

    generator.table({
      startY: (generator.pdf as any).autoTable.previous.finalY + 2,
      head: ["Praise", "Score"],
      headStyles: { fillColor: Color.blues.blue, textColor: Color.lights.grayLighter },
      body: [
        ["General Praise", data.praise.general],
        ["Specific Praise", data.praise.academic],
        ["Praise Ratio", battellePraiseRatio(data)!],
      ],
    });

    generator.table({
      startY: (generator.pdf as any).autoTable.previous.finalY + 2,
      head: ["Notes"],
      headStyles: { fillColor: Color.blues.blue, textColor: Color.lights.grayLighter },
      body: [[data.notes]],
    });
  }
};

export default battelleSection;
