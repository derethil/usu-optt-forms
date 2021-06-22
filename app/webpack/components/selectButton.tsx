import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const ButtonContainer = styled.div<{ selected: boolean, scoreBox?: boolean }>`


  position: relative;
  min-width: ${props => props.scoreBox ? 12.5 : 4}em;
  max-width: ${props => props.scoreBox ? 12.5 : 8}em;
  height: ${props => props.scoreBox ? 12.5 : 4}em;

  margin-right: 1em;
  padding: 0.5em;
  border: 2px solid gray;
  border-radius: 12%;

  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};

  font-size: 1rem;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }

  transition: all 0.075s;
`;

const BoxButton = styled.div<{ selected: boolean, scoreBox?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const TooltipIcon = styled.i`
  position: absolute;
  top: 1em;
  left: 1em;
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
  score?: string,
  tooltip?: string
};

export const SelectButton = ({ id, content, selected, score, updateSelection, tooltip }: SelectButtonProps) => {

  const selectBy = score ? score : content;

  return <ButtonContainer scoreBox={Boolean(score)} selected={selected}>
    <BoxButton
      selected={selected}
      onClick={() => updateSelection(selectBy)}
      data-tip={""}
      scoreBox={Boolean(score)}
    >
      {tooltip !== "" && <TooltipIcon className="far fa-question-circle"></TooltipIcon>}
      <p style={{ marginTop: "2.5em" }}>{content}</p>
      {score && <ScoreValue>{score}</ScoreValue>}
    </BoxButton>
    <ReactTooltip
      place="top"
      type="dark"
      effect="solid"
      multiline={true}
    />
  </ButtonContainer>

}