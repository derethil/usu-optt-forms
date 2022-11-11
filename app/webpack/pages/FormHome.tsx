import React, { useEffect } from "react";

import currentForm, { formOptions } from "../currentForm";

import ScoreTotals from "../components/rubric/ScoreTotals";
import FormInputs from "../components/FormInputs";
import Card from "../components/Card";
import PDFData from "../components/pdfReport/PDFData";

import ConfirmModal from "../components/ConfirmModal";
import { PageContent } from "../styledComponents/style";
import { css } from "styled-components";
import PDFDataChecklist from "../components/pdfReport/pdfDataChecklist";
import PracticumContent from "../components/practicumContent";
import TextBoxCard from "../components/TextBoxCard";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { selectFormInfo, setFormInfo } from "../slices/formInfoSlice";

import * as slices from "../slices/slices";

const FormHome = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const dispatch = useAppDispatch();

  const resetAll = (): void => {
    dispatch(slices.resetRubric());
    dispatch(slices.data1.actions.resetData());
    dispatch(slices.data2.actions.resetData());
    dispatch(slices.timer1.actions.reset());
    dispatch(slices.timer2.actions.reset());
    dispatch(slices.timer3.actions.reset());
    dispatch(slices.resetFormInfo());
    dispatch(slices.resetFeedback());
    dispatch(slices.resetNotebookChecks());
    dispatch(slices.resetChecklist());
    dispatch(slices.resetQuestions());
  };

  return (
    <PageContent>
      <Card title="General Information">
        <FormInputs />
      </Card>

      {currentForm === formOptions.teacherCandidate && (
        <TextBoxCard
          title="Observation Narrative"
          field="narrative"
          content={formInfo.narrative}
          updateContent={(newContent) => dispatch(setFormInfo(newContent))}
        />
      )}

      {currentForm !== formOptions.OPTTChecklist ? (
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
        {currentForm === formOptions.OPTTChecklist ? <PDFDataChecklist /> : <PDFData />}

        <ConfirmModal handleConfirm={resetAll} />
      </Card>
    </PageContent>
  );
};

export default FormHome;
