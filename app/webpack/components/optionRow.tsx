import React, { useState } from "react";
import styled from "styled-components";

import { SelectButton } from "./selectButton";
import { Partial, FormInfo } from "../types";

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface OptionRowProps {
  title: string
  currSelection: string,
  options: string[],
  updateSelection: (newSelection: string) => void
};

export const OptionRow = ({ title, currSelection, options = [], updateSelection, }: OptionRowProps) => {

  const selectButtons: JSX.Element[] = [];


  for (let i = 0; i < options.length; i++) {
    const content = options[i]
    selectButtons.push(
      <SelectButton
        content={content}
        id={i}
        key={i}
        updateSelection={updateSelection}
        selected={content === currSelection}
      />
    )
  }

  return <div className="observation-select-container">
    <h3 style={{ textAlign: "center" }}>{title}</h3>
    <ButtonsRow className="observation-select">
      {selectButtons}
    </ButtonsRow>
  </div >
}