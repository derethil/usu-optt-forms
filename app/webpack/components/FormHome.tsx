import React from "react";

import { IFormInfo, ITimer, ScoresState } from "../types";

import { defaultData, defaultFormInfo } from "../defaults";

import { PDFGenerator } from "./PDFGenerator";
import ScoreTotals from "./ScoreTotals";
import FormInfo from "./FormInfo";
import Card from "./Card";

type FormHomeProps = {
  formInfo: IFormInfo,
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void,
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  timer1: ITimer,
  timer2: ITimer,
  resetAll: () => void

}

const FormHome = (props: FormHomeProps) => {
  return (
    <div>
      <Card title="Form Information">
        <FormInfo formInfo={props.formInfo} updateFormInfo={props.updateFormInfo} />
      </Card>

      <ScoreTotals scores={props.scores} />

      <PDFGenerator
        scores={props.scores}
        data1={props.data1}
        data2={props.data2}
        timer1={props.timer1}
        timer2={props.timer2}
        formInfo={props.formInfo}
      />

      <button onClick={() => props.resetAll()}>
        RESET ALL
      </button>

    </div>
  )
}

export default FormHome;