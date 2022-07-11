import currentForm, { formOptions } from "../../currentForm";
import PDFGenerator from "./PDFGenerator";
import { IData } from "../../types/types";

import birthToFive from "./observations/birthToFive";
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

    case formOptions.severeReading:
    case formOptions.severeMathLifeSkills:
    case formOptions.severeSelfEvaluation:
      severePracticumReading(generator, data.data1, data.timerState1);

    case formOptions.birthToFive:
      birthToFive(generator, data.data1, data.timerState1);

    case formOptions.mmReading:
      severePracticumReading(generator, data.data1, data.timerState1, "Decoding Data");

    case formOptions.mmMath:
      mathGuidedPractice(
        generator,
        data.data1,
        data.timerState1,
        data.timerState2,
        data.timerState3
      );
  }
}
