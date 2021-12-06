import React from "react";
import styled, { css } from "styled-components";

import Color from "../styledComponents/colors";

import TextInput from "./TextInput";

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
  flex: 0 0 62.9%;
  border-left: 2px solid ${Color.neutrals.grayDarker};
  padding-left: 1em;
  margin-bottom: 0px;
`;

const TextArea = styled(TextInput)`
  /* width: 65%; */
`;

interface Props {
  content: string;
  value: string;
  updateValue: (updatedValues: { [key: string]: string }) => void;
}

export default function QuestionText(props: Props) {
  return (
    <Container>
      <ContentStyles>{props.content}</ContentStyles>
      <TextArea
        value={props.value}
        updateForm={props.updateValue}
        placeholder="Comment"
        field=""
        noLabel
        textArea
        inputStyles={css`
          height: 100%;
          border-radius: 0.75em;
          resize: none;
          padding: 8px;

          &:focus {
            font-weight: inherit;
          }
        `}
        containerStyles={TextAreaContainerStyles}
      />
    </Container>
  );
}
