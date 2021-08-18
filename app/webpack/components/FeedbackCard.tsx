import React from "react";

import Card from "./Card";
import TextInput from "./TextInput";

type Feedback = "strengths" | "suggestions" | "nextFocus";

type FeedbackCardProps = {
  title: string;
  feedbackType: Feedback;
  comment: string;
  updateComments: (updatedComments: { [key: string]: string }) => void;
};

const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <Card title={`${props.title}:`}>
      <TextInput
        value={props.comment}
        updateFormInfo={props.updateComments}
        field={props.feedbackType}
        noLabel
        placeholder={props.title}
        textArea
      />
    </Card>
  );
};

export default FeedbackCard;
