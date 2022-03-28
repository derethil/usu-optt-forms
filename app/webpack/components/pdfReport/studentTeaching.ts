import PDFGenerator from "./PDFGenerator";
import { genSTObservationBody } from "../../utils/pdfUtils";
import Color from "../../styledComponents/colors";
import { formOptions } from "../../currentForm";
import { DataSchema } from "../../types/dataTypes";
import { ITimerState } from "../../slices/timersSlice";

// Procedure to generate the data section of report for studentTeaching form.

const studentTeachingSection = (
  generator: PDFGenerator,
  data1: DataSchema,
  data2: DataSchema,
  timer1: ITimerState,
  timer2: ITimerState
) => {
  if (
    data1.currentForm === formOptions.studentTeaching &&
    data2.currentForm === formOptions.studentTeaching
  ) {
    generator.dualNestedTables({
      startY: (generator.pdf as any).lastAutoTable.finalY + 2,
      head: ["Observation 1", "Observation 2"],
      headStyles: { fillColor: Color.blues.blue },
      nestedTableHeight: 71,
      nestedHeads: [
        ["Area", "Score"],
        ["Area", "Score"],
      ],
      nestedBodies: [
        genSTObservationBody(data1, timer1),
        genSTObservationBody(data2, timer2),
      ],
    });
  }
};

export default studentTeachingSection;
