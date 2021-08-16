import React from "react";
import styled from "styled-components";

import Card from "./Card";
import TextInput from "./TextInput";
import { Button } from "../styledComponents/style";
import { IComments } from "../defaults";
import Color from "../styledComponents/colors";

type Feedback = "strengths" | "suggestions" | "nextFocus";

type FeedbackCardProps = {
  title: string;
  buttonText: string;
  feedbackType: Feedback;
  comments: IComments;
  updateComments: (updatedComments: { [key: string]: string[] }) => void;
};

const FeedbackInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.i`
  padding-left: 1em;
  transition: 0.2s all ease;
  cursor: pointer;
  color: ${Color.contextual.danger};
  font-size: 1.8rem;

  :hover {
    transform: translateY(-2px);
    font-size: 2rem;
  }
`;

const FeedbackCard = (props: FeedbackCardProps) => {
  const addNewComment = (feedbackArea: Feedback) => {
    props.updateComments({
      [feedbackArea]: [...props.comments[feedbackArea], ""],
    });
  };

  const updateComment = (
    newValues: { [key: string]: string },
    index: number,
    oldComments: string[]
  ) => {
    oldComments[index] = Object.values(newValues)[0];
    props.updateComments({ [newValues.key]: oldComments });
  };

  const deleteComment = (field: Feedback, index: number) => {
    const feedbackArray = props.comments[field];
    const newFeedbackArray = feedbackArray.filter((comment, currIndex) => {
      return index !== currIndex;
    });

    props.updateComments({
      [field]: newFeedbackArray,
    });
  };

  const generateInputs = (field: Feedback) => {
    const feedback = props.comments[field];
    return feedback.map((comment, index) => {
      return (
        <FeedbackInputWrapper>
          <TextInput
            key={index}
            value={comment}
            updateFormInfo={(newValues: { [key: string]: string }) => {
              updateComment(newValues, index, feedback);
            }}
            field={field}
            noLabel
            placeholder="Comment"
          />
          {index > 0 && (
            <DeleteIcon
              className="fas fa-window-close"
              onClick={() => deleteComment(field, index)}
            ></DeleteIcon>
          )}
        </FeedbackInputWrapper>
      );
    });
  };

  return (
    <Card title={`${props.title}:`}>
      {generateInputs(props.feedbackType)}
      <Button
        onClick={() => addNewComment(props.feedbackType)}
        color={Color.blues.blue}
        textColor={Color.blues.blueLight}
        style={{ width: "50%", margin: "auto" }}
      >
        {props.buttonText}
      </Button>
    </Card>
  );
};

export default FeedbackCard;
