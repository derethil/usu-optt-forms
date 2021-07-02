import React from "react";

import OptionRow from "./optionRow";
import IconTitle from "./IconTitle";
import { ScoresState, Section } from "../types";


type RubricSTOProps = {
  scores: ScoresState,
  rubricData: Section[],
  updateScore: (section: string, row: string, newSelection: string) => void
}

const RubricSTO = (props: RubricSTOProps) => {
  const sections: JSX.Element[] = [];

  props.rubricData.forEach((section, sectionIdx) => {
    const rows: JSX.Element[] = [];

    const sectionTitle = () => {
      if (section.tooltip) {
        return <IconTitle content={section.sectionTitle} tooltipContent={section.tooltip} fontsize="1.33rem"></IconTitle>
      } else {
        return <h1 style={{ fontSize: "1.33rem" }}>{section.sectionTitle}</h1>
      }
    }

    const sectionDiv = <section key={sectionIdx}>
      {sectionTitle()}
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
        currSelection={String(props.scores[section.sectionTitle][row.area])}
        updateSelection={newSelection => props.updateScore(section.sectionTitle, row.area, newSelection)}
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

export default RubricSTO;