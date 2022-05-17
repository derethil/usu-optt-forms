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
        key="strengths"
        content={feedback.strengths}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      <TextBoxCard
        title={isSTR ? "Collaboration Assignment Comments" : "Suggestions"}
        key="suggestions"
        content={feedback.suggestions}
        updateContent={(newContent) => dispatch(setFeedback(newContent))}
      />

      {currentForm !== formOptions.selfEvaluation ? (
        <TextBoxCard
          title={isSTR ? "IEP/IFSP Assignment Comments" : "Next Focus"}
          key="nextFocus"
          content={feedback.nextFocus}
          updateContent={(newContent) => dispatch(setFeedback(newContent))}
        />
      ) : (
        <>
          <TextBoxCard
            title="Goal 1"
            key="goal1"
            content={feedback.goal1}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />

          <TextBoxCard
            title="Goal 2"
            key="goal2"
            content={feedback.goal2}
            updateContent={(newContent) => dispatch(setFeedback(newContent))}
          />
        </>
      )}
    </PageContent>
  );
};

export default FeedbackPage;
