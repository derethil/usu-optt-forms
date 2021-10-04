import PDFGenerator from "./PDFGenerator";
import { genSTObservationBody } from "../../utils/pdfUtils";
import { PDFDataProps } from "./PDFData";
import Color from "../../styledComponents/colors";
import { formOptions } from "../../currentForm";

const studentTeachingSection = (
  generator: PDFGenerator,
  props: PDFDataProps
) => {
  if (
    props.data1.currentForm === formOptions.studentTeaching &&
    props.data2.currentForm === formOptions.studentTeaching
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
