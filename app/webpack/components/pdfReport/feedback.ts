import currentForm, { formOptions } from "../../currentForm";
import Color from "../../styledComponents/colors";
import { IData } from "../../types/types";
import { feedbackLabel } from "../../utils/utils";
import PDFGenerator from "./PDFGenerator";

export default function generate(generator: PDFGenerator, data: IData) {
  generator.table({
    head: ["Feedback"],
  });

  const feedbackRows = [
    [feedbackLabel(currentForm, 1), data.feedback.area1],
    [feedbackLabel(currentForm, 2), data.feedback.area2],
    [feedbackLabel(currentForm, 3), data.feedback.area3],
  ];

  if (currentForm === formOptions.selfEvaluation) {
    feedbackRows.pop();
    feedbackRows.push(
      [feedbackLabel(currentForm, 4), data.feedback.area4],
      [feedbackLabel(currentForm, 5), data.feedback.area5]
    );
  }

  feedbackRows.forEach(([title, comment], index) => {
    const startY = (generator.pdf as any).lastAutoTable.finalY + 2;
    generator.table({
      startY: index === 0 ? startY : "RELATIVE",
      head: [title as string],
      headStyles: { fillColor: Color.blues.blue },
      body: [[comment]],
    });
  });
}
