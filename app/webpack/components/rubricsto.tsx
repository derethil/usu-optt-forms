import React, { useEffect } from "react";

import { OptionRow } from "./optionRow";
import { useDefaultObjState } from "../hooks";

import _rubricData from "../../rubrics/studentTeaching.json";
import { RecursivePartial, ScoresState, Section } from "../types";


type RubricSTOProps = {
  scores: ScoresState,
  rubricData: Section[],
  updateScore: (section: string, row: string, newSelection: string) => void
}

export const RubricSTO = ({ scores, rubricData, updateScore }: RubricSTOProps) => {
  const sections: JSX.Element[] = [];

  rubricData.forEach((section, sectionIdx) => {
    const rows: JSX.Element[] = [];

    const sectionDiv = <section key={sectionIdx}>
      <h2 style={{ marginBottom: 0 }}>{section.sectionTitle}</h2>
      {rows}
    </section>

    section.rows.forEach((row, rowIdx) => {
      let currContentOptions: string[] = [];
      let currScoreOptions: string[] = [];

      row.options.forEach(option => {
        currContentOptions.push(option.content);
        currScoreOptions.push(String(option.score));
      });

      rows.push(<OptionRow
        key={rowIdx}
        contentOptions={currContentOptions}
        scoreOptions={currScoreOptions}
        tooltip={row.tooltip}
        title={row.area}
        currSelection={String(scores[section.sectionTitle][row.area])}
        updateSelection={newSelection => updateScore(section.sectionTitle, row.area, newSelection)}
      />);
    })

    sections.push(sectionDiv);
  })

  return (
    <div className="rubric">
      {sections}
    </div>
  )
}