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
import TextBoxCard from "../components/TextBoxCard";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { resetFormInfo, selectFormInfo, setFormInfo } from "../slices/formInfoSlice";
import { resetRubric } from "../slices/rubricSlice";
import { data1, data2 } from "../slices/dataSlice";
import { timer1, timer2, timer3 } from "../slices/timersSlice";
import { resetChecklist } from "../slices/checklistSlice";
import { resetFeedback } from "../slices/feedbackSlice";
import { resetNotebookChecks } from "../slices/notebookChecksSlice";
import { resetQuestions } from "../slices/questionsSlice";

const FormHome = () => {
  const formInfo = useAppSelector(selectFormInfo);
  const dispatch = useAppDispatch();

  const resetAll = (): void => {
    dispatch(resetRubric());
    dispatch(data1.actions.resetData());
    dispatch(data2.actions.resetData());
    dispatch(timer1.actions.reset());
    dispatch(timer2.actions.reset());
    dispatch(timer3.actions.reset());
    dispatch(resetFormInfo());
    dispatch(resetFeedback());
    dispatch(resetNotebookChecks());
    dispatch(resetChecklist());
    dispatch(resetQuestions());
  };

  return (
    <PageContent>
      <Card title="General Information">
        <FormInfo />
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
