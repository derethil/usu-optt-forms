import React from "react";

import { IComments } from "../defaults/defaults";
import { PageContent } from "../styledComponents/style";
import TextBoxCard from "../components/TextBoxCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectFeedback, setFeedback } from "../slices/feedbackSlice";
import currentForm, { formOptions } from "../currentForm";
import { feedbackLabel } from "../utils/utils";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(selectFeedback);

  const generateExtraFeedbackInputs = (): JSX.Element[] => {
    switch (currentForm) {
      case formOptions.birthToFiveCooperatingTeacherChecklist:
      case formOptions.EICooperatingProviderChecklist:
        return [] as JSX.Element[];
      case formOptions.severeSelfEvaluation:
        return [
          <TextBoxCard
            key={4}
            title={feedbackLabel(currentForm, 4)}
            field="area4"
            content={feedback.area4}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />,
          <TextBoxCard
            key={5}
            title={feedbackLabel(currentForm, 5)}
            field="area5"
            content={feedback.area5}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />,
        ];
      default:
        return [
          <TextBoxCard
            key={3}
            title={feedbackLabel(currentForm, 3)}
            field="area3"
            content={feedback.area3}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />,
        ];
    }
  };

  return (
    <PageContent className="feedback">
      <TextBoxCard
        title={feedbackLabel(currentForm, 1)}
        field="area1"
        content={feedback.area1}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      <TextBoxCard
        title={feedbackLabel(currentForm, 2)}
        field="area2"
        content={feedback.area2}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      {generateExtraFeedbackInputs()}
    </PageContent>
  );
};

export default FeedbackPage;
