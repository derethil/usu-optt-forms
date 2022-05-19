import React from "react";
import { ITimerState } from "../../slices/timersSlice";
import { DataSchema } from "../../types/dataTypes";
import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import usuLogoB64 from "../../../static/img/usuLogoB64";

import PDFGenerator from "./PDFGenerator";
import {
  formatDate,
  getLetterGrade,
  getScore,
  rubricHeaders,
} from "../../utils/pdfUtils";
import { feedbackLabel, getPercent, overrideRegex } from "../../utils/utils";
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
import { selectQuestions } from "../../slices/questionsSlice";
import generateFormInfoBody from "./formInfoGenerator";

// Component that provides PDF generation and the button to do so.

export type PDFDataProps = {
  data1: DataSchema;
  data2: DataSchema;
  timer1: ITimerState;
  timer2: ITimerState;
  timer3: ITimerState;
};

const PDFData = () => {
  // The report uses all data so we need to grab every state object
  const formInfo = useAppSelector(selectFormInfo);
  const rubricScores = useAppSelector(selectRubric);
  const feedback = useAppSelector(selectFeedback);
  const checks = useAppSelector(selectNotebookChecks);
  const data1 = useAppSelector(dataReducer1.selector);
  const data2 = useAppSelector(dataReducer2.selector);
  const timerState1 = useAppSelector(timer1.selector);
  const timerState2 = useAppSelector(timer2.selector);
  const timerState3 = useAppSelector(timer3.selector);
  const questions = useAppSelector(selectQuestions);

  const isSTRubric = currentForm === formOptions.STRubric;

  const generatePDF = () => {
    // Setup
    const generator = new PDFGenerator({
      jsPDFOptions: { format: "a4" },
      fontSize: 16,
      textColor: 50,
      font: "helvetica",
    });

    generator.pdf.addImage(usuLogoB64, "png", 165, 11, 30, 10.05); // Top-right USU logo

    generator.pdf.text(
      `USU SPER ${FormData[currentForm].title} Report`,
      14,
      18
    );

    // General Info

    generator.table({
      startY: 24.5,
      head: ["Information", ""],
      body: generateFormInfoBody(formInfo),
    });

    // Total Score Summary

    // Section Summary

    const { score, possible, summary } = generateScoreData(rubricScores);

    generator.table({
      head: ["Performance Summary", "Score"],
      body: summary,
    });

    if (!isSTRubric) {
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

    // Observations

    if (currentForm === formOptions.studentTeaching) {
      studentTeachingSection(generator, data1, data2, timerState1, timerState2);
    } else if (
      [
        formOptions.severeReadingPracticum,
        formOptions.severeMLSPracticum,
        formOptions.selfEvaluation,
      ].includes(currentForm)
    ) {
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

    generator.table({
      // startY: 18,
      head: ["Scores"],
    });

    const rubric = FormData[currentForm].rubric;

    // Loops over the rubric and puts it in the correct format

    Object.entries(rubricScores).forEach(
      ([sectionTitle, scoresObj], sectionIdx) => {
        const startY = (generator.pdf as any).lastAutoTable.finalY + 2;

        const body = Object.entries(scoresObj).map(
          ([rowTitle, rowInfo], rowIdx) => {
            const selectedOption = rubric[sectionIdx].rows[rowIdx].options.find(
              (option) => {
                return String(option.score) === rowInfo.score;
              }
            );
            let score = getScore(rowInfo, sectionIdx, rowIdx);
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

            return isSTRubric ? [rowTitle, score] : rubricRow;
          }
        );

        const conferenced = Object.values(questions);

        if (isSTRubric) {
          body.push([
            "District Coach conferenced with the student teacher after grading?",
            conferenced[sectionIdx],
          ]);
        }

        generator.table({
          startY: sectionIdx === 0 ? startY : "RELATIVE",
          headStyles: {
            fillColor: Color.blues.blue,
            valign: "middle",
            halign: "center",
          },
          columnStyles: {
            0: {
              cellWidth: isSTRubric
                ? "auto"
                : currentForm === formOptions.teacherCandidate
                ? 50
                : 35,
              valign: "middle",
            },
            1: {
              cellWidth: isSTRubric ? 50 : "auto",
              halign:
                currentForm === formOptions.teacherCandidate
                  ? "left"
                  : "center",
              valign: "middle",
              cellPadding: { vertical: 4 },
            },
            2: { cellWidth: 25, halign: "center", valign: "middle" },
            3: {
              cellWidth: 50,
              halign: "center",
              cellPadding: { horizontal: 5, vertical: 2 },
            },
          },
          head: rubricHeaders(currentForm, sectionTitle),
          body: body,
        });
      }
    );

    // Add notebook check data if rubric is math
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
      [feedbackLabel(currentForm, 1), feedback.area1],
      [feedbackLabel(currentForm, 2), feedback.area2],
      [feedbackLabel(currentForm, 3), feedback.area3],
    ];

    if (currentForm === formOptions.selfEvaluation) {
      feedbackRows.pop();
      feedbackRows.push(
        [feedbackLabel(currentForm, 4), feedback.area4],
        [feedbackLabel(currentForm, 5), feedback.area5]
      );
    }

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
    const date = new Date(formInfo.date);
    generator.pdf.save(
      `${formInfo.studentTeacher} ${
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
