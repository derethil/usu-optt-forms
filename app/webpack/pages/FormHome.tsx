import React from "react";

import { IFormInfo, ITimer, ScoresState } from "../types/types";

import { DataSchema } from "../types/dataTypes";

import { PDFData } from "../components/pdfReport/PDFData";
import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import { PageContent } from "../styledComponents/style";
import { IComments } from "../defaults/defaults";
import ConfirmModal from "../components/ConfirmModal";

type FormHomeProps = {
  formInfo: IFormInfo;
  updateFormInfo: (updatedFormInfo: Partial<IFormInfo>) => void;
  scores: ScoresState;
  data1: DataSchema;
  data2: DataSchema;
  comments: IComments;
  timer1: ITimer;
  timer2: ITimer;
  resetAll: () => void;
};

const FormHome = (props: FormHomeProps) => {
  return (
    <PageContent>
      <Card title="General Information">
        <FormInfo
          formInfo={props.formInfo}
          updateFormInfo={props.updateFormInfo}
        />
      </Card>

      <Card title="Scores">
        <ScoreTotals scores={props.scores} />
      </Card>

      <Card
        title="Form Actions"
        contentStyles={{ display: "flex", justifyContent: "space-between" }}
      >
        <PDFData
          scores={props.scores}
          data1={props.data1}
          data2={props.data2}
          timer1={props.timer1}
          timer2={props.timer2}
          formInfo={props.formInfo}
          comments={props.comments}
        />

        <ConfirmModal handleConfirm={props.resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
