import React from "react";
import styled, { css } from "styled-components";
import Color from "../styledComponents/colors";
import OptionRow from "./optionRow";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionRowWrapperStyles = css`
  width: 65%;
  border-left: 2px solid ${Color.neutrals.grayDarker};

  padding-left: 1em;
`;

const ContentStyles = styled.p`
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
}

interface CommentProps extends Props {
  comment: string;
  updateComment: (updatedValues: { [key: string]: string }) => void;
}

export default function QuestionRow(props: Props | CommentProps) {
  return (
    <Container>
      <ContentStyles>{props.content}</ContentStyles>
      <OptionRow
        currSelection={String(props.score)}
        contentOptions={props.scoreOptions.map((content) => content.toString())}
        updateSelection={(newSelection) => props.updateScore(newSelection)}
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
        containerStyles={OptionRowWrapperStyles}
        comment={"comment" in props ? props.comment : undefined}
        updateComment={
          "updateComment" in props ? props.updateComment : undefined
        }
      />
    </Container>
  );
}
