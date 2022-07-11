import React from "react";

import { ITimerState } from "../../slices/timersSlice";
import { DataSchema } from "../../types/dataTypes";
import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import usuLogoB64 from "../../../static/img/usuLogoB64";
import PDFGenerator from "./PDFGenerator";
import FormData from "../../FormData";
import { useSelectAll } from "../../hooks/hooks";
import { getLetterGrade } from "../../utils/pdfUtils";
import { getPercent } from "../../utils/utils";
import { generateScoreData } from "../../utils/scoreUtils";
import currentForm, { formOptions } from "../../currentForm";

import generateRubric from "./rubric";
import generateObservations from "./observations";
import generateFeedback from "./feedback";
import generateNotebookChecks from "./notebookCheck";
import generateFormInfo from "./formInfo";

// Component that provides PDF generation and the button to do so.

export type PDFDataProps = {
  data1: DataSchema;
  data2: DataSchema;
  timer1: ITimerState;
  timer2: ITimerState;
  timer3: ITimerState;
};

const PDFData = () => {
  const data = useSelectAll();
  const { score, possible, summary } = generateScoreData(data.rubricScores);

  const generatePDF = () => {
    // Setup
    const generator = new PDFGenerator({
      jsPDFOptions: { format: "a4" },
      fontSize: 16,
      textColor: 50,
      font: "helvetica",
    });

    // USU Logo
    generator.pdf.addImage(usuLogoB64, "png", 165, 11, 30, 10.05); // Top-right USU logo

    // Report title
    if (currentForm !== formOptions.teacherCandidate) {
      generator.pdf.text(`USU SPER ${FormData[currentForm].title} Report`, 14, 18);
    } else {
      generator.pdf.text(`SPED ${FormData[currentForm].title} Form`, 14, 18);
    }

    // General Info
    generateFormInfo(generator, data);

    // Area Scores
    generator.table({
      head: ["Performance Summary", "Score"],
      body: summary,
    });

    // Total Score
    if (currentForm !== formOptions.studentTeachingRubric) {
      generator.table({
        head: ["Total Score", ""],
        columnStyles: {
          1: { cellWidth: 50, fontStyle: "bold", fontSize: 12 },
        },
        body: [
          ["Total Correct", score],
          ["Total Possible", possible],
          ["Percentage", getPercent(score, possible)],
          ["Letter Grade", getLetterGrade((score / possible) * 100)],
        ],
      });
    }

    // Observation Narrative
    if (currentForm === formOptions.teacherCandidate) {
      generator.table({
        startY: "RELATIVE",
        head: ["Observation Narrative"],
        headStyles: { fillColor: Color.blues.blue },
        body: [[data.formInfo.narrative]],
      });
    }

    // Observations & Rubric Scores
    generateObservations(generator, data);
    generateRubric(generator, data);

    // Add notebook check data if rubric is math
    if (currentForm === formOptions.mmMath) {
      generateNotebookChecks(generator, data);
    }

    // Feedback
    generateFeedback(generator, data);

    // Save to file
    const date = new Date(data.formInfo.date);
    generator.pdf.save(
      `${data.formInfo.studentTeacher} ${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}.pdf`
    );
  };

  return (
    <Button
      onClick={() => generatePDF()}
      color={Color.blues.blue}
      textColor={Color.blues.blueLight}
      style={{
        fontWeight: 600,
        marginBottom: "1em",
        width: "45%",
        height: "104px",
        border: `3px solid ${Color.neutrals.grayDark}`,
        boxSizing: "border-box",
      }}
    >
      Generate Report
    </Button>
  );
};

export default PDFData;
