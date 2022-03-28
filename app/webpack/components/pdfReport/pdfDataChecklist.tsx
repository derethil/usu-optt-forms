import React from "react";
import { ITimerState } from "../../slices/timersSlice";
import { DataSchema } from "../../types/dataTypes";
import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import usuLogoB64 from "../../../static/img/usuLogoB64";

import PDFGenerator from "./PDFGenerator";

import currentForm from "../../currentForm";
import FormData from "../../FormData";

import { selectFormInfo } from "../../slices/formInfoSlice";
import { useAppSelector } from "../../hooks/hooks";
import { selectChecklist } from "../../slices/checklistSlice";

import { IChecklistJSONRow, IChecklistJSON } from "../../types/dataTypes";

import checklistJSON from "../../../rubrics/practicumChecklist.json";

// Procedure to generate the report for the practicumChecklist form

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

const PDFDataChecklist = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const checklist = useAppSelector(selectChecklist);

  const generatePDF = () => {
    // Setup
    const generator = new PDFGenerator({
      jsPDFOptions: { format: "a4" },
      fontSize: 16,
      textColor: 50,
      font: "helvetica",
    });

    generator.pdf.addImage(usuLogoB64, "png", 165, 11, 30, 10.05);

    generator.pdf.text(`USU OPTT ${FormData[currentForm].title}`, 14, 18);

    // General Info

    generator.table({
      startY: 24.5,
      head: ["Information", ""],
      body: [
        ["Student Teacher", formInfo.studentTeacher],
        ["Cooperating Teacher", formInfo.cooperatingTeacher],
        ["District Coach", formInfo.supervisor],
        ["Date", formatDate(formInfo.date)],
        ["Other", formInfo.other],
        ["Program", formInfo.program],
      ],
    });

    generator.table({
      startY: "RELATIVE",
      head: ["Practicum Content Areas", "", ""],
      body: [
        ["SPECIALIZATION", "FALL", "SPRING"],
        [
          "Birth to 5",
          "Teaching Intensive Instruction / Large Group",
          "Teaching routines based (embedded) instruction",
        ],
        ["Mild/Moderate", "Teaching Reading / ELA", "Teaching Math"],
        ["Severe", "Teaching Reading/ELA", "Teaching Life Skills"],
      ],
    });

    const checklistContents: [string, IChecklistJSONRow][] = Object.entries(
      checklistJSON as IChecklistJSON
    );

    generator.table({
      startY: "RELATIVE",
      head: ["Practicum Checklist", "Status", "Comment"],
      columnStyles: {
        0: { valign: "middle", cellPadding: { right: 10 } },
        1: { cellWidth: 20, valign: "middle" },
        2: { cellWidth: 50, minCellHeight: 18, valign: "middle" },
      },
      body: Object.entries(checklist).map(([key, state], index) => {
        const content = checklistContents[index][1].content;

        if (typeof state === "string") {
          return [content, state];
        }
        return [content, state.score, state.comment];
      }),
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

export default PDFDataChecklist;
