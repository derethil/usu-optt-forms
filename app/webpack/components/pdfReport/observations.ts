import currentForm, { formOptions } from "../../currentForm";
import PDFGenerator from "./PDFGenerator";
import { IData } from "../../types/types";

import bTo5Practicum from "./observations/bTo5Practicum";
import mathGuidedPractice from "./observations/math";
import severePracticumReading from "./observations/severePracticum";
import studentTeaching from "./observations/studentTeaching";

export default function generate(generator: PDFGenerator, data: IData) {
  switch (currentForm) {
    case formOptions.studentTeaching:
      studentTeaching(
        generator,
        data.data1,
        data.data2,
        data.timerState1,
        data.timerState2
      );

    case formOptions.severeReadingPracticum:
    case formOptions.severeMLSPracticum:
    case formOptions.selfEvaluation:
      severePracticumReading(generator, data.data1, data.timerState1);

    case formOptions.bTo5Practicum:
      bTo5Practicum(generator, data.data1, data.timerState1);

    case formOptions.reading:
      severePracticumReading(
        generator,
        data.data1,
        data.timerState1,
        "Decoding Data"
      );

    case formOptions.math:
      mathGuidedPractice(
        generator,
        data.data1,
        data.timerState1,
        data.timerState2,
        data.timerState3
      );
  }
}
