import React from "react";

import { ITimerState } from "../slices/timersSlice";

import { IDataSlice } from "../slices/dataSlice";

import { PDFData } from "../components/pdfReport/PDFData";
import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import { PageContent } from "../styledComponents/style";
import ConfirmModal from "../components/ConfirmModal";
import { css } from "styled-components";
import { useAppSelector } from "../hooks/hooks";

type FormHomeProps = {
  data1: IDataSlice;
  data2: IDataSlice;
  timer1: ITimerState;
  timer2: ITimerState;
  timer3: ITimerState;
  resetAll: () => void;
};

const FormHome = (props: FormHomeProps) => {
  const data1 = useAppSelector(props.data1.selector);
  const data2 = useAppSelector(props.data2.selector);

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
          data1={data1}
          data2={data2}
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
