import React, { useState } from "react";
import styled from "styled-components";

import { SelectButton } from "./selectButton";
import { Partial, FormInfo } from "../types";

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ObservationSelectProps = {
  range: number,
  currSelection: number,
  setSelection: (updatedValues: Partial<FormInfo>) => void
}



export const ObservationSelect = ({ range, currSelection, setSelection }: ObservationSelectProps) => {

  const selectButtons: JSX.Element[] = [];

  for (let i = 1; i <= range; i++) {
    selectButtons.push(
      <SelectButton
        num={i}
        key={i}
        field={"observation"}
        setSelection={setSelection}
        selected={i === currSelection}
      />
    )
  }





  return <div className="observation-select-container">
    <h3>Observation Number</h3>
    <ButtonsRow className="observation-select">
      {selectButtons}
    </ButtonsRow>
  </div>
}