import jsPDF, { jsPDFOptions } from "jspdf";
import autoTable, { UserOptions, Styles } from "jspdf-autotable";
import { Color } from "./styledComponents/colors";

type startYType = number | "RELATIVE";

class PDFGenerator {
  public pdf: jsPDF;

  constructor(
    jsPDFOptions: jsPDFOptions,
    fontSize?: number,
    textColor?: number,
    font?: string
  ) {
    this.pdf = new jsPDF(jsPDFOptions);

    if (fontSize) this.pdf.setFontSize(fontSize);
    if (textColor) this.pdf.setTextColor(textColor);
    if (font) this.pdf.setFont(font, "normal", 400);
  }

  private getYCoord(startY: startYType): number {
    if (startY === "RELATIVE")
      return (this.pdf as any).lastAutoTable.finalY + 5;
    else return startY;
  }

  // Generate simple
  public table(
    startY: startYType,
    head: string[] | string,
    body: string[][],
    headStyles?: Partial<Styles>,
    columnStyles?: { [key: string]: Partial<Styles> }
  ) {
    autoTable(this.pdf, {
      startY: this.getYCoord(startY),
      head: typeof head === "object" ? [head] : [[head]],
      headStyles: {
        fillColor: Color.blues.primary,
        ...headStyles,
      },
      columnStyles: {
        1: { cellWidth: 50 },
        ...columnStyles,
      },
      body: body,
    });
  }

  public dualNestedTables(
    startY: startYType,
    head: string[] | string,
    nestedTableHeight: number,
    body: string[][],
    headStyles?: Partial<Styles>,
    columnStyles?: { [key: string]: Partial<Styles> }
  ) {
    // Required to generate nested tables this way as per jsPDF documentation
    const nestedTableCell = {
      content: "",
      styles: { minCellHeight: nestedTableHeight },
    };

    autoTable(this.pdf, {
      startY: this.getYCoord(startY),
      head: typeof head === "object" ? [head] : [[head]],
      headStyles: {
        fillColor: Color.blues.primary,
        ...headStyles,
      },
      columnStyles: {
        1: { cellWidth: 50 },
        ...columnStyles,
      },
      body: [[nestedTableCell]],

      didDrawCell: (data) => {
        if (data.row.index !== 0 || data.row.section !== "body") return;

        const genNestedTable = () => {
          autoTable(this.pdf, {});
        };
      },
    });
  }
}
