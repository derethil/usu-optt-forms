import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const ButtonContainer = styled.div<{ selected: boolean, scoreBox?: boolean }>`
  min-width: ${props => props.scoreBox ? 12.5 : 4}em;
  max-width: ${props => props.scoreBox ? 12.5 : 8}em;
  height: ${props => props.scoreBox ? 12.5 : 4}em;

  margin-right: 1em;
  padding: 0.5em;
  border: 2px solid #aba;
  border-radius: 15%;

  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};
  //box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  font-size: 1rem;
  font-weight: bold;

  :hover {
    cursor: pointer;
    transform: translateY(-0.5em);
    box-shadow: inset 0 -3.25em 0 0 "#00a6e9";
  }

  transition: all 0.12s ease-in-out;
  /* transform: translateY(${props => props.selected ? -0.5 : 0}em); */


`;

const BoxButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const ScoreValue = styled.div<{}>`
  font-size: 2rem;
  margin-top: auto;
`;

type SelectButtonProps = {
  id: number,
  content: string,
  selected: boolean,
  updateSelection: (newSelection: string) => void
  score?: string
};

export const SelectButton = ({ id, content, selected, score, updateSelection }: SelectButtonProps) => {

  const selectBy = score ? score : content;

  return <ButtonContainer scoreBox={Boolean(score)} selected={selected}>
    <BoxButton onClick={() => updateSelection(selectBy)}>
      <p style={{ marginTop: Boolean(score) ? "2.5em" : "normal" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </BoxButton>
  </ButtonContainer>

}