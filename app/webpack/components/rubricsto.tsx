import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";

import { OptionRow } from "./optionRow";
import { ScoresState, Section } from "../types";
import { CenteredIconContainer } from "../styledComponents/style";


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
      <div className="title" style={{ display: "flex" }}>
        <h1 style={{ marginRight: "0.5em" }}>{section.sectionTitle}</h1>
        {section.tooltip && <CenteredIconContainer className="hover-icon" data-tip={section.tooltip}>
          <i className="far fa-question-circle"></i>
          <ReactTooltip
            place="top"
            type="dark"
            effect="solid"
            multiline={true}
          />
        </CenteredIconContainer>}
      </div>

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