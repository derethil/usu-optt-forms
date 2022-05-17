import React from "react";

import { IComments } from "../defaults/defaults";
import { PageContent } from "../styledComponents/style";
import TextBoxCard from "../components/TextBoxCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectFeedback, setFeedback } from "../slices/feedbackSlice";
import currentForm, { formOptions } from "../currentForm";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(selectFeedback);

  const isSTR = currentForm === formOptions.STRubric;

  return (
    <PageContent className="feedback">
      <TextBoxCard
        title={isSTR ? "Behavior Assignment Comments" : "Strengths"}
        field="strengths"
        content={feedback.strengths}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      <TextBoxCard
        title={isSTR ? "Collaboration Assignment Comments" : "Suggestions"}
        field="suggestions"
        content={feedback.suggestions}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      {currentForm !== formOptions.selfEvaluation ? (
        <TextBoxCard
          title={isSTR ? "IEP/IFSP Assignment Comments" : "Next Focus"}
          field="nextFocus"
          content={feedback.nextFocus}
          updateContent={(newContent) => dispatch(setFeedback(newContent))}
        />
      ) : (
        <>
          <TextBoxCard
            title="Goal 1"
            field="goal1"
            content={feedback.goal1}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />

          <TextBoxCard
            title="Goal 2"
            field="goal2"
            content={feedback.goal2}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />
        </>
      )}
    </PageContent>
  );
};

export default FeedbackPage;
