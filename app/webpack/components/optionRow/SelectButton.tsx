import React from "react";
import styled from "styled-components";

import { Button } from "../../styledComponents/style";

const ButtonContainer = styled.div<{ selected: boolean, scoreBox?: boolean, NABox?: boolean }>`
  min-width: ${props => props.scoreBox || props.NABox ? "200px" : "4em"};
  max-width: ${props => props.scoreBox || props.NABox ? "200px" : "8em"};
  height: ${props => props.scoreBox || props.NABox ? "200px" : "4em"};

  margin-right: 1em;
  padding: 5px;
  border: 2px solid #aba;
  border-radius: 15%;

  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  font-size: ${props => props.NABox ? 1.5 : 1}rem;
  font-weight: bold;

  text-align: center;

  :hover {
    cursor: pointer;
    transform: translateY(-0.5em);
    box-shadow: inset 0 -3.25em 0 0 "#00a6e9";
  }

  transition: all 0.12s ease-in-out;
  /* transform: translateY(${props => props.selected ? -0.5 : 0}em); */
`;

const ScoreValue = styled.div`
  font-size: 2rem;
  margin-top: auto;
`;


type SelectButtonProps = {
  content: string,
  selected: boolean,
  updateSelection: (newSelection: string) => void
  score?: string
};

const SelectButton = ({ content, selected, score, updateSelection }: SelectButtonProps) => {

  const selectBy = score ? score : content;

  return <ButtonContainer scoreBox={Boolean(score)} NABox={content === "N/A"} selected={selected}>
    <Button onClick={() => updateSelection(selectBy)}>
      <p style={{ marginTop: Boolean(score) ? "2.5em" : "normal" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </Button>
  </ButtonContainer>
}

export default SelectButton;