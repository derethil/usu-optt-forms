import currentForm, { formOptions } from "../../currentForm";
import { IData } from "../../types/types";
import bTo5PracticumSection from "./bTo5Practicum";
import mathGuidedPractice from "./math";
import PDFGenerator from "./PDFGenerator";
import severePracticumReadingSection from "./severePracticum";
import studentTeachingSection from "./studentTeaching";

export function generateObservations(generator: PDFGenerator, data: IData) {
  switch (currentForm) {
    case formOptions.studentTeaching:
      studentTeachingSection(
        generator,
        data.data1,
        data.data2,
        data.timerState1,
        data.timerState2
      );
    case formOptions.severeReadingPracticum:
    case formOptions.severeMLSPracticum:
    case formOptions.selfEvaluation:
      severePracticumReadingSection(generator, data.data1, data.timerState1);
    case formOptions.bTo5Practicum:
      bTo5PracticumSection(generator, data.data1, data.timerState1);
    case formOptions.reading:
      severePracticumReadingSection(
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
