import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";
import { CSSMixin } from "../../types/types";

const ScoreValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: auto;
`;

const SelectButtonEl = styled(Button)<CSSMixin>`
  ${(props) => props.mixin}
  padding: 1em;
  padding-left: 0.33em;

  height: auto;

  border: 3px solid ${Color.neutrals.grayDark};

  font-size: 1.2rem;

  flex-grow: 1;

  margin-right: 1em;

  :last-child {
    margin-right: 0;
  }

  text-align: left;
`;

const ListItem = styled.li`
  padding-bottom: 0.33em;

  :last-child {
    padding-bottom: 0em;
  }
`;

const ContinuedEl = styled.p`
  padding: 0em 0em 0.33em 0em;
  margin: 0em;
  font-style: italic;
`;

type SelectButtonProps = {
  content: string[];
  selected: boolean;
  updateSelection: (newSelection: string) => void;
  score?: string;
  styles?: FlattenSimpleInterpolation;
  continued?: boolean;
};

const SelectButton = (props: SelectButtonProps) => {
  const { content, selected, score, updateSelection, styles } = props;

  const selectBy = score ? score : content;

  return (
    <SelectButtonEl
      color={selected ? Color.blues.blueLight : Color.blues.blue}
      textColor={selected ? Color.blues.blue : Color.blues.blueLight}
      onClick={() => updateSelection(selectBy as string)}
      mixin={styles}
    >
      <ul>
        {props.continued && <ContinuedEl>...and</ContinuedEl>}
        {content.map((el, idx) => (
          <ListItem key={idx}>{el}</ListItem>
        ))}
      </ul>
      {score && <ScoreValue>{score}</ScoreValue>}
    </SelectButtonEl>
  );
};

export default SelectButton;
