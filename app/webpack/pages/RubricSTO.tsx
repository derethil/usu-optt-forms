import React from "react";

import OptionRow from "../components/optionRow";
import IconTitle from "../components/IconTitle";
import { ScoresState, Section } from "../types";


type RubricSTOProps = {
  scores: ScoresState,
  rubricData: Section[],
  updateScore: (section: string, row: string, newSelection: string) => void
}

const RubricSTO = (props: RubricSTOProps) => {

  const sectionTitle = (section: Section) => {
    if (section.tooltip) {
      return <IconTitle content={section.sectionTitle} tooltipContent={section.tooltip} fontsize="1.33rem"></IconTitle>
    } else {
      return <h1 style={{ fontSize: "1.33rem" }}>{section.sectionTitle}</h1>
    }
  }

  const sections = props.rubricData.map((section, idx) => {
    const rows = section.rows.map((row, rowIdx) => {

      const currContentOptions = row.options.map(option => option.content);
      const currScoreOptions = row.options.map(option => String(option.score));

      return (
        <OptionRow
          key={rowIdx}
          contentOptions={currContentOptions}
          scoreOptions={currScoreOptions}
          tooltip={row.tooltip}
          title={row.area}
          currSelection={String(props.scores[section.sectionTitle][row.area])}
          updateSelection={newSelection => props.updateScore(section.sectionTitle, row.area, newSelection)}
        />);
    })

    const sectionDiv = (
      <section key={idx}>
        {sectionTitle(section)}
        {rows}
      </section>
    )


    return sectionDiv;
  })

  return (
    <div className="rubric">
      {sections}
    </div>
  )
}

export default RubricSTO;