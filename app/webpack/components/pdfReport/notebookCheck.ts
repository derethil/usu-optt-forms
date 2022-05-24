import { IData } from "../../types/types";
import PDFGenerator from "./PDFGenerator";

export function generateNotebookChecks(generator: PDFGenerator, data: IData) {
  generator.table({
    columnStyles: {
      0: { halign: "center" },
      1: { cellWidth: 50, halign: "center" },
    },
    head: [
      `Notebook Check #${data.formInfo.observation}`,
      "                   Score",
    ],
    body: data.checks.numbered.map(({ score, content }) => {
      return [content, String(score)];
    }),
  });

  generator.table({
    columnStyles: {
      0: { halign: "center" },
      1: { cellWidth: 50, halign: "center" },
    },
    head: [`Final Notebook Check`, "                   Score"],
    body: data.checks.final.map(({ score, content }) => {
      return [content, String(score)];
    }),
  });
}
