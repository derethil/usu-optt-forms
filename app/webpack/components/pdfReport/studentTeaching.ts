import PDFGenerator from "./PDFGenerator";
import { FormKind } from "../../types/dataTypes";
import { genSTObservationBody } from "../../utils/pdfUtils";
import { PDFDataProps } from "./PDFData";
import Color from "../../styledComponents/colors";

const studentTeachingSection = (
  generator: PDFGenerator,
  props: PDFDataProps
) => {
  if (
    props.data1.formKind === FormKind.studentTeaching &&
    props.data2.formKind === FormKind.studentTeaching
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
        genSTObservationBody(props.data1, props.timer1),
        genSTObservationBody(props.data2, props.timer2),
      ],
    });
  }
};

export default studentTeachingSection;
