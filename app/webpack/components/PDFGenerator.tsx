import React from "react";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";

import { ScoresState, ITimer, IFormInfo, Section } from "../types";
import { getSubtotal, getMaxSubtotal, getPraiseRatio, getPercent, getPraiseSum, getCorrectionsSum, formatTime } from "../utils";
import _rubricData from "../../rubrics/studentTeaching.json"
import { defaultData, IComments } from "../defaults";
import usuLogoB64 from "../../assets/usuLogoB64";
import { Button } from "../styledComponents/style";
import { Color } from "../styledComponents/colors";

type PDFGeneratorProps = {
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer,
  formInfo: IFormInfo,
  comments: IComments
}

export const PDFGenerator = (props: PDFGeneratorProps) => {
  const rubricData = _rubricData as Section[];
  const generatePDF = () => {
    const doc = new jsPDF({
      format: "a4"
    });

    doc.setFontSize(16);
    doc.setTextColor(50);
    doc.setFont("helvetica", "normal", 400);
    doc.addImage(usuLogoB64, 'png', 165, 11, 30, 10.05);



    // GENERAL INFO

    doc.text(`Observation Report (${props.formInfo.date.toISOString().slice(0, 10)})`, 14, 18);

    autoTable(doc, {
      startY: 24.5,
      head: [['Information', ""]],
      headStyles: {
        fillColor: Color.blues.primary
      },
      columnStyles: {
        1: { cellWidth: 50 }
      },
      body: [
        ['Student Teacher', props.formInfo.studentTeacher],
        ['Cooperating Teacher', props.formInfo.cooperatingTeacher],
        ['Supervisor', props.formInfo.supervisor],
        ['Date', props.formInfo.date.toISOString().slice(0, 10)],
        ['Next Observation Date', props.formInfo.nextDate.toISOString().slice(0, 10)],
        ['Observation', props.formInfo.observation],
        ['Program', props.formInfo.program],
        ['Other', props.formInfo.other],
      ],
    });

    // SUMMARY
    let totalCorrect = 0;
    let totalPossible = 0;

    const sections = rubricData.map(section => section.sectionTitle);
    const summary = sections.map(section => {
      const subtotal = getSubtotal(section, props.scores);
      totalCorrect += subtotal;

      const possible = getMaxSubtotal(section, props.scores, rubricData);
      totalPossible += possible;

      return [section, `${subtotal} / ${possible}`]
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [["Performance Summary", "Score"]],
      headStyles: {
        fillColor: Color.blues.primary
      },
      columnStyles: {
        1: { cellWidth: 50 }
      },
      body: summary,
    });

    // OBSERVATION DATA

    const nestedTableCell = {
      content: '',
      styles: { minCellHeight: 71 },
    }

    autoTable(doc, {
      head: [["Observation 1", "Observation 2"]],
      headStyles: { fillColor: Color.blues.primary },
      body: [[nestedTableCell]],
      startY: (doc as any).lastAutoTable.finalY + 5,
      didDrawCell: data => {
        if (data.row.index !== 0 || data.row.section !== "body") return;

        const obsTable = (observData: typeof defaultData, timer: ITimer, right?: boolean) => {
          autoTable(doc, {
            startY: data.cell.y + 2,
            margin: { left: right ? data.cell.x + 2 : data.cell.x },
            tableWidth: data.cell.width - 2,
            styles: {
              minCellHeight: 4,
            },
            headStyles: {
              fillColor: Color.blues.blue
            },
            head: [["Area", "Score"]],
            body: [
              ["Time", formatTime(timer.time)],
              ["OTR Rate", 0],
              ["Praise Ratio", getPraiseRatio(observData)],
              ["Percent Specific", getPercent(observData.praise.academic + observData.praise.behavioral, getPraiseSum(observData))],
              ["Percent Correct", getPercent(observData.corrections.correct, getCorrectionsSum(observData))],
              ["Percent Engaged", getPercent(observData.engagement.engaged, observData.engagement.engaged + observData.engagement.notEngaged)],
              ["Transition Count", observData.misc.transitionCount],
              ["Scanning Count", observData.misc.scanningCount]
            ]
          })
        }

        if (data.column.index === 0) {
          obsTable(props.data1, props.timer1);
        } else if (data.column.index === 1) {
          obsTable(props.data2, props.timer2, true);
        }

      }
    });

    // TOTAL SCORE

    const getLetterGrade = (percent: number): string => {
      if (percent >= 93) {
        return "A";
      } else if (percent >= 90) {
        return "A-"
      } else if (percent >= 87) {
        return "B+"
      } else if (percent >= 83) {
        return "B"
      } else if (percent >= 80) {
        return "B-"
      } else {
        return "At-risk"
      }
    }


    autoTable(doc, {
      head: [["Total Score", ""]],
      headStyles: {
        fillColor: Color.blues.primary
      },
      columnStyles: {
        1: { cellWidth: 50, fontStyle: "bold", fontSize: 12 }
      },
      body: [
        ["Total Correct", totalCorrect],
        ["Total Possible", totalPossible],
        ["Percentage", getPercent(totalCorrect, totalPossible)],
        ["Letter Grade", getLetterGrade((totalCorrect / totalPossible) * 100)]
      ]
    });

    // SCORES

    doc.addPage();

    const nestedTableCells = [40, 70, 48, 32, 17, 40].map(minHeight => {
      return [{ content: "", styles: { minCellHeight: minHeight } }]
    });

    autoTable(doc, {
      startY: 18,
      // theme: "grid",
      head: [["Scores"]],
      headStyles: { fillColor: Color.blues.primary },
      body: nestedTableCells,
      didDrawCell: data => {
        if (data.row.section !== "body") return;

        const [sectionTitle, scoresObj] = Object.entries(props.scores)[data.row.index];

        autoTable(doc, {
          startY: data.cell.y + 2,
          columnStyles: {
            1: { cellWidth: 50 },
          },
          headStyles: {
            fillColor: Color.blues.blue
          },
          margin: { left: data.cell.x },
          tableWidth: data.cell.width,
          styles: {
            minCellHeight: 4,
          },
          head: [[sectionTitle, "Score"]],
          body: Object.entries(scoresObj)

        });
      }
    });

    // FEEDBACK

    autoTable(doc, {
      startY: 40,
      head: [["Feedback"]],
      headStyles: { fillColor: Color.blues.primary }
    })

    console.log();
    console.log(props.comments.strengths);

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 2,
      head: [["Strengths"]],
      headStyles: { fillColor: Color.blues.blue },
      body: props.comments.strengths.map(comment => [comment])
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [["Suggestions"]],
      headStyles: { fillColor: Color.blues.blue },
      body: props.comments.suggestions.map(comment => [comment])

    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [["Next Focus"]],
      headStyles: { fillColor: Color.blues.blue },
      body: props.comments.nextFocus.map(comment => [comment])
    });

    // SAVE

    doc.save('table.pdf');

  }
  return (
    <Button
      onClick={() => generatePDF()}
      color={Color.blues.blue}
      textColor={Color.blues.blueLight}
      style={{ fontWeight: 600, marginBottom: "1em", borderRadius: "0.25em" }}
    >
      Generate Report
    </Button>
  )
}