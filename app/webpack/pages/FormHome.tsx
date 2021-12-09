import React from "react";

import currentForm, { formOptions } from "../currentForm";

import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInfo from "../components/FormInfo";
import Card from "../components/Card";
import PDFData from "../components/pdfReport/PDFData";

import ConfirmModal from "../components/ConfirmModal";
import { PageContent } from "../styledComponents/style";
import { css } from "styled-components";
import PDFDataChecklist from "../components/pdfReport/pdfDataChecklist";
import PracticumContent from "../components/practicumContent";

type FormHomeProps = {
  resetAll: () => void;
};

const FormHome = (props: FormHomeProps) => {
  return (
    <PageContent>
      <Card title="General Information">
        <FormInfo />
      </Card>

      {currentForm !== formOptions.practicumChecklist ? (
        <Card title="Scores">
          <ScoreTotals />
        </Card>
      ) : (
        <Card title="Practicum Content Areas">
          <PracticumContent />
        </Card>
      )}

      <Card
        title="Form Actions"
        contentStyles={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        {currentForm === formOptions.practicumChecklist ? (
          <PDFDataChecklist />
        ) : (
          <PDFData />
        )}

        <ConfirmModal handleConfirm={props.resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
