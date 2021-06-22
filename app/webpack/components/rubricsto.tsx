import React, { useEffect } from "react";

import { OptionRow } from "./optionRow";
import { useDefaultObjState } from "../hooks";

import _rubricData from "../../rubrics/studentTeaching.json";

interface Section {
  sectionTitle: string,
  rows: [{
    area: string,
    options: [{
      content: string,
      score: number,
      tooltip?: string
    }]
  }]
}

interface ScoresState {
  [key: string]: number
}

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach(section => {
    section.rows.forEach(row => {
      initialState[row.area] = 0;
    });
  });

  return initialState;
}


export const RubricSTO = () => {
  const rubricData = _rubricData as Section[];
  const [scores, updateScores, resetScores] = useDefaultObjState(getInitialState(rubricData));
  const rows: JSX.Element[] = [];

  rubricData.forEach(section => {

    rows.push(<h2 style={{ textAlign: "left" }} key={Math.random()}>{section.sectionTitle}</h2>);

    section.rows.forEach(row => {
      let currContentOptions: string[] = [];
      let currScoreOptions: string[] = [];
      let tooltipOptions: string[] = [];

      row.options.forEach(option => {
        currContentOptions.push(String(option.content));
        currScoreOptions.push(String(option.score));
        tooltipOptions.push(String(option.tooltip ? option.tooltip : ""));
      });

      rows.push(<OptionRow
        key={Math.random()}
        contentOptions={currContentOptions}
        scoreOptions={currScoreOptions}
        tooltipOptions={tooltipOptions}
        title={row.area}
        currSelection={String(scores[row.area])}
        updateSelection={newSelection => updateScores({ [row.area]: Number(newSelection) })}
      />);
    })
  })

  return (
    <div className="rubric">
      {rows}
    </div>
  )
}