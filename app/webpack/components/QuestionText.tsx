import React from "react";
import styled, { css } from "styled-components";

import Color from "../styledComponents/colors";
import { NewValues } from "../types/types";

import TextInput from "./TextInput";

// Text based question interface
// Provides a question and then a comment box, no score selection

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentStyles = styled.p`
  width: 35%;
  font-size: 1.2rem;

  margin: auto;
  padding-right: 1em;

  text-align: center;
`;

const TextAreaContainerStyles = css`
  border-left: 2px solid ${Color.neutrals.grayDarker};
  padding-left: 1em;
  margin-bottom: -5px;
  width: 65%;
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
  updateValue: (updatedValues: NewValues) => void;
}

export default function QuestionText(props: Props) {
  return (
    <Container>
      <ContentStyles>{props.content}</ContentStyles>
      <TextInput
        value={props.value}
        updateForm={props.updateValue}
        placeholder="Comment"
        field=""
        noLabel
        textArea
        inputStyles={TextAreaStyles}
        containerStyles={TextAreaContainerStyles}
      />
    </Container>
  );
}
