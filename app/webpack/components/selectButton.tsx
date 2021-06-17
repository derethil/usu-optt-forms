import React from "react";
import styled from "styled-components";

import { Partial, FormInfo } from "../types";

const BoxButton = styled.div<{ selected: boolean, num: number }>`
  background-color: ${props => props.selected ? "#00a6e9" : "white"};
  color: ${props => props.selected ? "white" : "black"};

  width: 2.5em;
  height: 2.5em;
  border: 2px solid gray;
  border-left: ${props => props.num === 1 ? "2px solid gray" : "none"};

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
  num: number,
  selected: boolean,
  field: string
  setSelection: (updatedValues: Partial<FormInfo>) => void
};

export const SelectButton = ({ num, selected, field, setSelection }: SelectButtonProps) => {
  return <BoxButton
    num={num}
    selected={selected}
    onClick={() => setSelection({ [field]: num })}
  >{num}</BoxButton>
}