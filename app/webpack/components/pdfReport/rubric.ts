import currentForm, { formOptions } from "../../currentForm";
import { IData, RubricScore, ScoresState } from "../../types/types";
import PDFGenerator from "./PDFGenerator";
import FormData from "../../FormData";
import Color from "../../styledComponents/colors";
import { getScore, rubricHeaders } from "../../utils/pdfUtils";
import { overrideRegex } from "../../utils/utils";
import { IStudentTeachingRubric } from "../../types/dataTypes";
import { Styles } from "jspdf-autotable";

const rubric = FormData[currentForm].rubric;
const isST = currentForm === formOptions.studentTeachingRubric;

type ColStyles = {
  [key: string]: Partial<Styles>;
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
      } else if (currentForm === formOptions.cooperatingTeacherChecklist) {
        return 100;
      } else {
        return 35;
      }

    case 1:
      if (isST) {
        return 50;
      } else if (currentForm === formOptions.cooperatingTeacherChecklist) {
        return 25;
      } else {
        return "auto";
      }

    case 2:
      if (currentForm === formOptions.cooperatingTeacherChecklist) {
        return "auto";
      } else {
        return 25;
      }

    case 3:
      return 50;

    default:
      return "auto";
  }
}

interface AreaScores {
  [key: string]: RubricScore;
}

function tableBody(scores: AreaScores, idx: number): string[][] {
  return Object.entries(scores).map(([rowTitle, rowInfo], rowIdx) => {
    const selectedOption = rubric[idx].rows[rowIdx].options.find((option) => {
      return String(option.score) === rowInfo.score;
    });

    let score = getScore(rowInfo, idx, rowIdx);
    let description = selectedOption ? selectedOption.content : score;

    if (currentForm === formOptions.teacherCandidate && rowTitle.includes("10.")) {
      score = "N/A";
    }

    if (Array.isArray(description)) {
      description = description.map((e) => "• " + e).join("\n");
    }

    if (isST) {
      return [rowTitle, String(score)];
    } else if (currentForm === formOptions.cooperatingTeacherChecklist) {
      return [rowTitle, String(score), rowInfo.comment.replace(overrideRegex, "").trim()];
    } else {
      return [
        rowTitle,
        description,
        String(score),
        rowInfo.comment.replace(overrideRegex, "").trim(),
      ];
    }
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
  Object.entries(scores).forEach(([areaTitle, area], idx) => {
    const body = tableBody(area, idx);

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
        halign: "left",
      },
      columnStyles: columnStyles,
      head: rubricHeaders(currentForm, areaTitle),
      body: body,
    });
  });
}
