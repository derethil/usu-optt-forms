import React from "react";

import { IComments } from "../defaults/defaults";
import { PageContent } from "../styledComponents/style";
import FeedbackCard from "../components/FeedbackCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectFeedback, setFeedback } from "../slices/feedbackSlice";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector(selectFeedback);

  return (
    <PageContent className="feedback">
      <FeedbackCard
        title="Strengths"
        feedbackType="strengths"
        feedback={feedback.strengths}
        updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
      />

      <FeedbackCard
        title="Suggestions"
        feedbackType="suggestions"
        feedback={feedback.suggestions}
        updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
      />

      <FeedbackCard
        title="Next Focus"
        feedbackType="nextFocus"
        feedback={feedback.nextFocus}
        updateFeedback={(newFeedback) => dispatch(setFeedback(newFeedback))}
      />
    </PageContent>
  );
};

export default FeedbackPage;
