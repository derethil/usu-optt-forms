import React from "react";
import styled from "styled-components";

import { Partial, FormInfo } from "../types";

const BoxButton = styled.div<{ selected: boolean, num: number }>`
  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};

  min-width: 2em;
  height: 2em;
  padding: 0.5em;
  border: 2px solid gray;
  border-left: ${props => props.num === 0 ? "2px solid gray" : "none"};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;

type SelectButtonProps = {
  id: number,
  content: string,
  selected: boolean,
  updateSelection: (newSelection: string) => void
};

export const SelectButton = ({ id, content, selected, updateSelection }: SelectButtonProps) => {
  return <BoxButton
    num={id}
    selected={selected}
    onClick={() => updateSelection(content)}
  >{content}</BoxButton>
}