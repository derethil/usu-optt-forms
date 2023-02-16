import { IData } from "../../types/types";
import PDFGenerator from "./PDFGenerator";

export default function generate(generator: PDFGenerator, data: IData) {
  generator.table({
    columnStyles: {
      0: { halign: "center" },
      1: { cellWidth: 50, halign: "center" },
    },
    head: [`Notebook Check #${data.formInfo.observation}`, "                   Score"],
    body: data.checks.map(({ score, content }) => {
      return [content, String(score)];
    }),
  });
}
