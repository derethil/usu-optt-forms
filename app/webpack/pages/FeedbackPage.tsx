import React from "react";

import { IComments } from "../defaults/defaults";
import { PageContent } from "../styledComponents/style";
import FeedbackCard from "../components/FeedbackCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectFeedback, setFeedback } from "../slices/feedbackSlice";
import currentForm, { formOptions } from "../currentForm";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(selectFeedback);

  const isSTR = currentForm === formOptions.STRubric;

  return (
    <PageContent className="feedback">
      <FeedbackCard
        title={isSTR ? "Behavior Assignment Comments" : "Strengths"}
        feedbackType="strengths"
        feedback={feedback.strengths}
        updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
      />

      <FeedbackCard
        title={isSTR ? "Collaboration Assignment Comments" : "Suggestions"}
        feedbackType="suggestions"
        feedback={feedback.suggestions}
        updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
      />

      {currentForm !== formOptions.selfEvaluation ? (
        <FeedbackCard
          title={isSTR ? "IEP/IFSP Assignment Comments" : "Next Focus"}
          feedbackType="nextFocus"
          feedback={feedback.nextFocus}
          updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
        />
      ) : (
        <>
          <FeedbackCard
            title="Goal 1"
            feedbackType="goal1"
            feedback={feedback.goal1}
            updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
          />

          <FeedbackCard
            title="Goal 2"
            feedbackType="goal2"
            feedback={feedback.goal2}
            updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
          />
        </>
      )}
    </PageContent>
  );
};

export default FeedbackPage;
