import React from "react";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";

import { defaultData, ScoresState, ITimer, IFormInfo, Section } from "../types";
import { getSubtotal, getMaxSubtotal, getPraiseRatio, getPercent, getPraiseSum, getCorrectionsSum, formatTime } from "../utils";
import _rubricData from "../../rubrics/studentTeaching.json"

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

const observationSummary = (doc: jsPDF, data: typeof defaultData, timer: ITimer, startY: number, title: string) => {
  autoTable(doc, {
    startY: startY,
    head: [[title, "Value"]],
    body: [
      ["Time", formatTime(timer.timer)],
      ["OTR Rate", 0],
      ["Praise Ratio", getPraiseRatio(data)],
      ["Percent Specific", getPercent(data.praise.academic + data.praise.behavioral, getPraiseSum(data))],
      ["Percent Correct", getPercent(data.corrections.correct, getCorrectionsSum(data))],
      ["Percent Engaged", getPercent(data.engagement.engaged, data.engagement.engaged + data.engagement.notEngaged)],
      ["Transition Count", data.misc.transitionCount],
      ["Scanning Count", data.misc.scanningCount]
    ]
  })
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

    pdfTitle(doc, `${props.formInfo.studentTeacher} - Observation Report`, 18);

    autoTable(doc, {
      startY: 24,
      head: [['Information Report', 'Value']],
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

    pdfTitle(doc, "Performance Summary", 102, 16)

    const sections = rubricData.map(section => section.sectionTitle);
    const summary = sections.map(section => {
      return [section, `${getSubtotal(section, props.scores)} / ${getMaxSubtotal(section, props.scores, rubricData)}`]
    });

    autoTable(doc, {
      startY: 108,
      head: [["Area", "Score"]],
      body: summary,
    });

    doc.addPage();

    pdfTitle(doc, "Observations Summary", 18, 16);

    observationSummary(doc, props.data1, props.timer1, 24, "Observation 1");
    observationSummary(doc, props.data2, props.timer2, 96, "Observation 2");

    doc.save('table.pdf');
  }
  return <button onClick={() => generatePDF()}>Download Data</button>
}