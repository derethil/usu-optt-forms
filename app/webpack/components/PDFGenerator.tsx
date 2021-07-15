import React from "react";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";
import { defaultData, ScoresState, ITimer, IFormInfo } from "../types";

type PDFGeneratorProps = {
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer,
  formInfo: IFormInfo
}



export const PDFGenerator = (props: PDFGeneratorProps) => {
  const doc = new jsPDF({
    unit: "in",
    format: "a4"
  });

  const generatePDF = () => {
    doc.text("Student Information", 0.75, 0.75);
    autoTable(doc, {
      head: [['Name', 'Email', 'Country']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
        // ...
      ],
    })

    doc.save('table.pdf');
  }
  return <button onClick={() => generatePDF()}>Download Data</button>
}