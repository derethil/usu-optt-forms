import React from "react";
import styled, { css } from "styled-components";

import Color from "../styledComponents/colors";
import { NewValues } from "../types/types";

import TextInput from "./TextInput";

// Used by studentTeachingRubric to provide a different interface for grading.
// Questions require a content and a maxScore and allow text input of anything up to max

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin-bottom: 0;
  }

  margin-bottom: 1em;
`;

const ContentStyles = styled.p`
  width: 200%;
  font-size: 1.2rem;

  margin: auto;
  padding-right: 1em;

  text-align: center;
  border-right: 2px solid ${Color.neutrals.grayDarker};
`;

const MaxScoreStyles = styled.div`
  width: 20%;
  text-align: center;
  font-size: 1.5rem;
`;

const TextAreaContainerStyles = css`
  padding-left: 1em;
  margin-bottom: -5px;
  width: 65%;
  text-align: center;
`;

const TextAreaStyles = css`
  height: 100%;
  border-radius: 0.75em;
  resize: none;
  padding: 8px;

  &:focus {
    font-weight: inherit;
  }
`;

interface Props {
  content: string;
  value: string;
  maxScore: number | string;
  updateValue: (updatedValues: NewValues) => void;
}

export default function QuestionText(props: Props) {
  return (
    <Container>
      <ContentStyles>{props.content}</ContentStyles>
      <TextInput
        value={props.value}
        updateForm={props.updateValue}
        placeholder="Score"
        field=""
        noLabel
        inputStyles={TextAreaStyles}
        containerStyles={TextAreaContainerStyles}
      />
      <MaxScoreStyles>{`/ ${props.maxScore}`}</MaxScoreStyles>
    </Container>
  );
}
