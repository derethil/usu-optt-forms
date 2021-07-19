import React from "react";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";

import { defaultData, ScoresState, ITimer, IFormInfo, Section } from "../types";
import { getSubtotal, getMaxSubtotal, getPraiseRatio, getPercent, getPraiseSum, getCorrectionsSum, formatTime } from "../utils";
import _rubricData from "../../rubrics/studentTeaching.json"
import { css } from "styled-components";

type PDFGeneratorProps = {
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer,
  formInfo: IFormInfo
}

const pdfTitle = (doc: jsPDF, content: string, ypos: number, size?: number) => {
  const currSize = doc.getFontSize();
  const currColor = doc.getTextColor();

  doc.setFontSize(size ? size : 20);
  doc.setTextColor("000");

  doc.text(content, 14, ypos);

  doc.setFontSize(currSize);
  doc.setTextColor(currColor);
}

export const PDFGenerator = (props: PDFGeneratorProps) => {
  const rubricData = _rubricData as Section[];
  const generatePDF = () => {
    const doc = new jsPDF({
      format: "a4"
    });

    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.setFont("helvetica", "normal", 400);

    // GENERAL INFO

    pdfTitle(doc, `${props.formInfo.studentTeacher} - Observation Report`, 18);

    autoTable(doc, {
      startY: 24,
      head: [['Information Report', '']],
      columnStyles: {
        1: { cellWidth: 50 }
      },
      body: [
        ['Student Teacher', props.formInfo.studentTeacher],
        ['Cooperating Teacher', props.formInfo.cooperatingTeacher],
        ['Supervisor', props.formInfo.supervisor],
        ['Date', props.formInfo.date],
        ['Next Observation Date', props.formInfo.nextDate],
        ['Observation', props.formInfo.observation],
        ['Program', props.formInfo.program],
        ['Other', props.formInfo.other],
      ],
    });

    // SUMMARY

    const sections = rubricData.map(section => section.sectionTitle);
    const summary = sections.map(section => {
      return [section, `${getSubtotal(section, props.scores)} / ${getMaxSubtotal(section, props.scores, rubricData)}`]
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [["Performance Summary", "Score"]],
      columnStyles: {
        1: { cellWidth: 50 }
      },
      body: summary,
    });

    // OBSERVATION DATA

    // pdfTitle(doc, "Observations Summary", 170, 16);

    const nestedTableCell = {
      content: '',
      styles: { minCellHeight: 71 },
    }

    autoTable(doc, {
      head: [["Observation 1", "Observation 2"]],
      headStyles: { fillColor: "#1abd9c" },
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
            head: [["Area", "Score"]],
            body: [
              ["Time", formatTime(timer.timer)],
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
    })

    doc.addPage();

    const nestedTableCells = [40, 70, 48, 32, 17, 40].map(minHeight => {
      return [{ content: "", styles: { minCellHeight: minHeight } }]
    });

    autoTable(doc, {
      startY: 18,
      // theme: "grid",
      head: [["Scores"]],
      headStyles: { fillColor: "#1abd9c" },
      body: nestedTableCells,
      didDrawCell: data => {
        if (data.row.section !== "body") return;

        const [sectionTitle, scoresObj] = Object.entries(props.scores)[data.row.index];

        autoTable(doc, {
          startY: data.cell.y + 2,
          columnStyles: {
            1: { cellWidth: 50 },
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
    })

    doc.save('table.pdf');

  }
  return <button onClick={() => generatePDF()}>Download Data</button>
}