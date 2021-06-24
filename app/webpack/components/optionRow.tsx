import React, { useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import { SelectButton } from "./selectButton";
import { CenteredIconContainer } from "../styledComponents/style";

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

export const OptionRow = ({
  title,
  currSelection,
  contentOptions = [],
  scoreOptions,
  updateSelection,
  tooltip
}: OptionRowProps) => {

  const selectButtons: JSX.Element[] = [];


  for (let i = 0; i < contentOptions.length; i++) {
    const content = contentOptions[i];
    const score = scoreOptions ? scoreOptions[i] : "";

    const compareTo = scoreOptions ? score : content;

    selectButtons.push(
      <SelectButton
        content={content}
        score={score}
        key={i}
        updateSelection={updateSelection}
        selected={compareTo === currSelection}
      />
    )
  }

  if (scoreOptions) {
    selectButtons.push(
      <SelectButton
        content={"N/A"}
        key={contentOptions.length}
        updateSelection={updateSelection}
        selected={"N/A" === currSelection}
      />
    )
  }


  return <div>
    <div className="title" style={{ display: "flex" }}>
      <h3 style={{ textAlign: "left", marginRight: "0.5em" }}>{title}</h3>
      {tooltip && <CenteredIconContainer className="hover-icon" data-tip={tooltip}>
        <i className="far fa-question-circle"></i>
        <ReactTooltip
          place="top"
          type="dark"
          effect="solid"
          multiline={true}
        />
      </CenteredIconContainer>}
    </div>

    <ButtonsRow>
      {selectButtons}
    </ButtonsRow>
  </div >
}