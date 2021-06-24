import React, { useEffect } from "react";

import { OptionRow } from "./optionRow";
import { useDefaultObjState } from "../hooks";

import _rubricData from "../../rubrics/studentTeaching.json";
import { RecursivePartial, ScoresState, Section } from "../types";


type RubricSTOProps = {
  scores: ScoresState,
  rubricData: Section[],
  updateScores: (updatedValues: Partial<ScoresState>) => void
}

export const RubricSTO = ({ scores, rubricData, updateScores }: RubricSTOProps) => {

  const updateScore = (section: string, row: string, updatedScore: number) => {
    updateScores({
      [section]: {
        ...scores[section],
        [row]: updatedScore
      }
    });
  }

  const rows: JSX.Element[] = [];

  rubricData.forEach(section => {
    rows.push(<h2 style={{ textAlign: "left" }} key={rubricData.indexOf(section)}>{section.sectionTitle}</h2>);

    let optionRowKey = 1000;

    section.rows.forEach(row => {
      let currContentOptions: string[] = [];
      let currScoreOptions: string[] = [];

      row.options.forEach(option => {
        currContentOptions.push(String(option.content));
        currScoreOptions.push(String(option.score));
      });

      rows.push(<OptionRow
        key={optionRowKey}
        contentOptions={currContentOptions}
        scoreOptions={currScoreOptions}
        tooltip={row.tooltip}
        title={row.area}
        currSelection={String(scores[section.sectionTitle][row.area])}
        updateSelection={newSelection => updateScore(section.sectionTitle, row.area, Number(newSelection))}
      />);

      optionRowKey++;
    })
  })

  return (
    <div className="rubric">
      {rows}
    </div>
  )
}