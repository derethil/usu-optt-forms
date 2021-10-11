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
  padding: 1em;

  height: auto;
  min-height: 3em;
  min-width: 3em;

  border: 3px solid ${Color.neutrals.grayDark};

  font-size: 1.2rem;

  flex-grow: 1 1 auto;

  margin-right: 1em;

  :last-child {
    margin-right: 0;
  }

  ${(props) => props.mixin}
`;

type SelectButtonProps = {
  content: string;
  selected: boolean;
  updateSelection: (newSelection: string) => void;
  score?: string;
  styles?: FlattenSimpleInterpolation;
};

const SelectButton = (props: SelectButtonProps) => {
  const { content, selected, score, updateSelection, styles } = props;

  const selectBy = score ? score : content;

  return (
    <SelectButtonEl
      color={selected ? Color.blues.blueLight : Color.blues.blue}
      textColor={selected ? Color.blues.blue : Color.blues.blueLight}
      onClick={() => updateSelection(selectBy)}
      mixin={styles}
    >
      <p style={{ marginTop: Boolean(score) ? "auto" : "normal" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </SelectButtonEl>
  );
};

export default SelectButton;
