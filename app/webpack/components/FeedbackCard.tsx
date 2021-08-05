import React from "react";

import Card from "./Card";
import TextInput from "./TextInput";
import { Button } from "../styledComponents/style";
import { IComments } from "../defaults";
import { Color } from "../styledComponents/colors";

type Feedback = "strengths" | "suggestions" | "nextFocus";

type FeedbackCardProps = {
  title: string,
  buttonText: string,
  feedbackType: Feedback,
  comments: IComments,
  updateComments: (updatedComments: { [key: string]: string[] }) => void
}

const FeedbackCard = (props: FeedbackCardProps) => {
  const addNewComment = (feedbackArea: Feedback) => {
    props.updateComments({ [feedbackArea]: [...props.comments[feedbackArea], ""] });
  }

  const updateComment = (
    newValues: { [key: string]: string },
    index: number,
    oldComments: string[]
  ) => {
    oldComments[index] = Object.values(newValues)[0];
    props.updateComments({ [newValues.key]: oldComments });
  }

  const generateInputs = (field: Feedback) => {
    const feedback = props.comments[field]
    return feedback.map((comment, index) => {
      return <TextInput
        key={index}
        value={feedback[index]}
        updateFormInfo={(newValues: { [key: string]: string }) => {
          updateComment(newValues, index, feedback)
        }}
        field={field}
        noLabel
        placeholder="Comment"
      />
    });
  }

  return (
    <Card title={`${props.title}:`}>
      {generateInputs(props.feedbackType)}
      <Button
        onClick={() => addNewComment(props.feedbackType)}
        color={Color.blues.blue}
        textColor={Color.blues.blueLight}
        style={{ borderRadius: "0.25em" }}
      >
        {props.buttonText}
      </Button>
    </Card>
  )
}

export default FeedbackCard;