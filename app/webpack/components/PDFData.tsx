import React from "react";

import { ScoresState, ITimer, IFormInfo, Section } from "../types";

import { defaultData, IComments } from "../defaults";
import { Button } from "../styledComponents/style";
import Color from "../styledComponents/colors";
import usuLogoB64 from "../../static/img/usuLogoB64";
import _rubricData from "../../rubrics/studentTeaching.json";
import PDFGenerator from "../PDFGenerator";
import { generateObsBody, getLetterGrade } from "../utils/pdfUtils";
import { getPercent } from "../utils/utils";
import { generateScoreData } from "../utils/scoreUtils";

type PDFGeneratorProps = {
  scores: ScoresState;
  data1: typeof defaultData;
  data2: typeof defaultData;
  timer1: ITimer;
  timer2: ITimer;
  formInfo: IFormInfo;
  comments: IComments;
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

export const PDFData = (props: PDFGeneratorProps) => {
  const generatePDF = () => {
    // Setup
    const generator = new PDFGenerator({
      jsPDFOptions: { format: "a4" },
      fontSize: 16,
      textColor: 50,
      font: "helvetica",
    });

    generator.pdf.addImage(usuLogoB64, "png", 165, 11, 30, 10.05);

    generator.pdf.text(
      `Observation Report (${formatDate(props.formInfo.date)})`,
      14,
      18
    );

    // General Info

    generator.table({
      startY: 24.5,
      head: ["Information", ""],
      body: [
        ["Student Teacher", props.formInfo.studentTeacher],
        ["Cooperating Teacher", props.formInfo.cooperatingTeacher],
        ["Supervisor", props.formInfo.supervisor],
        ["Date", formatDate(props.formInfo.date)],
        ["Next Observation Date", formatDate(props.formInfo.nextDate)],
        ["Observation", props.formInfo.observation],
        ["Program", props.formInfo.program],
        ["Other", props.formInfo.other],
      ],
    });

    // Section Summary

    const { correct, possible, summary } = generateScoreData(props.scores);

    generator.table({
      head: ["Performance Summary", "Score"],
      body: summary,
    });

    // Observations

    generator.dualNestedTables({
      head: ["Observation 1", "Observation 2"],
      nestedTableHeight: 71,
      nestedHeads: [
        ["Area", "Score"],
        ["Area", "Score"],
      ],
      nestedBodies: [
        generateObsBody(props.data1, props.timer1),
        generateObsBody(props.data2, props.timer2),
      ],
    });

    // Total Score Summary

    generator.table({
      head: ["Total Score", ""],
      columnStyles: {
        1: { cellWidth: 50, fontStyle: "bold", fontSize: 12 },
      },
      body: [
        ["Total Correct", correct],
        ["Total Possible", possible],
        ["Percentage", getPercent(correct, possible)],
        ["Letter Grade", getLetterGrade((correct / possible) * 100)],
      ],
    });

    // Invdividual Scores

    generator.pdf.addPage();

    generator.table({
      startY: 18,
      head: ["Scores"],
    });

    Object.entries(props.scores).forEach(([sectionTitle, scoresObj], index) => {
      const startY = (generator.pdf as any).lastAutoTable.finalY + 2;
      generator.table({
        startY: index === 0 ? startY : "RELATIVE",
        headStyles: { fillColor: Color.blues.blue },
        head: [sectionTitle, "Score"],
        body: Object.entries(scoresObj),
      });
    });

    // Feedback

    generator.table({
      head: ["Feedback"],
    });

    const feedback = [
      ["Strengths", props.comments.strengths],
      ["Suggestions", props.comments.suggestions],
      ["Next Focus", props.comments.nextFocus],
    ];

    console.log(feedback);

    feedback.forEach(([title, comment], index) => {
      const startY = (generator.pdf as any).lastAutoTable.finalY + 2;
      generator.table({
        startY: index === 0 ? startY : "RELATIVE",
        head: [title as string],
        headStyles: { fillColor: Color.blues.blue },
        body: [[comment]],
      });
    });

    // Save

    generator.pdf.save(
      `${props.formInfo.studentTeacher} ${new Date(props.formInfo.date)
        .toISOString()
        .slice(0, 10)}.pdf`
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
