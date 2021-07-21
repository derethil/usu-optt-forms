import React, { Props } from "react";

import { defaultComments } from "../defaults";
import TextInput from "./TextInput";

type feedbackPageProps = {
  comments: typeof defaultComments,
  updateComments: (updatedComments: { [key: string]: string[] }) => void
}


export const FeedbackPage = (props: feedbackPageProps) => {

  type Feedback = keyof typeof props.comments;

  const updateComment = (
    newValues: { [key: string]: string },
    index: number,
    oldComments: string[]) => {

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
      />
    });
  }

  const addNewComment = (feedbackArea: Feedback) => {
    const feedbackArr = props.comments[feedbackArea];
    feedbackArr.push("");
    props.updateComments({ feedbackArea: feedbackArr });
  }



  return (
    <div className="feedback">
      <h1>Feedback</h1>
      <h2>Strengths: </h2>

      <button onClick={() => addNewComment("strengths")}>
        Add New Strength
      </button>

      {generateInputs("strengths")}

      <h2>Suggestions: </h2>

      <button onClick={() => addNewComment("suggestions")}>
        Add New Suggestion
      </button>

      {generateInputs("suggestions")}

      <h2>Next Focus: </h2>

      <button onClick={() => addNewComment("nextFocus")}>
        Add New Focus
      </button>

      {generateInputs("nextFocus")}
    </div>
  )
}