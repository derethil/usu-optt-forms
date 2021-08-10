import jsPDF, { jsPDFOptions } from "jspdf";
import autoTable, { UserOptions, Styles } from "jspdf-autotable";
import { Color } from "./styledComponents/colors";

type startYType = number | "RELATIVE";

interface TableI {
  startY?: startYType;
  head: string[];
  body?: (string | number)[][];
  headStyles?: Partial<Styles>;
  columnStyles?: { [key: string]: Partial<Styles> };
}

interface DualTableI {
  startY?: startYType;
  head: string[];
  nestedBodies: [(string | number)[][], (string | number)[][]];
  nestedHeads: [string[], string[]];
  nestedTableHeight: number;
  headStyles?: Partial<Styles>;
  columnStyles?: { [key: string]: Partial<Styles> };
}

class PDFGenerator {
  public readonly pdf: jsPDF;

  constructor(options: {
    jsPDFOptions: jsPDFOptions;
    fontSize?: number;
    textColor?: number;
    font?: string;
  }) {
    this.pdf = new jsPDF(options.jsPDFOptions);

    if (options.fontSize) this.pdf.setFontSize(options.fontSize);
    if (options.textColor) this.pdf.setTextColor(options.textColor);
    if (options.font) this.pdf.setFont(options.font, "normal", 400);
  }

  private getYCoord(startY: startYType): number {
    if (startY === "RELATIVE")
      return (this.pdf as any).lastAutoTable.finalY + 5;
    else return startY;
  }

  // Generate simple
  public table(options: TableI) {
    options.startY =
      typeof options.startY === "number" ? options.startY : "RELATIVE";

    autoTable(this.pdf, {
      startY: this.getYCoord(options.startY),
      head: [options.head],
      headStyles: {
        fillColor: Color.blues.primary,
        ...options.headStyles,
      },
      columnStyles: {
        1: { cellWidth: 50 },
        ...options.columnStyles,
      },
      body: options.body,
    });
  }

  public dualNestedTables(options: DualTableI) {
    options.startY = options.startY ? options.startY : "RELATIVE";

    // Required to generate nested tables this way as per jsPDF documentation
    const nestedTableCell = {
      content: "",
      styles: { minCellHeight: options.nestedTableHeight },
    };

    autoTable(this.pdf, {
      startY: this.getYCoord(options.startY),
      head: [options.head],
      headStyles: {
        fillColor: Color.blues.primary,
        ...options.headStyles,
      },
      columnStyles: {
        ...options.columnStyles,
      },
      body: [[nestedTableCell]],

      didDrawCell: (data) => {
        if (data.row.index !== 0 || data.row.section !== "body") return;

        const genNestedTable = (
          body: (string | number)[][],
          head: string[],
          side: "LEFT" | "RIGHT"
        ) => {
          autoTable(this.pdf, {
            startY: data.cell.y + 2,
            margin: { left: side === "RIGHT" ? data.cell.x + 2 : data.cell.x },
            tableWidth: data.cell.width - 2,
            styles: {
              minCellHeight: 4,
            },
            headStyles: {
              fillColor: Color.blues.blue,
            },
            head: [head],
            body: body,
          });
        };

        if (data.column.index === 0)
          genNestedTable(
            options.nestedBodies[0],
            options.nestedHeads[0],
            "LEFT"
          );
        else if (data.column.index === 1)
          genNestedTable(
            options.nestedBodies[1],
            options.nestedHeads[1],
            "RIGHT"
          );
      },
    });
  }
}

export default PDFGenerator;
