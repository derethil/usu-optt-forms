import React from "react";

import { IFormInfo, ITimer, ScoresState } from "../types";

import { defaultData } from "../defaults";

import { PDFGenerator } from "../components/PDFGenerator";
import ScoreTotals from "../components/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import { Button, PageContent } from "../styledComponents/style";
import { Color } from "../styledComponents/colors";
import { IComments } from "../defaults";

type FormHomeProps = {
  formInfo: IFormInfo,
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void,
  scores: ScoresState,
  data1: typeof defaultData,
  data2: typeof defaultData,
  comments: IComments,
  timer1: ITimer,
  timer2: ITimer,
  resetAll: () => void

}

const FormHome = (props: FormHomeProps) => {
  return (
    <PageContent>
      <Card title="Form Information">
        <FormInfo formInfo={props.formInfo} updateFormInfo={props.updateFormInfo} />
      </Card>

      <Card title="Scores">
        <ScoreTotals scores={props.scores} />
      </Card>

      <Card title="Form Actions">
        <PDFGenerator
          scores={props.scores}
          data1={props.data1}
          data2={props.data2}
          timer1={props.timer1}
          timer2={props.timer2}
          formInfo={props.formInfo}
          comments={props.comments}
        />

        <Button
          onClick={() => props.resetAll()}
          color={Color.contextual.danger}
          textColor={Color.lights.light}
          style={{ fontWeight: 600, borderRadius: "0.25em" }}
        >
          Reset Form Information
        </Button>
      </Card>




    </PageContent>
  )
}

export default FormHome;