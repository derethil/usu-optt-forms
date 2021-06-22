import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import { Partial, FormInfo } from "../types";

const BoxButton = styled.div<{ selected: boolean, num: number, minHeight?: number, minWidth?: number }>`
  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};

  min-width: ${props => props.minWidth ? props.minWidth : 4}em;
  max-width: ${props => props.minWidth ? props.minWidth : 8}em;;
  min-height: ${props => props.minHeight ? props.minHeight : 4}em;
  padding: 0.5em;
  margin-right: 1em;
  border: 2px solid gray;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: bold;

  border-radius: 12%;

  :hover {
    cursor: pointer;
  }

  transition: all 0.075s;
`;

const ScoreValue = styled.div<{}>`
  font-size: 2rem;
`;

const TooltipIcon = styled.i`
  position: absolute;
  top: 1em;
  left: 1em;
`;

type SelectButtonProps = {
  id: number,
  content: string,
  selected: boolean,
  updateSelection: (newSelection: string) => void
  score?: string,
  minHeight?: number,
  minWidth?: number
  tooltip?: string
};

export const SelectButton = ({ id, content, selected, score, minHeight, minWidth, updateSelection, tooltip }: SelectButtonProps) => {

  const selectBy = score ? score : content;

  return <div className="boxButton">
    <BoxButton
      num={id}
      selected={selected}
      onClick={() => updateSelection(selectBy)}
      minHeight={minHeight}
      minWidth={minWidth}
      data-tip={tooltip}
    >
      {tooltip !== "" && <TooltipIcon className="far fa-question-circle"></TooltipIcon>}
      {content}
      <br />
      {score && <ScoreValue>{score}</ScoreValue>}
    </BoxButton>
    <ReactTooltip
      place="top"
      type="dark"
      effect="solid"
      multiline={true}
    />
  </div >

}