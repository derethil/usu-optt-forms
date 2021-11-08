import React from "react";

import { ITimer } from "../types/types";

import { DataSchema, INotebookCheck } from "../types/dataTypes";

import { PDFData } from "../components/pdfReport/PDFData";
import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import { PageContent } from "../styledComponents/style";
import { IComments } from "../defaults/defaults";
import ConfirmModal from "../components/ConfirmModal";
import { css } from "styled-components";

type FormHomeProps = {
  checks: INotebookCheck;
  data1: DataSchema;
  data2: DataSchema;
  comments: IComments;
  timer1: ITimer;
  timer2: ITimer;
  timer3: ITimer;
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
          checks={props.checks}
          data1={props.data1}
          data2={props.data2}
          timer1={props.timer1}
          timer2={props.timer2}
          timer3={props.timer3}
          comments={props.comments}
        />

        <ConfirmModal handleConfirm={props.resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
