import React from "react";
import { ITimerState } from "../../slices/timersSlice";
import { DataSchema } from "../../types/dataTypes";
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
import { selectFormInfo } from "../../slices/formInfoSlice";
import { useAppSelector } from "../../hooks/hooks";
import { selectRubric } from "../../slices/rubricSlice";
import { selectFeedback } from "../../slices/feedbackSlice";
import { selectNotebookChecks } from "../../slices/notebookChecksSlice";
import { timer1, timer2, timer3 } from "../../slices/timersSlice";
import {
  data1 as dataReducer1,
  data2 as dataReducer2,
} from "../../slices/dataSlice";

export type PDFDataProps = {
  data1: DataSchema;
  data2: DataSchema;
  timer1: ITimerState;
  timer2: ITimerState;
  timer3: ITimerState;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const PDFData = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const rubricScores = useAppSelector(selectRubric);
  const feedback = useAppSelector(selectFeedback);
  const checks = useAppSelector(selectNotebookChecks);
  const data1 = useAppSelector(dataReducer1.selector);
  const data2 = useAppSelector(dataReducer2.selector);
  const timerState1 = useAppSelector(timer1.selector);
  const timerState2 = useAppSelector(timer2.selector);
  const timerState3 = useAppSelector(timer3.selector);

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
        ["Student Teacher", formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["Supervisor / Coach", formInfo.supervisor],
        ["Date", formatDate(formInfo.date)],
        ["Next Observation Date", formatDate(formInfo.nextDate)],
        ["Observation", formInfo.observation],
        ["Other", formInfo.other],
      ].concat(
        FormData[currentForm].programOptions
          ? [["Program", formInfo.program]]
          : []
      ),
    });

    // Total Score Summary

    // Section Summary

    const { score, possible, summary } = generateScoreData(rubricScores);

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
        ["Total Correct", score],
        ["Total Possible", possible],
        ["Percentage", getPercent(score, possible)],
        ["Letter Grade", getLetterGrade((score / possible) * 100)],
      ],
    });

    // Observations

    if (data1.currentForm !== formOptions.studentTeaching)
      generator.table({
        head: ["Data"],
      });

    if (
      data1.currentForm === formOptions.studentTeaching &&
      data2.currentForm === formOptions.studentTeaching
    ) {
      studentTeachingSection(generator, data1, data2, timerState1, timerState2);
    } else if (data1.currentForm === formOptions.severePracticum) {
      severePracticumReadingSection(generator, data1, timerState1);
    } else if (data1.currentForm === formOptions.bTo5Practicum) {
      bTo5PracticumSection(generator, data1, timerState1);
    } else if (data1.currentForm === formOptions.reading) {
      severePracticumReadingSection(
        generator,
        data1,
        timerState1,
        "Decoding Data"
      );
      severePracticumReadingSection(
        generator,
        data2,
        timerState2,
        "Story Reading Data"
      );
    } else if (data1.currentForm === formOptions.math) {
      mathGuidedPractice(
        generator,
        data1,
        timerState1,
        timerState2,
        timerState3
      );
    }
    // // Individual Scores

    // generator.pdf.addPage();

    generator.table({
      // startY: 18,
      head: ["Scores"],
    });

    Object.entries(rubricScores).forEach(
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

    if (data1.currentForm === formOptions.math) {
      generator.table({
        columnStyles: {
          0: { halign: "center" },
          1: { cellWidth: 50, halign: "center" },
        },
        head: [
          `Notebook Check #${formInfo.observation}`,
          "                  Score",
        ],
        body: checks.numbered.map(({ score, content }) => {
          return [content, String(score)];
        }),
      });

      generator.table({
        columnStyles: {
          0: { halign: "center" },
          1: { cellWidth: 50, halign: "center" },
        },
        head: [`Final Notebook Check`, "                   Score"],
        body: checks.final.map(({ score, content }) => {
          return [content, String(score)];
        }),
      });
    }

    // Feedback

    generator.table({
      head: ["Feedback"],
    });

    const feedbackRows = [
      ["Strengths", feedback.strengths],
      ["Suggestions", feedback.suggestions],
      ["Next Focus", feedback.nextFocus],
    ];

    feedbackRows.forEach(([title, comment], index) => {
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
      `${formInfo.studentTeacher} ${new Date(formInfo.date)
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
