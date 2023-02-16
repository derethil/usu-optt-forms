import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { useAppDispatch } from "../hooks/hooks";
import Color from "../styledComponents/colors";
import { NewValues } from "../types/types";
import Checkbox from "./Checkbox";
import CheckboxLabel from "./CheckboxLabel";
import OptionRow from "./optionRow";
import TextInput from "./TextInput";

// Component that provides a different interface for scoring
// Provides a question with an OptionRow plus a comment box

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

type SharedProps = {
  width?: number;
  last?: boolean;
  isNA?: boolean;
};

const Wrapper = styled.div<SharedProps>`
  width: 25%;

  padding-left: 1em;
  border-bottom: 2px solid
    ${({ last }) => (last ? "transparent" : Color.neutrals.grayDarker)};

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentStyles = styled.p<SharedProps>`
  width: 75%;
  font-size: 1.2rem;
  box-sizing: border-box;

  margin: 0;
  padding: 0.5em 1em 0.5em 0;

  text-align: center;

  display: flex;
  justify-content: center;
  flex-direction: column;

  border-right: 2px solid ${Color.neutrals.grayDarker};
  border-bottom: 2px solid
    ${({ last }) => (last ? "transparent" : Color.neutrals.grayDarker)};

  color: ${({ isNA }) => (isNA ? Color.neutrals.grayDark : "inherit")};
`;

interface Props {
  content: string;
  score: string;
  maxScore: number;
  isNA?: boolean;
  updateCheck: (score: string, isNA?: boolean) => void;
  last?: boolean;
}

export default function CheckRow(props: Props) {
  const handleUpdateScore = (newValue: { [key: string]: string }) => {
    const score = Number(newValue.score);
    if (score <= Number(props.maxScore)) {
      props.updateCheck(newValue.score);
    }
  };

  return (
    <Container>
      <ContentStyles last={props.last} isNA={props.isNA}>
        <span>{props.content}</span>
      </ContentStyles>
      {/* <OptionRow
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
      /> */}
      <Wrapper last={props.last} isNA={props.isNA}>
        <TextInput
          value={String(props.score)}
          field="score"
          updateForm={handleUpdateScore}
          title={`Score (${props.maxScore} points)`}
          disabled={props.isNA}
          containerStyles={css`
            margin: 1em 0;
          `}
        />
        <CheckboxLabel
          label="N/A"
          checked={props.isNA}
          onChange={() => props.updateCheck(props.score, !props.isNA)}
        />
      </Wrapper>
    </Container>
  );
}
