import React from "react";

import { ITimerState } from "../slices/timersSlice";

import { DataSchema } from "../types/dataTypes";

import { PDFData } from "../components/pdfReport/PDFData";
import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import { PageContent } from "../styledComponents/style";
import ConfirmModal from "../components/ConfirmModal";
import { css } from "styled-components";

type FormHomeProps = {
  data1: DataSchema;
  data2: DataSchema;
  timer1: ITimerState;
  timer2: ITimerState;
  timer3: ITimerState;
  resetAll: () => void;
};

const FormHome = (props: FormHomeProps) => {
  return (
    <PageContent>
      <Card title="General Information">
        <FormInfo />
      </Card>

      <Card title="Scores">
        <ScoreTotals />
      </Card>

      <Card
        title="Form Actions"
        contentStyles={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <PDFData
          data1={props.data1}
          data2={props.data2}
          timer1={props.timer1}
          timer2={props.timer2}
          timer3={props.timer3}
        />

        <ConfirmModal handleConfirm={props.resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
