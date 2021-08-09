import React from "react";

import { IComments } from "../defaults";
import TextInput from "../components/TextInput";
import { Button, PageContent } from "../styledComponents/style";
import Card from "../components/Card";
import { Color } from "../styledComponents/colors";
import FeedbackCard from "../components/FeedbackCard";

type feedbackPageProps = {
  comments: IComments;
  updateComments: (updatedComments: { [key: string]: string[] }) => void;
};

const FeedbackPage = (props: feedbackPageProps) => {
  return (
    <PageContent className="feedback">
      <FeedbackCard
        title="Strengths"
        buttonText="Add New Strength"
        feedbackType="strengths"
        comments={props.comments}
        updateComments={props.updateComments}
      />

      <FeedbackCard
        title="Suggestions"
        buttonText="Add New Suggestion"
        feedbackType="suggestions"
        comments={props.comments}
        updateComments={props.updateComments}
      />

      <FeedbackCard
        title="Next Focus"
        buttonText="Add New Next Focus"
        feedbackType="nextFocus"
        comments={props.comments}
        updateComments={props.updateComments}
      />
    </PageContent>
  );
};

export default FeedbackPage;
