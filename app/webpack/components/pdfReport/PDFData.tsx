import React from "react";

import { ScoresState, ITimer, IFormInfo } from "../../types/types";

import { IComments } from "../../defaults/defaults";
import { DataSchema, INotebookCheck } from "../../types/dataTypes";
import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import usuLogoB64 from "../../../static/img/usuLogoB64";

import PDFGenerator from "./PDFGenerator";
import { getLetterGrade, getScore } from "../../utils/pdfUtils";
import { getPercent, overrideRegex } from "../../utils/utils";
import { generateScoreData } from "../../utils/scoreUtils";

import studentTeachingSection from "./studentTeaching";
import severePracticumReadingSection from "./severePracticum";
import bTo5PracticumSection from "./bTo5Practicum";
import currentForm, { formOptions } from "../../currentForm";
import FormData from "../../FormData";
import mathGuidedPractice from "./math";

export type PDFDataProps = {
  scores: ScoresState;
  checks: INotebookCheck;
  data1: DataSchema;
  data2: DataSchema;
  timer1: ITimer;
  timer2: ITimer;
  timer3: ITimer;
  formInfo: IFormInfo;
  comments: IComments;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const PDFData = (props: PDFDataProps) => {
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
      `USU SPER ${FormData[currentForm].title} Observation Report`,
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
        ["Supervisor / Coach", props.formInfo.supervisor],
        ["Date", formatDate(props.formInfo.date)],
        ["Next Observation Date", formatDate(props.formInfo.nextDate)],
        ["Observation", props.formInfo.observation],
        ["Other", props.formInfo.other],
      ].concat(
        FormData[currentForm].programOptions
          ? [["Program", props.formInfo.program]]
          : []
      ),
    });

    // Total Score Summary

    // Section Summary

    const { correct, possible, summary } = generateScoreData(props.scores);

    generator.table({
      head: ["Performance Summary", "Score"],
      body: summary,
    });

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

    // Observations

    if (props.data1.currentForm !== formOptions.studentTeaching)
      generator.table({
        head: ["Data"],
      });

    if (
      props.data1.currentForm === formOptions.studentTeaching &&
      props.data2.currentForm === formOptions.studentTeaching
    ) {
      studentTeachingSection(generator, props);
    } else if (props.data1.currentForm === formOptions.severePracticum) {
      severePracticumReadingSection(generator, props.data1, props.timer1);
    } else if (props.data1.currentForm === formOptions.bTo5Practicum) {
      bTo5PracticumSection(generator, props);
    } else if (props.data1.currentForm === formOptions.reading) {
      severePracticumReadingSection(
        generator,
        props.data1,
        props.timer1,
        "Decoding Data"
      );
      severePracticumReadingSection(
        generator,
        props.data2,
        props.timer2,
        "Story Reading Data"
      );
    } else if (props.data1.currentForm === formOptions.math) {
      mathGuidedPractice(
        generator,
        props.data1,
        props.timer1,
        props.timer2,
        props.timer3
      );
    }
    // // Individual Scores

    // generator.pdf.addPage();

    generator.table({
      // startY: 18,
      head: ["Scores"],
    });

    Object.entries(props.scores).forEach(
      ([sectionTitle, scoresObj], sectionIdx) => {
        const startY = (generator.pdf as any).lastAutoTable.finalY + 2;

        generator.table({
          startY: sectionIdx === 0 ? startY : "RELATIVE",
          headStyles: { fillColor: Color.blues.blue },
          columnStyles: {
            0: { cellWidth: 115, valign: "middle" },
            1: { cellWidth: "auto", halign: "center", valign: "middle" },
            2: {
              cellWidth: 50,
              halign: "center",
              cellPadding: { horizontal: 5, vertical: 2 },
            },
          },
          head: [sectionTitle, "  Score", "             Comments"],
          body: Object.entries(scoresObj).map(([rowTitle, rowInfo], rowIdx) => {
            const scoreDisplay = getScore(rowInfo, sectionIdx, rowIdx);
            return [
              rowTitle,
              scoreDisplay,
              rowInfo.comment.replace(overrideRegex, ""),
            ];
          }),
        });
      }
    );

    if (props.data1.currentForm === formOptions.math) {
      generator.table({
        columnStyles: {
          0: { halign: "center" },
          1: { cellWidth: 50, halign: "center" },
        },
        head: [
          `Notebook Check #${props.formInfo.observation}`,
          "                  Score",
        ],
        body: props.checks.numbered.map(({ score, content }) => {
          console.log(content);
          console.log(score);
          return [content, String(score)];
        }),
      });

      generator.table({
        columnStyles: {
          0: { halign: "center" },
          1: { cellWidth: 50, halign: "center" },
        },
        head: [`Final Notebook Check`, "                   Score"],
        body: props.checks.final.map(({ score, content }) => {
          console.log(content);
          console.log(score);
          return [content, String(score)];
        }),
      });
    }

    // Feedback

    generator.table({
      head: ["Feedback"],
    });

    const feedback = [
      ["Strengths", props.comments.strengths],
      ["Suggestions", props.comments.suggestions],
      ["Next Focus", props.comments.nextFocus],
    ];

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
