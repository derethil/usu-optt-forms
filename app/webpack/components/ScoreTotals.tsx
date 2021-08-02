import React from "react";

import _rubricData from "../../rubrics/studentTeaching.json";
import { getSubtotal, getMaxSubtotal } from "../utils";
import { ScoresState, Section } from "../types";

const ScoreTotals = (props: { scores: ScoresState }) => {
  const rubricData = _rubricData as Section[];


  // Calculate total scores for display
  const sections = rubricData.map(section => section.sectionTitle);

  const totals = sections.map((section, index) => {
    return <h3 key={index}>
      {section} Score: {getSubtotal(section, props.scores)} / {getMaxSubtotal(section, props.scores, rubricData)}
    </h3>
  })

  return (
    <div>
      {totals}
    </div>
  )
}

export default ScoreTotals;