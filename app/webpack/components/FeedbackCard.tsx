import React from "react";
import { IComments } from "../defaults/defaults";

import Card from "./Card";
import TextInput from "./TextInput";

type Feedback = keyof IComments;

type FeedbackCardProps = {
  title: string;
  feedbackType: Feedback;
  feedback: string;
  updateFeedback: (newFeedback: { [key: string]: string }) => void;
};

const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <Card title={`${props.title}:`}>
      <TextInput
        value={props.feedback}
        updateForm={props.updateFeedback}
        field={props.feedbackType}
        noLabel
        placeholder={props.title}
        textArea
      />
    </Card>
  );
};

export default FeedbackCard;
