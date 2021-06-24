import React, { useEffect } from "react";

import { OptionRow } from "./optionRow";
import { useDefaultObjState } from "../hooks";

import _rubricData from "../../rubrics/studentTeaching.json";

interface Section {
  sectionTitle: string,
  rows: [{
    area: string,
    tooltip?: string,
    options: [{
      content: string,
      score: number,
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


    rows.push(<h2 style={{ textAlign: "left" }} key={rubricData.indexOf(section)}>{section.sectionTitle}</h2>);

    let optionKey = 0;

    section.rows.forEach(row => {
      let currContentOptions: string[] = [];
      let currScoreOptions: string[] = [];
      let tooltipOptions: string[] = [];

      row.options.forEach(option => {
        currContentOptions.push(String(option.content));
        currScoreOptions.push(String(option.score));
      });

      rows.push(<OptionRow
        key={optionKey}
        contentOptions={currContentOptions}
        scoreOptions={currScoreOptions}
        tooltip={row.tooltip}
        title={row.area}
        currSelection={String(scores[row.area])}
        updateSelection={newSelection => updateScores({ [row.area]: Number(newSelection) })}
      />);

      optionKey++;
    })
  })

  return (
    <div className="rubric">
      {rows}
    </div>
  )
}