import React from "react";

import { defaultComments } from "../defaults";
import { Partial } from "../types";
import TextInput from "./TextInput";

type feedbackPageProps = {
  comments: typeof defaultComments,
  updateComments: (updatedComments: { [key: string]: string[] }) => void
}

export const FeedbackPage = (props: feedbackPageProps) => {
  const updateComment = (newValues: { [key: string]: string }, index: number, oldComments: string[]) => {
    oldComments[index] = Object.values(newValues)[0];
    props.updateComments({ [newValues.key]: oldComments });
  }

  return (
    <div className="feedback">
      <h1>Feedback</h1>
      <h2>Strengths: </h2>

      <TextInput
        value={props.comments.strengths[0]}
        updateFormInfo={(newValues: { [key: string]: string }) => updateComment(newValues, 0, props.comments.strengths)}
        field="strengths"
      />
    </div>
  )
}