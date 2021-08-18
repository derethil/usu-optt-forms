import React from "react";

import { IComments } from "../defaults";
import TextInput from "../components/TextInput";
import { Button, PageContent } from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";
import FeedbackCard from "../components/FeedbackCard";

type feedbackPageProps = {
  comments: IComments;
  updateComments: (updatedComments: { [key: string]: string }) => void;
};

const FeedbackPage = (props: feedbackPageProps) => {
  return (
    <PageContent className="feedback">
      <FeedbackCard
        title="Strengths"
        feedbackType="strengths"
        comment={props.comments.strengths}
        updateComments={props.updateComments}
      />

      <FeedbackCard
        title="Suggestions"
        feedbackType="suggestions"
        comment={props.comments.suggestions}
        updateComments={props.updateComments}
      />

      <FeedbackCard
        title="Next Focus"
        feedbackType="nextFocus"
        comment={props.comments.nextFocus}
        updateComments={props.updateComments}
      />
    </PageContent>
  );
};

export default FeedbackPage;
