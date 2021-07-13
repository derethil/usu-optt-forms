import React from "react";
import jsPDF from "jspdf";
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
  const generatePDF = () => {
    console.log(props);
  }
  return <button onClick={() => generatePDF()}>Download Data</button>
}