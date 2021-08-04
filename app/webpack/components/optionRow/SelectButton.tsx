import React from "react";
import styled from "styled-components";

import { Button } from "../../styledComponents/style";
import { Color } from "../../styledComponents/colors";

const SelectButtonEl = styled(Button)`
  padding: 1em;

  min-height: 3em;
  min-width: 3em;

  border: 3px solid ${Color.neutrals.grayDark};
  border-radius: 0.75em;

  font-size: 1.2rem;

  :hover {
    background-color: ${Color.blues.blueLight};
    color: ${Color.blues.blue};
  }

  :active {
    border: 3px solid ${Color.blues.primary};
  }

`;

const ScoreValue = styled.div`
  /* font-size: 2rem;
  margin-top: auto; */
`;


type SelectButtonProps = {
  content: string,
  selected: boolean,
  updateSelection: (newSelection: string) => void
  score?: string
};

const SelectButton = ({ content, selected, score, updateSelection }: SelectButtonProps) => {

  const selectBy = score ? score : content;

  return (
    <SelectButtonEl
      color={selected ? Color.blues.blueLight : Color.blues.blue}
      textColor={selected ? Color.blues.blue : Color.blues.blueLight}
      onClick={() => updateSelection(selectBy)}

    >
      <p style={{ marginTop: Boolean(score) ? "2.5em" : "normal" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </SelectButtonEl >
  )
}

export default SelectButton;