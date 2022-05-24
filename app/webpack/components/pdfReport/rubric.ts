import currentForm, { formOptions } from "../../currentForm";
import { IData, ScoresState } from "../../types/types";
import PDFGenerator from "./PDFGenerator";
import FormData from "../../FormData";
import Color from "../../styledComponents/colors";
import { getScore, rubricHeaders } from "../../utils/pdfUtils";
import { overrideRegex } from "../../utils/utils";
import { ISTRubric } from "../../types/dataTypes";
import { Styles } from "jspdf-autotable";

const rubric = FormData[currentForm].rubric;
const isST = currentForm === formOptions.STRubric;

type ColStyles = {
  [key: string]: Partial<Styles>;
};

type IScoresObj = {
  [key: string]: {
    score: string;
    comment: string;
    maxScore?: string | undefined;
  };
};

const columnStyles: ColStyles = {
  0: {
    cellWidth: cellWidth(0),
    valign: "middle",
  },
  1: {
    cellWidth: cellWidth(1),
    halign: currentForm === formOptions.teacherCandidate ? "left" : "center",
    valign: "middle",
    cellPadding: { vertical: 4 },
  },
  2: {
    cellWidth: cellWidth(2),
    halign: "center",
    valign: "middle",
  },
  3: {
    cellWidth: cellWidth(3),
    halign: "center",
    cellPadding: { horizontal: 5, vertical: 2 },
  },
};

function cellWidth(colIdx: number): number | "auto" {
  switch (colIdx) {
    case 0:
      if (isST) {
        return "auto";
      } else if (currentForm === formOptions.teacherCandidate) {
        return 50;
      } else {
        return 35;
      }

    case 1:
      return isST ? 50 : "auto";

    case 2:
      return 25;

    case 3:
      return 50;

    default:
      return "auto";
  }
}

function tableBody(scores: IScoresObj, idx: number): string[][] {
  return Object.entries(scores).map(([rowTitle, rowInfo], rowIdx) => {
    const selectedOption = rubric[idx].rows[rowIdx].options.find((option) => {
      return String(option.score) === rowInfo.score;
    });
    let score = getScore(rowInfo, idx, rowIdx);
    let description = selectedOption ? selectedOption.content : score;

    if (
      currentForm === formOptions.teacherCandidate &&
      rowTitle.includes("10.")
    ) {
      score = "N/A";
    }

    if (!Array.isArray(description)) {
      description = description.split("//");
    }

    if (Array.isArray(description)) {
      description = description.map((e) => "• " + e).join("\n");
    }

    const rubricRow = [
      rowTitle,
      description,
      score,
      rowInfo.comment.replace(overrideRegex, "").trim(),
    ];

    return isST ? [rowTitle, score] : rubricRow;
  });
}

export default function generate(generator: PDFGenerator, data: IData): void {
  generator.table({
    // startY: 18,
    head: ["Scores"],
  });

  // Loops over the rubric and puts it in the correct format

  const startY = (generator.pdf as any).lastAutoTable.finalY + 2;

  const scores = data.rubricScores;
  Object.entries(scores).forEach(([sectionTitle, scoresObj], idx) => {
    const body = tableBody(scoresObj, idx);

    if (isST) {
      body.push([
        "District Coach conferenced with the student teacher after grading?",
        Object.values(data.questions)[idx],
      ]);
    }

    generator.table({
      startY: idx === 0 ? startY : "RELATIVE",
      headStyles: {
        fillColor: Color.blues.blue,
        valign: "middle",
        halign: "center",
      },
      columnStyles: columnStyles,
      head: rubricHeaders(currentForm, sectionTitle),
      body: body,
    });
  });
}
