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
        <PDFData />

        <ConfirmModal handleConfirm={props.resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
