import React, { useState } from "react";
import styled from "styled-components";

import { SelectButton } from "./selectButton";

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

interface OptionRowProps {
  title: string
  currSelection: string,
  contentOptions: string[],
  updateSelection: (newSelection: string) => void
  scoreOptions?: string[],
  minHeight?: number,
  minWidth?: number,
  tooltipOptions?: string[]
};

export const OptionRow = ({
  title,
  currSelection,
  contentOptions = [],
  scoreOptions,
  updateSelection,
  minHeight,
  minWidth,
  tooltipOptions
}: OptionRowProps) => {

  const selectButtons: JSX.Element[] = [];


  for (let i = 0; i < contentOptions.length; i++) {
    const content = contentOptions[i];
    const score = scoreOptions ? scoreOptions[i] : "";
    const tooltip = tooltipOptions ? tooltipOptions[i] : "";

    const compareTo = scoreOptions ? score : content;

    selectButtons.push(
      <SelectButton
        content={content}
        score={score}
        tooltip={tooltip}
        id={i}
        key={i}
        updateSelection={updateSelection}
        selected={compareTo === currSelection}
        minHeight={minHeight}
        minWidth={minWidth}
      />
    )
  }

  return <div>
    <h3 style={{ textAlign: "left" }}>{title}</h3>
    <ButtonsRow>
      {selectButtons}
    </ButtonsRow>
  </div >
}