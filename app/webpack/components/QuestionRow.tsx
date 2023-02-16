import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import Color from "../styledComponents/colors";
import { NewValues } from "../types/types";
import OptionRow from "./optionRow";
import TextInput from "./TextInput";

// Component that provides a different interface for scoring
// Provides a question with an OptionRow plus a comment box

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type SharedProps = {
  width?: number;
};

const OptionRowWrapperStyles = css`
  width: 65%;
  border-left: 2px solid ${Color.neutrals.grayDarker};

  padding-left: 1em;
`;

const ContentStyles = styled.p<SharedProps>`
  width: 35%;
  font-size: 1.2rem;

  margin: auto;
  padding-right: 1em;

  text-align: center;
`;

interface Props {
  content: string;
  score: string | number;
  scoreOptions: (number | string)[];
  updateScore: (score: number | string) => void;
  contentWidth?: number;
}

interface CommentProps extends Props {
  comment: string;
  updateComment: (updatedValues: NewValues) => void;
}

export default function QuestionRow(props: Props | CommentProps) {
  return (
    <Container>
      <ContentStyles>{props.content}</ContentStyles>
      <OptionRow
        currSelection={String(props.score)}
        options={props.scoreOptions.map((content) => {
          return { content: content.toString() };
        })}
        updateSelection={(newSelection) => props.updateScore(newSelection as string)}
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
        containerStyles={OptionRowWrapperStyles}
        comment={"comment" in props ? props.comment : undefined}
        updateComment={"updateComment" in props ? props.updateComment : undefined}
      />
      {/* <Wrapper>
        <TextInput />
      </Wrapper> */}
    </Container>
  );
}
