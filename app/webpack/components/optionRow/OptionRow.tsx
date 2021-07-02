import React from "react";
import styled from "styled-components";

import { SelectButton } from "./SelectButton";
import { IconTitle } from "../IconTitle";

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
  tooltip?: string
};

export const OptionRow = (props: OptionRowProps) => {

  const selectButtons: JSX.Element[] = [];


  for (let i = 0; i < props.contentOptions.length; i++) {
    const content = props.contentOptions[i];
    const score = props.scoreOptions ? props.scoreOptions[i] : "";

    const compareTo = props.scoreOptions ? score : content;

    selectButtons.push(
      <SelectButton
        content={content}
        score={score}
        key={i}
        updateSelection={props.updateSelection}
        selected={compareTo === props.currSelection}
      />
    )
  }

  if (props.scoreOptions) {
    selectButtons.push(
      <SelectButton
        content={"N/A"}
        key={props.contentOptions.length}
        updateSelection={props.updateSelection}
        selected={"N/A" === props.currSelection}
      />
    )
  }

  const renderTitle = (tooltip?: string) => {
    if (tooltip) {
      return <IconTitle content={props.title} tooltipContent={tooltip} fontsize="1.1rem"></IconTitle>
    } else {
      return <h1 style={{ fontSize: "1.1rem" }}>{props.title}</h1>
    }
  }


  return <div>
    {renderTitle(props.tooltip)}

    <ButtonsRow>
      {selectButtons}
    </ButtonsRow>
  </div >
}