import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import { Button } from "../../styledComponents/style";
import Color from "../../styledComponents/colors";

const ScoreValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: auto;
`;

type SelectButtonProps = {
  content: string;
  selected: boolean;
  updateSelection: (newSelection: string) => void;
  score?: string;
  styles?: FlattenSimpleInterpolation;
};

const SelectButton = ({
  content,
  selected,
  score,
  updateSelection,
  styles,
}: SelectButtonProps) => {
  const selectBy = score ? score : content;

  const SelectButtonEl = styled(Button)`
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

    ${styles};
  `;

  return (
    <SelectButtonEl
      color={selected ? Color.blues.blueLight : Color.blues.blue}
      textColor={selected ? Color.blues.blue : Color.blues.blueLight}
      onClick={() => updateSelection(selectBy)}
    >
      <p style={{ marginTop: Boolean(score) ? "auto" : "normal" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </SelectButtonEl>
  );
};

export default SelectButton;
